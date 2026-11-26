import express from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { validateContactForm } from './src/utils/contactValidation';

dotenv.config();

const PORT = 3000;
const DATA_DIR = path.resolve(process.cwd(), '.data');
const SUBMISSIONS_FILE = path.resolve(DATA_DIR, 'contact-submissions.json');

interface StoredSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  forwarded: boolean;
}

function persistSubmission(entry: StoredSubmission): void {
  if (!SUBMISSIONS_FILE.startsWith(DATA_DIR + path.sep)) {
    throw new Error('Invalid storage path');
  }
  fs.mkdirSync(DATA_DIR, { recursive: true });
  let existing: StoredSubmission[] = [];
  if (fs.existsSync(SUBMISSIONS_FILE)) {
    try {
      const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        existing = parsed;
      }
    } catch {
      existing = [];
    }
  }
  existing.push(entry);
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(existing.slice(-200), null, 2), 'utf-8');
}

function isAllowedWebhookUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
    const host = parsed.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host === '169.254.169.254' ||
      host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.post('/api/contact', async (req, res) => {
    const validation = validateContactForm(req.body ?? {});
    if (!validation.valid) {
      return res.status(400).json({
        ok: false,
        error: 'Please check the highlighted fields and try again.',
        errors: validation.errors,
      });
    }

    const submissionId = `MSG-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const submittedAt = new Date().toISOString();
    let forwarded = false;

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
    if (webhookUrl && isAllowedWebhookUrl(webhookUrl)) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            id: submissionId,
            ...validation.sanitized,
            submittedAt,
          }),
          signal: AbortSignal.timeout(5000),
        });
        forwarded = webhookResponse.ok;
      } catch {
        forwarded = false;
      }
    }

    try {
      persistSubmission({
        id: submissionId,
        ...validation.sanitized,
        submittedAt,
        forwarded,
      });
    } catch {
      return res.status(500).json({
        ok: false,
        error: 'Unable to record your message right now. Please use Email Me directly.',
      });
    }

    return res.status(201).json({
      ok: true,
      submissionId,
      submittedAt,
      forwarded,
      message: `Thank you, ${validation.sanitized.name}. Your message has been received and logged under reference ${submissionId}.`,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running at http://localhost:${PORT}`);
  });
}

startServer();
