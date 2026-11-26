import { useState } from 'react';
import { CheckCircle2, Linkedin, Mail, MapPin, Send, User } from 'lucide-react';
import { CONTACT_CONTENT, PERSONAL_DETAILS } from '../data/portfolioData';
import {
  validateContactForm,
  type ContactFormInput,
  type ContactValidationErrors,
} from '../utils/contactValidation';
import { TiltCard } from './TiltCard';

interface SubmissionReceipt {
  submissionId: string;
  submittedAt: string;
  message: string;
}

export function ContactSection() {
  const [form, setForm] = useState<ContactFormInput>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);

  const updateField = (field: keyof ContactFormInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validation = validateContactForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.sanitized),
      });
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        if (payload.errors) {
          setErrors(payload.errors);
        }
        setServerError(payload.error || 'Unable to send message. Please try again.');
        return;
      }

      setReceipt({
        submissionId: payload.submissionId,
        submittedAt: payload.submittedAt,
        message: payload.message,
      });
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch {
      setServerError(
        'Could not reach the server right now. Please try again or use the Email Me button directly.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-[#080808] py-20 sm:py-24">
      <div className="crimson-hairline mx-auto mb-20 h-px max-w-6xl opacity-40" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Contact Info */}
          <div className="min-w-0 lg:col-span-5">
            <p className="font-mono text-xs font-medium tracking-wider text-[#FF2525]">
              07. Get In Touch
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {CONTACT_CONTENT.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#B8B8B8]">
              {CONTACT_CONTENT.description}
            </p>

            <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-[#121212] p-6">
              <div className="flex items-start gap-3.5">
                <User className="mt-0.5 h-5 w-5 shrink-0 text-[#FF2525]" aria-hidden="true" />
                <div>
                  <p className="font-mono text-xs text-[#B8B8B8]">Name</p>
                  <p className="text-sm font-semibold text-white">{PERSONAL_DETAILS.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 border-t border-white/8 pt-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#FF2525]" aria-hidden="true" />
                <div>
                  <p className="font-mono text-xs text-[#B8B8B8]">Location</p>
                  <p className="text-sm font-semibold text-white">{PERSONAL_DETAILS.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 border-t border-white/8 pt-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#FF2525]" aria-hidden="true" />
                <div>
                  <p className="font-mono text-xs text-[#B8B8B8]">Email</p>
                  <a
                    href={`mailto:${PERSONAL_DETAILS.email}`}
                    className="text-sm font-semibold text-white transition-colors hover:text-[#FF2525]"
                  >
                    {PERSONAL_DETAILS.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${PERSONAL_DETAILS.email}?subject=${encodeURIComponent('Portfolio Inquiry — Rajesh')}`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#FF2525] px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 shadow-[0_0_24px_-6px_rgba(255,37,37,0.65)] transition-colors hover:bg-[#e01e1e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Email Me</span>
              </a>

              <a
                href={PERSONAL_DETAILS.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rajesh LinkedIn Profile"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/15 bg-[#121212] px-4 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:border-[#FF2525]/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2525]"
              >
                <Linkedin className="h-4 w-4 text-[#FF2525]" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7">
            <TiltCard className="p-6 sm:p-8" intensity={3}>
              {receipt ? (
                <div
                  role="status"
                  aria-live="polite"
                  data-testid="contact-confirmation"
                  className="py-2"
                >
                  <div className="flex items-start gap-3.5">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#FF2525]" aria-hidden="true" />
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        Message Recorded
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
                        {receipt.message}
                      </p>
                      <p className="mt-4 border-t border-white/10 pt-4 font-mono text-xs text-[#B8B8B8]">
                        Reference: <span className="text-white">{receipt.submissionId}</span>
                      </p>
                      <button
                        type="button"
                        onClick={() => setReceipt(null)}
                        className="mt-5 inline-flex min-h-[40px] items-center rounded-lg border border-white/15 bg-[#080808] px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-[#FF2525]"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {serverError && (
                    <div
                      role="alert"
                      className="rounded-lg border border-[#FF2525]/60 bg-[#FF2525]/10 px-4 py-3 text-sm text-white"
                    >
                      {serverError}
                    </div>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-white">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className={`mt-2 w-full rounded-lg border bg-[#080808] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none ${
                          errors.name
                            ? 'border-[#FF2525]'
                            : 'border-white/15 focus:border-[#FF2525]'
                        }`}
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="mt-1.5 text-xs text-[#FF2525]">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-white">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className={`mt-2 w-full rounded-lg border bg-[#080808] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none ${
                          errors.email
                            ? 'border-[#FF2525]'
                            : 'border-white/15 focus:border-[#FF2525]'
                        }`}
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="mt-1.5 text-xs text-[#FF2525]">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold text-white">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="Role, project, or collaboration topic"
                      value={form.subject}
                      onChange={(e) => updateField('subject', e.target.value)}
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                      className={`mt-2 w-full rounded-lg border bg-[#080808] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none ${
                        errors.subject
                          ? 'border-[#FF2525]'
                          : 'border-white/15 focus:border-[#FF2525]'
                      }`}
                    />
                    {errors.subject && (
                      <p id="contact-subject-error" className="mt-1.5 text-xs text-[#FF2525]">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-white">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Share details about the opportunity or project..."
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className={`mt-2 w-full rounded-lg border bg-[#080808] px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none ${
                        errors.message
                          ? 'border-[#FF2525]'
                          : 'border-white/15 focus:border-[#FF2525]'
                      }`}
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="mt-1.5 text-xs text-[#FF2525]">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#FF2525] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_26px_-6px_rgba(255,37,37,0.7)] transition-colors hover:bg-[#e01e1e] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
