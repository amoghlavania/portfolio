import { Component, signal } from '@angular/core';
import { PROFILE } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [RevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly p = PROFILE;
  protected readonly copied = signal(false);
  protected readonly year = new Date().getFullYear();
  private timer = 0;

  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.p.email);
      this.copied.set(true);
      clearTimeout(this.timer);
      this.timer = window.setTimeout(() => this.copied.set(false), 1800);
    } catch {
      window.location.href = `mailto:${this.p.email}`;
    }
  }
}
