import { AfterViewInit, Component, OnDestroy, signal } from '@angular/core';
import { NAV_LINKS, PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  host: { '(window:scroll)': 'onScroll()' },
})
export class Navbar implements AfterViewInit, OnDestroy {
  protected readonly links = NAV_LINKS;
  protected readonly firstName = PROFILE.firstName;
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly active = signal('home');

  private observer?: IntersectionObserver;

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

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
