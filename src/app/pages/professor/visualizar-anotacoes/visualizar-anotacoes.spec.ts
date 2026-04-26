import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarAnotacoes } from './visualizar-anotacoes';

describe('VisualizarAnotacoes', () => {
  let component: VisualizarAnotacoes;
  let fixture: ComponentFixture<VisualizarAnotacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarAnotacoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarAnotacoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
