import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsecasesComponent } from './usecases.component';

describe('UsercasesComponent', () => {
  let component: UsecasesComponent;
  let fixture: ComponentFixture<UsecasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsecasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsecasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
