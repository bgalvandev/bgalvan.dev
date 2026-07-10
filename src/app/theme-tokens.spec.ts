import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Guards the theming substrate: every token defined for light (:root) must have
// a dark counterpart (.dark) and vice-versa. A token present in only one theme
// renders the wrong value in the other, silently — this fails the build instead.
const css = readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8');

function tokensIn(selector: string): string[] {
  const block = new RegExp(`${selector}\\s*\\{([^}]*)\\}`).exec(css)?.[1] ?? '';
  return [...block.matchAll(/(--[\w-]+)\s*:/g)]
    .map((m) => m[1])
    .filter((token): token is string => token !== undefined)
    .sort();
}

describe('theme tokens', () => {
  it(':root and .dark declare the same token set', () => {
    const light = tokensIn(':root');
    const dark = tokensIn('\\.dark');

    expect(light.length).toBeGreaterThan(0);
    expect(dark).toEqual(light);
  });
});
