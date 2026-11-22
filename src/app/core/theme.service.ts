import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
/** Light-mode palettes the site cycles through (see styles.scss). */
export const PALETTES = ['indigo', 'warm', 'rose', 'emerald'] as const;
const CYCLE_MS = 7000;

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(this.readInitial());
  readonly palette = signal<(typeof PALETTES)[number]>('indigo');

  private readonly reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor() {
    this.applyPalette();
    if (!this.reduced) {
      window.setInterval(() => {
        if (document.hidden || this.theme() !== 'light') return;
        const i = PALETTES.indexOf(this.palette());
        this.palette.set(PALETTES[(i + 1) % PALETTES.length]);
        this.applyPalette();
      }, CYCLE_MS);
    }
  }

  /** Toggle the theme. `origin` (viewport px) is where the circular reveal starts. */
  toggle(origin?: { x: number; y: number }): void {
    const next: Theme = this.theme() === 'light' ? 'dark' : 'light';
    const html = document.documentElement;
    const apply = () => {
      this.theme.set(next);
      html.dataset['theme'] = next;
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable — theme still applies for this visit */
      }
    };

    // Suppress the palette cross-fade so light/dark flips instantly under the reveal.
    html.classList.add('theme-switching');
    window.setTimeout(() => html.classList.remove('theme-switching'), 1000);

    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (!doc.startViewTransition || this.reduced) {
      apply();
      return;
    }

    const x = origin?.x ?? window.innerWidth - 48;
    const y = origin?.y ?? 0;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    html.style.setProperty('--vt-x', `${x}px`);
    html.style.setProperty('--vt-y', `${y}px`);
    html.style.setProperty('--vt-r', `${r}px`);
    doc.startViewTransition(apply);
  }

  private applyPalette(): void {
    document.documentElement.dataset['palette'] = this.palette();
  }

  private readInitial(): Theme {
    return document.documentElement.dataset['theme'] === 'dark' ? 'dark' : 'light';
  }
}
