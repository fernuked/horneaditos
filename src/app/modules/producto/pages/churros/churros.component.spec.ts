import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurrosComponent } from './churros.component';

describe('ChurrosComponent', () => {
  let component: ChurrosComponent;
  let fixture: ComponentFixture<ChurrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChurrosComponent]
    });
    fixture = TestBed.createComponent(ChurrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
