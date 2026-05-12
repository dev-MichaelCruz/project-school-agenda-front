import {
  Component,
  computed,
  inject,
  input,
  output
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  private router = inject(Router);
  private auth = inject(AuthService);

  menuOpen = input<boolean>(false);

  close = output<void>();

  menuItems = computed(() => {

    const role = this.auth.role();

    return this.router.config
      .filter(route => {

        const show = route.data?.['showInSidebar'];
        const routeRole = route.data?.['role'];

        return show && (!routeRole || routeRole === role);
      })
      .map(route => ({
        route: '/' + route.path,
        label: route.data?.['label']
      }));

  });

}