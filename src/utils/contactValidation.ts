export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface ContactValidationResult {
  valid: boolean;
  sanitized: ContactFormInput;
  errors: ContactValidationErrors;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function sanitizeField(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\r\n/g, '\n').trim().slice(0, maxLength);
}

export function validateContactForm(raw: Partial<ContactFormInput>): ContactValidationResult {
  const name = sanitizeField(raw.name, 100);
  const email = sanitizeField(raw.email, 160);
  const subject = sanitizeField(raw.subject, 160);
  const message = sanitizeField(raw.message, 3000);

  const errors: ContactValidationErrors = {};

  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address (e.g. name@company.com).';
  }

  if (!subject) {
    errors.subject = 'Please enter a subject for your message.';
  } else if (subject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }

  if (!message) {
    errors.message = 'Please enter a message.';
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters so Rajesh has enough context.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    sanitized: { name, email, subject, message },
    errors,
  };
}
