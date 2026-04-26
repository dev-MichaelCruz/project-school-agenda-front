import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarAnotacoes } from './adicionar-anotacoes';

describe('AdicionarAnotacoes', () => {
  let component: AdicionarAnotacoes;
  let fixture: ComponentFixture<AdicionarAnotacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarAnotacoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarAnotacoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
