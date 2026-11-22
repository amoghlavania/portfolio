import { Component } from '@angular/core';
import { CERTIFICATIONS, SKILL_GROUPS } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;
  protected readonly certs = CERTIFICATIONS;
  protected readonly marquee = SKILL_GROUPS.flatMap((g) => g.items);
}
