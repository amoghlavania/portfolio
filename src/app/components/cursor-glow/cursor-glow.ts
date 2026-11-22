import { Component, ElementRef, OnDestroy, inject } from '@angular/core';

/**
 * Soft colour blobs behind the whole page that follow the mouse.
 * Two blobs trail at different speeds for a fluid feel; colours come from
 * the --cursor-a / --cursor-b theme tokens so they cycle with the palette.
 */
@Component({
  selector: 'app-cursor-glow',
  template: '',
  styles: `
    :host {
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      background:
        radial-gradient(520px circle at var(--ax, 30%) var(--ay, 30%), var(--cursor-a), transparent 65%),
        radial-gradient(680px circle at var(--bx, 70%) var(--by, 60%), var(--cursor-b), transparent 65%);
    }
  `,
  host: { '(window:pointermove)': 'onMove($event)' },
})
export class CursorGlow implements OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  private target = { x: window.innerWidth * 0.3, y: window.innerHeight * 0.3 };
  private a = { ...this.target };
  private b = { x: window.innerWidth * 0.7, y: window.innerHeight * 0.6 };
  private frame = 0;

  constructor() {
    this.paint();
  }

  protected onMove(e: PointerEvent): void {
    if (e.pointerType !== 'mouse') return;
    this.target = { x: e.clientX, y: e.clientY };
    if (this.reduced) {
      this.a = { ...this.target };
      this.b = { ...this.target };
      this.paint();
      return;
    }
    if (!this.frame) this.frame = requestAnimationFrame(this.step);
  }

  private readonly step = () => {
    // Blob A follows closely, blob B lags behind.
    this.a.x += (this.target.x - this.a.x) * 0.14;
    this.a.y += (this.target.y - this.a.y) * 0.14;
    this.b.x += (this.target.x - this.b.x) * 0.05;
    this.b.y += (this.target.y - this.b.y) * 0.05;
    this.paint();
    const settled = Math.abs(this.target.x - this.b.x) + Math.abs(this.target.y - this.b.y) < 0.5;
    this.frame = settled ? 0 : requestAnimationFrame(this.step);
  };

  private paint(): void {
    const s = this.el.style;
    s.setProperty('--ax', `${this.a.x}px`);
    s.setProperty('--ay', `${this.a.y}px`);
    s.setProperty('--bx', `${this.b.x}px`);
    s.setProperty('--by', `${this.b.y}px`);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
  }
}
