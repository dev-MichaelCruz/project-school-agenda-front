import { Directive, ElementRef, inject } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Directive({
  selector: 'form[formGroup]',
  standalone: true,
  host: { '(submit)': 'onSubmit()' },
})
export class AccessibleForm {
  private form = inject(FormGroupDirective, { self: true });
  private element = inject<ElementRef<HTMLFormElement>>(ElementRef);

  onSubmit(): void {
    if (this.form.control.invalid) {
      this.form.control.markAllAsTouched();
      requestAnimationFrame(() => {
        this.element.nativeElement.querySelector<HTMLElement>(
          'input.ng-invalid:not([type="hidden"]), select.ng-invalid, textarea.ng-invalid',
        )?.focus();
      });
    }
  }
}
