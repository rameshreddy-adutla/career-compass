const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '..', 'legacy-storage.js'), 'utf8');

function setup(entries = {}) {
  const stored = new Map(Object.entries(entries));
  const writes = [];
  const context = { window: {}, localStorage: {
    getItem: key => stored.has(key) ? stored.get(key) : null,
    setItem: (...args) => writes.push(args),
    removeItem: (...args) => writes.push(args),
  } };
  vm.runInNewContext(source, context);
  return { api: context.window.CareerCompassLegacy, stored, writes, context };
}

test('existing workspace bytes are read without writing or removing either key', () => {
  const bytes = '{"evidence":[{"summary":"existing example"}],"squadNotes":{}}';
  const s = setup({ 'staff-engineer-os': bytes });
  assert.equal(s.api.readWorkspace(), bytes);
  assert.equal(s.stored.get('staff-engineer-os'), bytes);
  assert.deepEqual(s.writes, []);
  assert.equal(s.stored.has('career-compass'), false);
});

test('the new workspace takes precedence over an older snapshot', () => {
  const s = setup({ 'career-compass': '{"evidence":[]}', 'staff-engineer-os': 'older bytes' });
  assert.equal(s.api.readWorkspace(), '{"evidence":[]}');
  assert.deepEqual(s.writes, []);
});

test('an empty current value does not resurrect older data', () => {
  const s = setup({ 'career-compass': '', 'staff-engineer-os': 'older bytes' });
  assert.equal(s.api.readWorkspace(), '');
});

test('no workspace stays missing without creating a key', () => {
  const s = setup();
  assert.equal(s.api.readWorkspace(), null);
  assert.equal(s.stored.size, 0);
  assert.deepEqual(s.writes, []);
});

test('existing theme is read without changing old settings', () => {
  const s = setup({ 'staff-os-theme': 'dark' });
  assert.equal(s.api.readTheme(), 'dark');
  assert.equal(s.stored.get('staff-os-theme'), 'dark');
  assert.deepEqual(s.writes, []);
});

test('the new theme takes precedence', () => {
  const s = setup({ 'career-compass-theme': 'light', 'staff-os-theme': 'dark' });
  assert.equal(s.api.readTheme(), 'light');
});

test('a failed storage read propagates without changing existing bytes', () => {
  const s = setup({ 'staff-engineer-os': 'existing bytes' });
  s.context.localStorage.getItem = () => { throw new Error('read denied'); };
  assert.throws(() => s.api.readWorkspace(), /read denied/);
  assert.equal(s.stored.get('staff-engineer-os'), 'existing bytes');
  assert.deepEqual(s.writes, []);
});
