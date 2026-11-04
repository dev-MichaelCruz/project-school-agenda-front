import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { focusElement, focusMainHeading } from './utils/focus-management';
import { Header } from "./components/header/header";
import { Sidebar } from "./components/sidebar/sidebar";
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [Header, Sidebar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  auth = inject(AuthService);

  protected readonly title = signal('project-school-agenda-front');

  menuOpen = signal(false);
  private viewport = window.matchMedia('(max-width: 767.98px)');
  mobile = signal(this.viewport.matches);
  private router = inject(Router);
  private pageTitle = inject(Title);
  private hasNavigated = false;

  constructor() {
    const onResize = (event: MediaQueryListEvent) => {
      this.mobile.set(event.matches);
      if (!event.matches) this.menuOpen.set(false);
    };
    this.viewport.addEventListener('change', onResize);
    inject(DestroyRef).onDestroy(() => this.viewport.removeEventListener('change', onResize));

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.menuOpen.set(false);
      requestAnimationFrame(() => {
        const heading = document.querySelector('#main-content h2')?.textContent?.trim();
        this.pageTitle.setTitle(heading
          ? `${heading.replace(/\s+/g, ' ')} | Agenda Virtual Escola Municipal Juriti `
          : 'Agenda Virtual Escola Municipal Juriti ');
        if (this.hasNavigated) focusMainHeading();
        this.hasNavigated = true;
      });
    });
  }

  toggleMenu() {
    this.menuOpen.update(value => !value);
    if (this.menuOpen() && this.mobile()) focusElement('#close-menu-button');
  }

  closeMenu() {
    const wasOpen = this.menuOpen();
    this.menuOpen.set(false);
    if (wasOpen && this.mobile()) focusElement('#open-menu-button');
  }

  skipToContent(event: Event): void {
    event.preventDefault();
    document.getElementById('main-content')?.focus();
  }
}
