import { Component, ElementRef, OnDestroy, inject, signal, viewChild } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

type Phase = 'idle' | 'drag' | 'tug' | 'spring';

const MAX_PULL = 150;
const TOGGLE_AT = 46;
const TUG_DEPTH = 78;

@Component({
  selector: 'app-pull-thread',
  templateUrl: './pull-thread.html',
  styleUrl: './pull-thread.scss',
})
export class PullThread implements OnDestroy {
  private readonly theme = inject(ThemeService);
  private readonly knob = viewChild.required<ElementRef<HTMLButtonElement>>('knob');

  protected readonly pull = signal(0);
  protected readonly phase = signal<Phase>('idle');
  protected readonly isDark = this.theme.theme;

  private startY = 0;
  private moved = false;
  private timers: number[] = [];

  protected onPointerDown(e: PointerEvent): void {
    if (e.button !== 0 || this.phase() === 'tug') return;
    this.clearTimers();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.startY = e.clientY - this.pull();
    this.moved = false;
    this.phase.set('drag');
  }

  protected onPointerMove(e: PointerEvent): void {
    if (this.phase() !== 'drag') return;
    const dy = e.clientY - this.startY;
    if (Math.abs(dy) > 4) this.moved = true;
    // Rubber-band resistance the further you pull.
    const eased = dy <= 0 ? 0 : MAX_PULL * (1 - Math.exp(-dy / MAX_PULL));
    this.pull.set(eased);
  }

  protected onPointerUp(): void {
    if (this.phase() !== 'drag') return;
    if (!this.moved) {
      this.tug();
      return;
    }
    if (this.pull() >= TOGGLE_AT) this.switchTheme();
    this.release();
  }

  /** Keyboard activation (Enter / Space) — pointer clicks are handled above. */
  protected onClick(e: MouseEvent): void {
    if (e.detail === 0) this.tug();
  }

  /** Animated pull used for a simple click: yank down, switch, spring back. */
  private tug(): void {
    this.phase.set('tug');
    this.pull.set(TUG_DEPTH);
    this.later(() => {
      this.switchTheme();
      this.release();
    }, 200);
  }

  private release(): void {
    this.phase.set('spring');
    this.pull.set(0);
    this.later(() => this.phase.set('idle'), 900);
  }

  private switchTheme(): void {
    const r = this.knob().nativeElement.getBoundingClientRect();
    this.theme.toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  }

  private later(fn: () => void, ms: number): void {
    this.timers.push(window.setTimeout(fn, ms));
  }

  private clearTimers(): void {
    this.timers.forEach((t) => clearTimeout(t));
    this.timers = [];
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }
}
