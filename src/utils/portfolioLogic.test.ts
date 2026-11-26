import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm } from './contactValidation';
import {
  applyProjectEdit,
  computeActiveSection,
  filterSkillCategories,
  isSafeHttpUrl,
  sanitizeSafeUrl,
} from './portfolioState';
import { INITIAL_PROJECTS, SKILL_CATEGORIES, TOOLS_LIST } from '../data/portfolioData';

test('validateContactForm rejects empty and invalid payloads with clear field errors', () => {
  const emptyResult = validateContactForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.subject);
  assert.ok(emptyResult.errors.message);

  const badEmail = validateContactForm({
    name: 'Ananya',
    email: 'not-an-email',
    subject: 'Internship Inquiry',
    message: 'Hello Rajesh, we would like to discuss a digital marketing role.',
  });
  assert.equal(badEmail.valid, false);
  assert.ok(badEmail.errors.email);
  assert.equal(badEmail.errors.name, undefined);
});

test('validateContactForm accepts valid input and trims whitespace', () => {
  const validResult = validateContactForm({
    name: '  Karthik  ',
    email: ' karthik@example.com ',
    subject: ' SEO Collaboration ',
    message: 'Hi Rajesh, reaching out regarding an SEO & content role in Chennai.',
  });
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
  assert.equal(validResult.sanitized.name, 'Karthik');
  assert.equal(validResult.sanitized.email, 'karthik@example.com');
});

test('sanitizeSafeUrl blocks javascript and data URLs while preserving https', () => {
  assert.equal(isSafeHttpUrl('javascript:alert(1)'), false);
  assert.equal(sanitizeSafeUrl('javascript:alert(1)'), '');
  assert.equal(sanitizeSafeUrl('data:text/html,<script>'), '');
  assert.equal(sanitizeSafeUrl('https://example.com/case-study'), 'https://example.com/case-study');
});

test('filterSkillCategories filters properly and places Paid Advertising second after SEO', () => {
  const all = filterSkillCategories(SKILL_CATEGORIES, 'all');
  assert.equal(all.length, 5);
  assert.equal(all[0].id, 'seo');
  assert.equal(all[1].id, 'paid-ads');
  assert.equal(all[1].title, 'Paid Advertising (Meta Ads & Google Ads)');
  const seoOnly = filterSkillCategories(SKILL_CATEGORIES, 'seo');
  assert.equal(seoOnly.length, 1);
  assert.equal(seoOnly[0].title, 'Search Engine Optimization');
});

test('applyProjectEdit updates editable internship fields without disturbing project order', () => {
  const updated = applyProjectEdit(INITIAL_PROJECTS, 'infinix-360', {
    duration: 'May 2025 – July 2025',
    responsibilities: ['Conducted keyword research', 'Assisted with On-Page SEO audits'],
    workSamples: [{ id: 's1', label: 'Audit Checklist', url: 'https://example.com/audit' }],
  });

  assert.equal(updated[0].id, 'infinix-360');
  assert.equal(updated[0].duration, 'May 2025 – July 2025');
  assert.equal(updated[0].responsibilities.length, 2);
  assert.equal(updated[0].workSamples[0].url, 'https://example.com/audit');
});

test('project & tools invariants: exact order, Infinix 360 tools, no images, no Canva, Chennai only, no Meta Ads internship claims', () => {
  assert.deepEqual(
    INITIAL_PROJECTS.map((p) => p.id),
    ['infinix-360', 'fita-academy', 'sap-fico-chennai', 'eagle-hitech'],
  );
  assert.equal(INITIAL_PROJECTS[0].featured, true);
  assert.equal(INITIAL_PROJECTS[0].company, 'Infinix 360');
  assert.deepEqual(INITIAL_PROJECTS[0].toolsUsed, [
    'Grammarly',
    'Bulk DA PA Checker',
    'Title Rephrase',
    'Duplicate Checker',
    'Ahrefs',
  ]);

  for (const project of INITIAL_PROJECTS) {
    assert.equal(project.image, undefined);
  }

  const allContent = JSON.stringify({ INITIAL_PROJECTS, SKILL_CATEGORIES, TOOLS_LIST }).toLowerCase();
  assert.equal(allContent.includes('bangalore'), false);
  assert.equal(allContent.includes('canva'), false);

  for (const requiredTool of [
    'Grammarly',
    'Bulk DA PA Checker',
    'Title Rephrase',
    'Duplicate Checker',
    'Ahrefs',
  ]) {
    assert.ok(TOOLS_LIST.some((t) => t.name === requiredTool), `Missing tool ${requiredTool}`);
  }

  const internshipProjects = INITIAL_PROJECTS.filter(
    (p) => p.id === 'infinix-360' || p.id === 'eagle-hitech',
  );
  for (const intern of internshipProjects) {
    assert.equal(JSON.stringify(intern).toLowerCase().includes('meta ads'), false);
  }
});

test('computeActiveSection selects the section matching scroll position', () => {
  const sections = [
    { id: 'home', top: 0, height: 800 },
    { id: 'about', top: 800, height: 700 },
    { id: 'skills', top: 1500, height: 700 },
  ];
  assert.equal(computeActiveSection(sections, 0), 'home');
  assert.equal(computeActiveSection(sections, 720), 'about');
  assert.equal(computeActiveSection(sections, 1450), 'skills');
});
