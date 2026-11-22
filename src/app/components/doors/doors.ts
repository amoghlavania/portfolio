import { Component, signal } from '@angular/core';
import { DOORS } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-doors',
  imports: [RevealDirective],
  templateUrl: './doors.html',
  styleUrl: './doors.scss',
})
export class Doors {
  protected readonly doors = DOORS;
  protected readonly open = signal<number | null>(null);
  private pointerType = 'mouse';

  protected onDown(e: PointerEvent): void {
    this.pointerType = e.pointerType;
  }

  protected onEnter(e: PointerEvent, i: number): void {
    if (e.pointerType === 'mouse') this.open.set(i);
  }

  protected onLeave(e: PointerEvent): void {
    if (e.pointerType === 'mouse') this.open.set(null);
  }

  /** Touch and keyboard toggle; mouse users get hover. */
  protected onClick(e: MouseEvent, i: number): void {
    if (e.detail !== 0 && this.pointerType === 'mouse') {
      this.open.set(i);
      return;
    }
    this.open.update((v) => (v === i ? null : i));
  }
}
