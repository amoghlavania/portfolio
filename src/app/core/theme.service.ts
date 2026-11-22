import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(this.readInitial());

  /** Toggle the theme. `origin` (viewport px) is where the circular reveal starts. */
  toggle(origin?: { x: number; y: number }): void {
    const next: Theme = this.theme() === 'light' ? 'dark' : 'light';
    const apply = () => {
      this.theme.set(next);
      document.documentElement.dataset['theme'] = next;
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* storage unavailable — theme still applies for this visit */
      }
    };

    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!doc.startViewTransition || reduced) {
      apply();
      return;
    }

    const x = origin?.x ?? window.innerWidth - 48;
    const y = origin?.y ?? 0;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const root = document.documentElement.style;
    root.setProperty('--vt-x', `${x}px`);
    root.setProperty('--vt-y', `${y}px`);
    root.setProperty('--vt-r', `${r}px`);
    doc.startViewTransition(apply);
  }

  private readInitial(): Theme {
    const attr = document.documentElement.dataset['theme'];
    return attr === 'dark' ? 'dark' : 'light';
  }
}
