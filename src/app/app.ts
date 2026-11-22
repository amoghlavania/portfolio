import { Component } from '@angular/core';
import { Contact } from './components/contact/contact';
import { CursorGlow } from './components/cursor-glow/cursor-glow';
import { Doors } from './components/doors/doors';
import { Hero } from './components/hero/hero';
import { Navbar } from './components/navbar/navbar';
import { Project } from './components/project/project';
import { PullThread } from './components/pull-thread/pull-thread';
import { Skills } from './components/skills/skills';
import { Story } from './components/story/story';

@Component({
  selector: 'app-root',
  imports: [CursorGlow, PullThread, Navbar, Hero, Doors, Project, Story, Skills, Contact],
  template: `
    <app-cursor-glow />
    <app-pull-thread />
    <app-navbar />
    <main>
      <app-hero />
      <app-doors />
      <app-project />
      <app-story />
      <app-skills />
      <app-contact />
    </main>
  `,
})
export class App {}
