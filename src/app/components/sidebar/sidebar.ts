import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  private router = inject(Router);

  menuItems = computed(() =>
    this.router.config
      .filter(route => route.data?.['showInSidebar'])
      .map(route => ({
        route: '/' + route.path,
        label: route.data?.['label']
      }))
  );

}
