import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [RouterOutlet],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  sidebarItems = signal<any[]>([

    // PROVISÓRIO = Cada tipo de usuário terá um menu diferenciado, isso é apenas um exemplo
    { route: '/dashboard', label: 'Dashboard' },
    { route: '/users', label: 'Usuários' },
    { route: '/settings', label: 'Configurações' }
  ]);
}
