import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from 'src/app/alerts/alert.service';
import { Artist } from '../artist.model';

import { ArtistListComponent } from './artist-list.component';

describe('ArtistListComponent', () => {
  let component: ArtistListComponent;
  let fixture: ComponentFixture<ArtistListComponent>;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  

  beforeEach(async () => {
    return await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ArtistListComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MatDialog, useValue: {}},
        {provide: AlertService, useValue: {}}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post','put','delete']);
    fixture = TestBed.createComponent(ArtistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
