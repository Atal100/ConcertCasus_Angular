import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistNewComponent } from './artist-new.component';

describe('ArtistNewComponent', () => {
  let component: ArtistNewComponent;
  let fixture: ComponentFixture<ArtistNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
