import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarFamilia } from './cadastrar-familia';

describe('CadastrarFamilia', () => {
  let component: CadastrarFamilia;
  let fixture: ComponentFixture<CadastrarFamilia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarFamilia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarFamilia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
