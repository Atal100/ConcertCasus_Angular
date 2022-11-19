import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { MusicDetailComponent } from "./music-detail/music-detail.component";
import { MusicEditComponent } from "./music-edit/music-edit.component";
import { MusicListComponent } from "./music-list/music-list.component";
import { MusicNewComponent } from "./music-new/music-new.component";
import { MusicComponent } from "./music.component";

const routes: Routes = [
    {path: "music/list",
    component: MusicListComponent,
    // canActivate: [AuthGuard],
    children: [
      
        // {path: ":id", component: MusicDetailComponent}
       
    ]},

    {path: "music",
    component: MusicComponent,
    // canActivate: [AuthGuard],
    children: [
        {path: "new", component: MusicNewComponent},
    
        {path: ":id", component: MusicDetailComponent},    
        {path: "edit/:id", component: MusicEditComponent},

      
    
    ]},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class MusicRoutingModule {}