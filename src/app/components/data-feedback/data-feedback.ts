import { Component, input, output } from '@angular/core';
import { DataLoadState } from '../../utils/data-load-state';

@Component({
  selector: 'app-data-feedback',
  standalone: true,
  template: `
    <div
      class="data-feedback"
      [attr.role]="state() === 'error' ? 'alert' : 'status'"
      aria-live="polite"
      aria-atomic="true"
    >
      @if (state() === 'idle' || state() === 'loading') {
        <span class="spinner-border text-primary" aria-hidden="true"></span>
        <p>Carregando dados...</p>
      } @else if (state() === 'timeout') {
        <p>Sem dados encontrados.</p>
        <p class="text-muted small">O tempo de espera se esgotou. Tente novamente.</p>
        <button type="button" class="btn btn-outline-primary" (click)="retry.emit()">
          Tentar novamente
        </button>
      } @else if (state() === 'error') {
        <p>Não foi possível carregar os dados.</p>
        <button type="button" class="btn btn-outline-primary" (click)="retry.emit()">
          Tentar novamente
        </button>
      } @else if (state() === 'empty') {
        <p class="text-muted">{{ emptyMessage() }}</p>
      }
    </div>
  `,
  styleUrl: './data-feedback.scss',
})
export class DataFeedback {
  state = input.required<DataLoadState | 'empty'>();
  emptyMessage = input('Sem dados encontrados.');
  retry = output<void>();
}
