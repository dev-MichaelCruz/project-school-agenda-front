import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotacoesViewComponent } from './anotacoes-view.component';

describe('AnotacoesViewComponent', () => {
  let component: AnotacoesViewComponent;
  let fixture: ComponentFixture<AnotacoesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnotacoesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnotacoesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
