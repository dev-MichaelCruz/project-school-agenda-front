import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./components/login/login/login').then(
        (m) => m.Login
      ),
  },

  {
    path: 'cadastrar-familia',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/diretor/cadastrar-familia/cadastrar-familia').then(
        (m) => m.CadastrarFamilia
      ),
    data: {
      label: 'Cadastrar Família',
      role: 'diretor',
      showInSidebar: true,
    },
  },

  {
    path: 'gerenciar-turmas',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/diretor/gerenciar-turmas/gerenciar-turmas').then(
        (m) => m.GerenciarTurmas
      ),
    data: {
      label: 'Gerenciar turmas',
      role: 'diretor',
      showInSidebar: true,
    },
  },



  {
    path: 'deletar-familia',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/diretor/deletar-familia/deletar-familia').then(
        (m) => m.DeletarFamilia
      ),
    data: {
      label: 'Deletar Família',
      role: 'diretor',
      showInSidebar: true,
    },
  },

  {
    path: 'cadastrar-professor',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/diretor/cadastrar-professor/cadastrar-professor').then(
        (m) => m.CadastrarProfessor
      ),
    data: {
      label: 'Cadastrar Professor',
      role: 'diretor',
      showInSidebar: true,
    },
  },

  {
    path: 'deletar-professor',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/diretor/deletar-professor/deletar-professor').then(
        (m) => m.DeletarProfessor
      ),
    data: {
      label: 'Deletar Professor',
      role: 'diretor',
      showInSidebar: true,
    },
  },


  {
    path: 'adicionar-anotacoes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/professor/adicionar-anotacoes/adicionar-anotacoes').then(
        (m) => m.AdicionarAnotacoes
      ),
    data: {
      label: 'Adicionar Anotações',
      role: 'professor',
      showInSidebar: true,
    },
  },

  {
    path: 'visualizar-anotacoes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/professor/visualizar-anotacoes/visualizar-anotacoes').then(
        (m) => m.VisualizarAnotacoesComponent
      ),
    data: {
      label: 'Visualizar Anotações',
      role: 'professor',
      showInSidebar: true,
    },
  },

  {
    path: 'responsavel/adicionar-anotacoes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/professor/adicionar-anotacoes/adicionar-anotacoes').then(
        (m) => m.AdicionarAnotacoes
      ),
    data: {
      label: 'Adicionar Anotações - pais',
      role: 'responsavel',
      showInSidebar: true,
    },
  },

  {
    path: 'responsavel/visualizar-anotacoes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/professor/visualizar-anotacoes/visualizar-anotacoes').then(
        (m) => m.VisualizarAnotacoesComponent
      ),
    data: {
      label: 'Visualizar Anotações - pais',
      role: 'responsavel',
      showInSidebar: true,
    },
  },



  {
    path: 'logout',
    redirectTo: '',
    data: {
      label: 'Logout',
      showInSidebar: true,
    },
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];