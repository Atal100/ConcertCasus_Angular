import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicComponent } from './music.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router'
import { ArtistRoutingModule } from '../artist/artist-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MusicDetailComponent } from './music-detail/music-detail.component';
import { MusicEditComponent } from './music-edit/music-edit.component';
import { MusicListComponent } from './music-list/music-list.component';
import { MusicNewComponent } from './music-new/music-new.component';
import { MusicRoutingModule } from './music-routing-module';



@NgModule({
  declarations: [
    MusicComponent,
    MusicDetailComponent,
    MusicEditComponent,
    MusicListComponent,
    MusicNewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MusicRoutingModule,
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

  providers:[],
  exports: [MusicComponent]
})
export class MusicModule { }
