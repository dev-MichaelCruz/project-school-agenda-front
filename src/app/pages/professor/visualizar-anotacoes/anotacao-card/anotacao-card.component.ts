import {
  Component,
  input,
  output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Role, roleEnum } from '../../../../types/role';


@Component({
  selector: 'app-anotacao-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anotacao-card.component.html',
  styleUrl: './anotacao-card.component.scss'
})
export class AnotacaoCardComponent {
  roleEnum = roleEnum;
  data = input.required<string>();
  lida = input(false);
  visivelTutores = input(true);
  selecionada = input(false);

  role = input<Role | null>(null);

  abrir = output<void>();

  onClick(): void {
    this.abrir.emit();
  }

}
