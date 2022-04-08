import { Music } from "../music/music.model";

export class Concert{
    _id: string;
    name: string;
    music: Music;
    tickets: Ticket;
    date: Date;
    adres: string;

}