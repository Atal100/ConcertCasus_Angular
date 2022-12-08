import { Artist } from "../artist/artist.model";
import { User } from "../user/user.model";

export class Music {
    _id: string;
    name: string; 
    artists: Artist[];
    genre: string;
    duration: Number;
    country: string;
    userId: string;

    constructor(values = {}) {
        Object.assign(this, values);
      }
}