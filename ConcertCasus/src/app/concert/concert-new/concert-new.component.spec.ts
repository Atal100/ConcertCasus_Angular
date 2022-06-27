import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertNewComponent } from './concert-new.component';

describe('ConcertNewComponent', () => {
  let component: ConcertNewComponent;
  let fixture: ComponentFixture<ConcertNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcertNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcertNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
