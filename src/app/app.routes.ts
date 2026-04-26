import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'cadastrar-familia',
    pathMatch: 'full'
  },

  {
    path: 'cadastrar-familia',
    loadComponent: () =>
      import('./pages/diretor/cadastrar-familia/cadastrar-familia')
        .then(m => m.CadastrarFamilia),
    data: {
      label: 'Cadastrar Família',
      role: 'diretor',
      showInSidebar: true
    }
  },

  {
    path: 'deletar-familia',
    loadComponent: () =>
      import('./pages/diretor/deletar-familia/deletar-familia')
        .then(m => m.DeletarFamilia),
    data: {
      label: 'Deletar Família',
      role: 'diretor',
      showInSidebar: true
    }
  },

  {
    path: 'cadastrar-professor',
    loadComponent: () =>
      import('./pages/diretor/cadastrar-professor/cadastrar-professor')
        .then(m => m.CadastrarProfessor),
    data: {
      label: 'Cadastrar Professor',
      role: 'diretor',
      showInSidebar: true
    }
  },

  {
    path: 'deletar-professor',
    loadComponent: () =>
      import('./pages/diretor/deletar-professor/deletar-professor')
        .then(m => m.DeletarProfessor),
    data: {
      label: 'Deletar Professor',
      role: 'diretor',
      showInSidebar: true
    }
  },

  {
    path: 'adicionar-anotacoes',
    loadComponent: () =>
      import('./pages/professor/adicionar-anotacoes/adicionar-anotacoes')
        .then(m => m.AdicionarAnotacoes),
    data: {
      label: 'Adicionar Anotações',
      role: 'professor',
      showInSidebar: true
    }
  },

  {
    path: 'visualizar-anotacoes',
    loadComponent: () =>
      import('./pages/professor/visualizar-anotacoes/visualizar-anotacoes')
        .then(m => m.VisualizarAnotacoes),
    data: {
      label: 'Visualizar Anotações',
      role: 'professor',
      showInSidebar: true
    }
  },

  {
    path: 'responsavel/visualizar-anotacoes',
    loadComponent: () =>
      import('./pages/responsavel/visualizar-anotacoes/visualizar-anotacoes')
        .then(m => m.VisualizarAnotacoes),
    data: {
      label: 'Visualizar Anotações',
      role: 'responsavel',
      showInSidebar: true
    }
  },

  {
    path: 'enviar-anotacoes',
    loadComponent: () =>
      import('./pages/responsavel/enviar-anotacoes/enviar-anotacoes')
        .then(m => m.EnviarAnotacoes),
    data: {
      label: 'Enviar Anotações',
      role: 'responsavel',
      showInSidebar: true
    }
  },

  {
    path: '**',
    redirectTo: 'cadastrar-familia'
  }

];
