import { Artist } from "../artist/artist.model";
import { Concert } from "../concert/concert.model";
import { Music } from "../music/music.model";

export class Ticket {
    _id: string;
    artist: Artist;
    music: Music;
    concert: Concert;
    date: Date;
    price: DoubleRange;
    userId: number;

}