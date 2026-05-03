import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { roleEnum } from './types/role';
import { logoutGuard } from './guards/logout.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./components/login/login/login').then((m) => m.Login),
  },

  // rotas para a diretoria
  {
    path: 'cadastrar-familia',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/diretor/cadastrar-familia/cadastrar-familia').then((m) => m.CadastrarFamilia),
    data: {
      label: 'Cadastrar Família',
      role: roleEnum.DIRECTOR,
      showInSidebar: true,
    },
  },

  {
    path: 'gerenciar-turmas',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/diretor/gerenciar-turmas/gerenciar-turmas').then((m) => m.GerenciarTurmas),
    data: {
      label: 'Gerenciar turmas',
      role: roleEnum.DIRECTOR,
      showInSidebar: true,
    },
  },

  {
    path: 'deletar-familia',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/diretor/deletar-familia/deletar-familia').then((m) => m.DeletarFamilia),
    data: {
      label: 'Deletar Família',
      role: roleEnum.DIRECTOR,
      showInSidebar: true,
    },
  },

  {
    path: 'cadastrar-professor',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/diretor/cadastrar-professor/cadastrar-professor').then(
        (m) => m.CadastrarProfessor,
      ),
    data: {
      label: 'Cadastrar Professor',
      role: roleEnum.DIRECTOR,
      showInSidebar: true,
    },
  },

  {
    path: 'deletar-professor',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/diretor/deletar-professor/deletar-professor').then((m) => m.DeletarProfessor),
    data: {
      label: 'Deletar Professor',
      role: roleEnum.DIRECTOR,
      showInSidebar: true,
    },
  },

  // rotas para os professores
  {
    path: 'adicionar-anotacoes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/professor/adicionar-anotacoes/adicionar-anotacoes').then(
        (m) => m.AdicionarAnotacoes,
      ),
    data: {
      label: 'Adicionar Anotações',
      role: roleEnum.TEACHER,
      showInSidebar: true,
    },
  },

  {
    path: 'visualizar-anotacoes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/professor/visualizar-anotacoes/visualizar-anotacoes').then(
        (m) => m.VisualizarAnotacoesComponent,
      ),
    data: {
      label: 'Visualizar Anotações',
      role: roleEnum.TEACHER,
      showInSidebar: true,
    },
  },

  // rotas para os pais / responsáveis legais
  {
    path: 'responsavel/adicionar-anotacoes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/professor/adicionar-anotacoes/adicionar-anotacoes').then(
        (m) => m.AdicionarAnotacoes,
      ),
    data: {
      label: 'Adicionar Anotações',
      role: roleEnum.RESPONSIBLE,
      showInSidebar: true,
    },
  },

  {
    path: 'responsavel/visualizar-anotacoes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/professor/visualizar-anotacoes/visualizar-anotacoes').then(
        (m) => m.VisualizarAnotacoesComponent,
      ),
    data: {
      label: 'Visualizar Anotações',
      role: roleEnum.RESPONSIBLE,
      showInSidebar: true,
    },
  },

  {
    path: 'logout',
    canActivate: [logoutGuard],
    loadComponent: () =>
      import('./components/logout-component/logout-component').then((m) => m.LogoutComponent),
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
