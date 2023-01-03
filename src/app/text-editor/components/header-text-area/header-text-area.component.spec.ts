import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTextAreaComponent } from './header-text-area.component';

describe('HeaderTextAreaComponent', () => {
  let component: HeaderTextAreaComponent;
  let fixture: ComponentFixture<HeaderTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderTextAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
