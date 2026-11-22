import { AfterViewInit, Component, ElementRef, OnDestroy, computed, signal, viewChildren } from '@angular/core';
import { STORY } from '../../data/portfolio.data';

@Component({
  selector: 'app-story',
  templateUrl: './story.html',
  styleUrl: './story.scss',
})
export class Story implements AfterViewInit, OnDestroy {
  protected readonly items = STORY;
  protected readonly active = signal(0);
  protected readonly current = computed(() => this.items[this.active()]);
  protected readonly progress = computed(() => ((this.active() + 1) / this.items.length) * 100);

  private readonly entries = viewChildren<ElementRef<HTMLElement>>('entry');
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (records) => {
        for (const r of records) {
          if (r.isIntersecting) this.active.set(Number((r.target as HTMLElement).dataset['index']));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    this.entries().forEach((e) => this.observer!.observe(e.nativeElement));
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
