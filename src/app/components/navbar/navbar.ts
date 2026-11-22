import { AfterViewInit, Component, OnDestroy, signal } from '@angular/core';
import { NAV_LINKS, PROFILE } from '../../data/portfolio.data';

const TIME_FMT = new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});
const DATE_FMT = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  host: { '(window:scroll)': 'onScroll()' },
})
export class Navbar implements AfterViewInit, OnDestroy {
  protected readonly links = NAV_LINKS;
  protected readonly firstName = PROFILE.firstName;
  protected readonly time = signal('');
  protected readonly date = signal('');
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly active = signal('home');

  private timer = 0;
  private observer?: IntersectionObserver;

  constructor() {
    this.tick();
    this.timer = window.setInterval(() => this.tick(), 15_000);
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) this.active.set(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const l of this.links) {
      const el = document.getElementById(l.id);
      if (el) this.observer.observe(el);
    }
  }

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 12);
  }

  private tick(): void {
    const now = new Date();
    this.time.set(TIME_FMT.format(now).replace(/\s/g, '').toLowerCase());
    const parts = DATE_FMT.formatToParts(now);
    const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
    this.date.set(`${get('day')} ${get('month')}, ${get('year')}`);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    this.observer?.disconnect();
  }
}
