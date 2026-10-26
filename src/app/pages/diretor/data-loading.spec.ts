import { Type, WritableSignal, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { FamilyService } from '../../services/family/family.service';
import { TeachersService } from '../../services/teachers/teachers.service';
import { ClassroomsService } from '../../services/classrooms/classrooms.service';
import { DATA_LOAD_TIMEOUT_MS, DataLoadState } from '../../utils/data-load-state';
import { DeletarFamilia } from './deletar-familia/deletar-familia';
import { DeletarProfessor } from './deletar-professor/deletar-professor';
import { GerenciarTurmas } from './gerenciar-turmas/gerenciar-turmas';

function testLoading<T extends { estadoDados: WritableSignal<DataLoadState> }>(
  name: string,
  component: Type<T>,
  service: Type<unknown>,
  method: string,
  reload: (instance: T) => void,
  row: object,
  rowText: string,
): void {
  describe(`${name}: carregamento da lista`, () => {
    let fixture: ComponentFixture<T>;
    let requests: Subject<object[]>[];
    let list: jasmine.Spy;
    const content = () => (fixture.nativeElement as HTMLElement).textContent ?? '';

    beforeEach(async () => {
      requests = [];
      list = jasmine.createSpy(method).and.callFake(() => {
        const request = new Subject<object[]>();
        requests.push(request);
        return request.asObservable();
      });

      await TestBed.configureTestingModule({
        imports: [component],
        providers: [
          provideZonelessChangeDetection(),
          { provide: service, useValue: { [method]: list } },
        ],
      }).compileComponents();

      jasmine.clock().install();
      fixture = TestBed.createComponent(component);
      fixture.detectChanges();
    });

    afterEach(() => {
      fixture.destroy();
      jasmine.clock().uninstall();
    });

    it('mostra o spinner enquanto a resposta está pendente, sem estado vazio', () => {
      expect(content()).toContain('Carregando dados...');
      expect(fixture.nativeElement.querySelector('.spinner-border')).not.toBeNull();
      expect(content()).not.toContain('Sem dados encontrados.');
    });

    it('substitui o spinner pelos dados após uma resposta demorada', () => {
      jasmine.clock().tick(10_000);
      requests[0].next([row]);
      requests[0].complete();
      fixture.detectChanges();

      expect(content()).toContain(rowText);
      expect(content()).not.toContain('Carregando dados...');
      expect(content()).not.toContain('Sem dados encontrados.');
    });

    it('mostra o estado vazio somente após uma resposta vazia', () => {
      requests[0].next([]);
      requests[0].complete();
      fixture.detectChanges();

      expect(content()).toContain('Sem dados encontrados.');
      expect(content()).not.toContain('Carregando dados...');
    });

    it('aguarda o timeout antes de mostrar o estado vazio e permitir nova tentativa', () => {
      jasmine.clock().tick(DATA_LOAD_TIMEOUT_MS - 1);
      fixture.detectChanges();
      expect(content()).toContain('Carregando dados...');
      expect(content()).not.toContain('Sem dados encontrados.');

      jasmine.clock().tick(1);
      fixture.detectChanges();
      expect(content()).toContain('Sem dados encontrados.');
      expect(content()).toContain('O tempo de espera se esgotou.');
      expect(content()).toContain('Tentar novamente');
      expect(requests[0].observers.length).toBe(0);
    });

    it('diferencia uma falha de conexão ou servidor de uma lista vazia', () => {
      requests[0].error(new Error('Falha no servidor'));
      fixture.detectChanges();

      expect(content()).toContain('Não foi possível carregar os dados.');
      expect(content()).not.toContain('Sem dados encontrados.');
      expect(content()).not.toContain('Carregando dados...');
    });

    it('reinicia o carregamento ao tentar novamente depois de um timeout', () => {
      jasmine.clock().tick(DATA_LOAD_TIMEOUT_MS);
      fixture.detectChanges();
      fixture.nativeElement.querySelector('app-data-feedback button').click();
      fixture.detectChanges();

      expect(list).toHaveBeenCalledTimes(2);
      expect(content()).toContain('Carregando dados...');
      expect(content()).not.toContain('Sem dados encontrados.');

      requests[1].next([row]);
      requests[1].complete();
      fixture.detectChanges();
      expect(content()).toContain(rowText);
    });

    it('mostra o spinner novamente ao atualizar uma lista já carregada', () => {
      requests[0].next([row]);
      requests[0].complete();
      fixture.detectChanges();

      reload(fixture.componentInstance);
      fixture.detectChanges();
      expect(content()).toContain('Carregando dados...');
      expect(content()).not.toContain(rowText);
      expect(content()).not.toContain('Sem dados encontrados.');
    });

    it('evita requisições simultâneas ao atualizar durante o carregamento', () => {
      reload(fixture.componentInstance);
      expect(list).toHaveBeenCalledTimes(1);
    });

    it('cancela a requisição pendente ao sair da tela', () => {
      fixture.destroy();
      expect(requests[0].observers.length).toBe(0);
    });
  });
}

testLoading(
  'Deletar família', DeletarFamilia, FamilyService, 'listarFamilias',
  (page) => page.carregarFamilias(),
  { responsibleId: 1, name: 'Família de teste' }, 'Família de teste',
);

testLoading(
  'Deletar professor', DeletarProfessor, TeachersService, 'listarProfessores',
  (page) => page.carregarProfessores(),
  { teacherId: 1, name: 'Professor de teste' }, 'Professor de teste',
);

testLoading(
  'Gerenciar turmas', GerenciarTurmas, ClassroomsService, 'getAllClassrooms',
  (page) => page.carregarTurmas(),
  { id: 1, nome: 'Turma de teste' }, 'Turma de teste',
);
