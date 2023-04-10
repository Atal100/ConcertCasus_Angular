import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from 'src/app/alerts/alert.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Artist } from '../artist.model';
import { ArtistService } from '../artist.service';

import { ArtistListComponent } from './artist-list.component';

describe('ArtistListComponent', () => {
  let component: ArtistListComponent;
  let mockAuthService: ArtistService;
  let mockRouter: Router;
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
  //  component = new ArtistListComponent(mockRouter,mockAuthService);
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
