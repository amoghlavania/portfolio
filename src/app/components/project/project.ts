import { Component } from '@angular/core';
import { PROJECT } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-project',
  imports: [RevealDirective],
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project {
  protected readonly project = PROJECT;
}
