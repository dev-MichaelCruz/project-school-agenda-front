import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  sidebarItems = signal<any[]>([
    // PROVISÓRIO = Cada tipo de usuário terá um menu diferenciado, isso é apenas um exemplo
    // menu diretor
    { route: '/cadastrar-familia', label: 'Cadastrar Familia' },
    { route: '/deletar-familia', label: 'Deletar Família' },
    { route: '/cadastrar-professor', label: 'Cadastrar Professor' },
    { route: '/deletar-professor', label: 'Deletar Professor' },

    // menu professor
    { route: '/adicionar-anotacoes', label: 'Adicionar Anotações' },
    { route: '/visualiar-anotacoes', label: 'Visualizar Anotações' },

    // menu pais
    { route: '/visualiar-anotacoes', label: 'Visualizar Anotações' },
    { route: '/enviar-anotacoes', label: 'Enviar Anotações' }
  ]);
}
