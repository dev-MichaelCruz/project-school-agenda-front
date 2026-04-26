import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarAnotacoes } from './enviar-anotacoes';

describe('EnviarAnotacoes', () => {
  let component: EnviarAnotacoes;
  let fixture: ComponentFixture<EnviarAnotacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviarAnotacoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarAnotacoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
