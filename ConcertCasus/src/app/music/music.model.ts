import { Artist } from "../artist/artist.model";

export class Music {
    _id: string;
    name: string; 
    artist: Artist;
    duration: Number;
    image: string;
}