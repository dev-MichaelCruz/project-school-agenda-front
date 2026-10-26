import { Directive, ElementRef, inject } from '@angular/core';
import { NgControl, Validators } from '@angular/forms';

@Directive({
  selector: 'input[formControlName], select[formControlName], textarea[formControlName]',
  standalone: true,
  host: {
    '[attr.aria-invalid]': 'invalid',
    '[attr.aria-required]': 'required',
    '[attr.required]': 'required ? "" : null',
    '[attr.aria-describedby]': 'errorId',
  },
})
export class AccessibleControl {
  private ngControl = inject(NgControl, { self: true });
  private element = inject<ElementRef<HTMLElement>>(ElementRef);

  get invalid(): boolean {
    return !!(this.ngControl.control?.invalid && this.ngControl.control?.touched);
  }

  get required(): boolean {
    return this.ngControl.control?.hasValidator(Validators.required) ?? false;
  }

  get errorId(): string | null {
    return this.invalid && this.element.nativeElement.id
      ? `${this.element.nativeElement.id}-error`
      : null;
  }
}
