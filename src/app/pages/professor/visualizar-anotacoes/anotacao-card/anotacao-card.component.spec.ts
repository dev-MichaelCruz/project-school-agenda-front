import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotacaoCardComponent } from './anotacao-card.component';

describe('AnotacaoCardComponent', () => {
  let component: AnotacaoCardComponent;
  let fixture: ComponentFixture<AnotacaoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnotacaoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnotacaoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
