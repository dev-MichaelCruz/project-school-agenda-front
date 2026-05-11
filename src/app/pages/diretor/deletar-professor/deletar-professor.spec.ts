import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarProfessor } from './deletar-professor';

describe('DeletarProfessor', () => {
  let component: DeletarProfessor;
  let fixture: ComponentFixture<DeletarProfessor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletarProfessor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletarProfessor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
