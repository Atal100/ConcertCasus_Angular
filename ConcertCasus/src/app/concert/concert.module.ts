import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcertNewComponent } from './concert-new/concert-new.component';
import { ConcertEditComponent } from './concert-edit/concert-edit.component';
import { ConcertListComponent } from './concert-list/concert-list.component';
import { ConcertDetailComponent } from './concert-detail/concert-detail.component';
import { ConcertComponent } from './concert.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArtistRoutingModule } from '../artist/artist-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ConcertRoutingModule } from './concert-routing-module';



@NgModule({
  declarations: [
    ConcertComponent,
    ConcertNewComponent,
    ConcertEditComponent,
    ConcertListComponent,
    ConcertDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ConcertRoutingModule,
    RouterModule,
    
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule, 
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatTableModule,
  ],
  providers: [],
  exports: [ConcertComponent]
})
export class ConcertModule { }
