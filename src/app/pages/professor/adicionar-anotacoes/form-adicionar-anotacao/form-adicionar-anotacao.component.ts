import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-adicionar-anotacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-adicionar-anotacao.component.html'
})
export class FormAdicionarAnotacaoComponent {

  @Output() salvar = new EventEmitter<any>();
  @Output() voltar = new EventEmitter<void>();

  texto = '';
  privado = false;

  enviar() {
    this.salvar.emit({
      texto: this.texto,
      privado: this.privado
    });

    this.texto = '';
    this.privado = false;
  }

}
