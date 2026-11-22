import { Component, OnDestroy, signal } from '@angular/core';
import { ABILITY_STATS, HERO_ROLES, PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnDestroy {
  protected readonly profile = PROFILE;
  protected readonly roles = HERO_ROLES;
  protected readonly stats = ABILITY_STATS;
  protected readonly rings = Array.from({ length: 12 });

  protected readonly current = signal(0);
  protected readonly prev = signal(0);
  protected readonly flipping = signal(false);
  protected readonly showAbility = signal(false);

  private readonly reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  private readonly timer = window.setInterval(() => this.next(), 2800);

  private next(): void {
    this.prev.set(this.current());
    this.current.set((this.current() + 1) % this.roles.length);
    if (!this.reduced) this.flipping.set(true);
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
