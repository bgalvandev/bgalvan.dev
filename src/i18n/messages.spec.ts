import en from './messages/en.json';
import es from './messages/es.json';

// Flatten a catalog to its dotted leaf-key paths so two locales can be compared
// structurally, regardless of value.
function keyPaths(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object') {
    return [prefix];
  }
  return Object.entries(value as Record<string, unknown>).flatMap(
    ([key, child]) => keyPaths(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe('message catalogs', () => {
  // es and en MUST expose the same keys, so a type-safe (en-typed) key never
  // resolves to a missing es translation at runtime.
  it('es and en expose the same keys', () => {
    expect(keyPaths(es).sort()).toEqual(keyPaths(en).sort());
  });
});
