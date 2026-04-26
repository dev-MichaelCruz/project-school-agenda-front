import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarFamilia } from './deletar-familia';

describe('DeletarFamilia', () => {
  let component: DeletarFamilia;
  let fixture: ComponentFixture<DeletarFamilia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletarFamilia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletarFamilia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
