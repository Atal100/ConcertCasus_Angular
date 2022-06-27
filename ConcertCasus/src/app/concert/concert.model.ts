import { Artist } from "../artist/artist.model";
import { Music } from "../music/music.model";
import { Ticket } from "../ticket/ticket.model";

export class Concert{
    _id: string;
    name: string;
    music: Music;   
    date: Date;
    adres: string;

    constructor(values = {}) {
        Object.assign(this, values);
      }

}