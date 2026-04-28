import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarAnotacoesComponent } from './visualizar-anotacoes';

describe('VisualizarAnotacoesComponent', () => {
  let component: VisualizarAnotacoesComponent;
  let fixture: ComponentFixture<VisualizarAnotacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarAnotacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarAnotacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
