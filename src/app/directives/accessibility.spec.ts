import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccessibleControl } from './accessible-control';
import { AccessibleForm } from './accessible-form';
import { AccessibleModal } from './accessible-modal';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, AccessibleControl, AccessibleForm, AccessibleModal],
  template: `
    <form [formGroup]="form">
      <label for="test-email">Email</label>
      <input id="test-email" type="email" formControlName="email" />
      @if (form.controls.email.touched && form.controls.email.invalid) {
        <p id="test-email-error">Informe um email válido.</p>
      }
      <label for="test-optional">Observação</label>
      <input id="test-optional" formControlName="optional" />
      <button type="submit">Salvar</button>
    </form>
    <button id="test-opener">Excluir cadastro</button>
    <div appAccessibleModal role="dialog" aria-labelledby="test-dialog-title" id="test-dialog">
      <h2 id="test-dialog-title">Confirmar exclusão</h2>
      <button class="btn-close" aria-label="Fechar confirmação"></button>
      <div class="modal-footer">
        <button class="btn-secondary" id="test-cancel">Cancelar</button>
        <button>Excluir</button>
      </div>
    </div>
  `,
})
class TestPage {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    optional: new FormControl(''),
  });
}

describe('Acessibilidade de formulários e modais', () => {
  let fixture: ComponentFixture<TestPage>;
  let root: HTMLElement;
  const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPage],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(TestPage);
    fixture.detectChanges();
    root = fixture.nativeElement;
  });

  it('identifica campos obrigatórios sem anunciar erro antes da interação', () => {
    const field = root.querySelector<HTMLInputElement>('#test-email')!;
    expect(field.required).toBeTrue();
    expect(field.getAttribute('aria-required')).toBe('true');
    expect(field.getAttribute('aria-invalid')).toBe('false');
    expect(field.hasAttribute('aria-describedby')).toBeFalse();
  });

  it('mantém campos opcionais sem a restrição de preenchimento', () => {
    const field = root.querySelector<HTMLInputElement>('#test-optional')!;
    expect(field.required).toBeFalse();
    expect(field.getAttribute('aria-required')).toBe('false');
  });

  it('associa o erro visível ao campo inválido depois da interação', () => {
    fixture.componentInstance.form.controls.email.markAsTouched();
    fixture.detectChanges();
    const field = root.querySelector('#test-email')!;
    expect(field.getAttribute('aria-invalid')).toBe('true');
    expect(field.getAttribute('aria-describedby')).toBe('test-email-error');
    expect(root.querySelector('#test-email-error')).not.toBeNull();
  });

  it('remove o estado de erro e sua descrição depois da correção', () => {
    fixture.componentInstance.form.controls.email.markAsTouched();
    fixture.componentInstance.form.controls.email.setValue('teste@example.com');
    fixture.detectChanges();
    const field = root.querySelector('#test-email')!;
    expect(field.getAttribute('aria-invalid')).toBe('false');
    expect(field.hasAttribute('aria-describedby')).toBeFalse();
    expect(root.querySelector('#test-email-error')).toBeNull();
  });

  it('leva o foco ao primeiro campo inválido ao tentar enviar o formulário', async () => {
    root.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();
    await nextFrame();
    expect(document.activeElement?.id).toBe('test-email');
    expect(fixture.componentInstance.form.controls.email.touched).toBeTrue();
  });

  it('prioriza Cancelar ao abrir uma confirmação de exclusão', () => {
    const modal = root.querySelector('#test-dialog')!;
    modal.dispatchEvent(new Event('shown.bs.modal'));
    expect(document.activeElement?.id).toBe('test-cancel');
  });

  it('devolve o foco ao controle que abriu o modal depois de fechá-lo', () => {
    root.querySelector<HTMLElement>('#test-opener')!.focus();
    const modal = root.querySelector('#test-dialog')!;
    modal.dispatchEvent(new Event('show.bs.modal'));
    modal.dispatchEvent(new Event('shown.bs.modal'));
    modal.dispatchEvent(new Event('hide.bs.modal'));
    modal.dispatchEvent(new Event('hidden.bs.modal'));
    expect(document.activeElement?.id).toBe('test-opener');
  });

  it('mantém Tab e Shift+Tab dentro do modal, inclusive nos limites da página', () => {
    const first = root.querySelector<HTMLElement>('#test-dialog .btn-close')!;
    const last = root.querySelector<HTMLElement>('#test-dialog .modal-footer button:last-child')!;
    last.focus();
    last.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(first);
    first.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(last);
  });
});
