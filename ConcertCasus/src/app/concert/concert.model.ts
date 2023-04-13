import { Artist } from "../artist/artist.model";
import { Music } from "../music/music.model";
import { Ticket } from "../ticket/ticket.model";
import { User } from "../user/user.model";

export class Concert{
    _id: string;
    name: string;
    artists: Artist[];   
    date: Date;
    adres: string;
    user: string;

    constructor(values = {}) {
        Object.assign(this, values);
      }

}