import { Artist } from "../artist/artist.model";
import { User } from "../user/user.model";

export class Music {
    _id: string;
    name: string; 
    artist: Artist;
    duration: Number;
    image: string;
    user: User

    constructor(values = {}) {
        Object.assign(this, values);
      }
}