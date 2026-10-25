import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-list-toolbar',
  standalone: true,
  template: `
    <div class="toolbar" role="search" [attr.aria-label]="label()">
      <label class="search-field">
        <i class="bi bi-search" aria-hidden="true"></i>
        <input
          type="search"
          placeholder="Buscar"
          [attr.aria-label]="label()"
          [value]="query()"
          (input)="search.emit($any($event.target).value)"
        />
      </label>
      <button type="button" (click)="refresh.emit()">
        <i class="bi bi-arrow-repeat" aria-hidden="true"></i>
        <span>Atualizar</span>
      </button>
    </div>
  `,
  styleUrl: './list-toolbar.scss',
})
export class ListToolbar {
  label = input('Buscar na lista');
  query = input('');
  search = output<string>();
  refresh = output<void>();
}
