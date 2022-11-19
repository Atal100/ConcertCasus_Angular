import { Artist } from "../artist/artist.model";
import { User } from "../user/user.model";

export class Music {
    _id: string;
    name: string; 
    duration: Number;
    country: string;
    genre: string;
    artists: Artist[];
    //user: User

    constructor(values = {}) {
        Object.assign(this, values);
      }
}