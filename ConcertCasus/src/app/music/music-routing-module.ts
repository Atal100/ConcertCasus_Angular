import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MusicDetailComponent } from "./music-detail/music-detail.component";
import { MusicEditComponent } from "./music-edit/music-edit.component";
import { MusicListComponent } from "./music-list/music-list.component";
import { MusicNewComponent } from "./music-new/music-new.component";
import { MusicComponent } from "./music.component";

const routes: Routes = [
    {path: "music/list",
    component: MusicListComponent,
    children: [
        {path: "new", component: MusicNewComponent},
        {path: ":id", component: MusicDetailComponent},
        
        {path: "edit/:id", component: MusicEditComponent,
        data: {
            title: "Edit Music"
        }}
    ]},

    {path: "music",
    component: MusicComponent,
    children: [
        {path: "new", component: MusicNewComponent},
        {path: ":id", component: MusicDetailComponent},
        
        {path: "edit/:id", component: MusicEditComponent,
        data: {
            title: "Edit Music"
        }}
    ]},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class MusicRoutingModule {}