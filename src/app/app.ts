import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
}
