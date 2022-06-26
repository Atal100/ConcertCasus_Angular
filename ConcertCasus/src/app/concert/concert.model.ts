import { Music } from "../music/music.model";
import { Ticket } from "../ticket/ticket.model";

export class Concert{
    _id: string;
    name: string;
    music: Music;
    tickets: Array<Ticket>;
    date: Date;
    adres: string;

}