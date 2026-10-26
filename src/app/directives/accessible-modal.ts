import { Directive, ElementRef, inject } from '@angular/core';
import { focusMainHeading, trapTabKey } from '../utils/focus-management';

@Directive({
  selector: '[appAccessibleModal]',
  standalone: true,
  host: {
    '(show.bs.modal)': 'rememberFocus()',
    '(shown.bs.modal)': 'focusInitialControl()',
    '(hide.bs.modal)': 'releaseFocus()',
    '(hidden.bs.modal)': 'restoreFocus()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class AccessibleModal {
  private element = inject<ElementRef<HTMLElement>>(ElementRef);
  private opener: HTMLElement | null = null;

  onKeydown(event: KeyboardEvent): void {
    trapTabKey(event, this.element.nativeElement);
  }

  rememberFocus(): void {
    this.opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  }

  focusInitialControl(): void {
    const modal = this.element.nativeElement;
    (modal.querySelector<HTMLElement>('[data-modal-initial-focus]')
      ?? modal.querySelector<HTMLElement>('.modal-footer .btn-secondary')
      ?? modal.querySelector<HTMLElement>('.modal-footer button')
      ?? modal.querySelector<HTMLElement>('.btn-close'))?.focus();
  }

  releaseFocus(): void {
    if (this.element.nativeElement.contains(document.activeElement)) {
      this.opener?.focus();
      if (this.element.nativeElement.contains(document.activeElement)) {
        (document.activeElement as HTMLElement)?.blur();
      }
    }
  }

  restoreFocus(): void {
    if (document.querySelector('.modal.show')) return;
    if (this.opener?.isConnected && this.opener.getClientRects().length && !this.opener.closest('[inert]')) {
      this.opener.focus();
    } else {
      focusMainHeading();
    }
  }
}
