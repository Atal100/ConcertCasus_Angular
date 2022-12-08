import { Artist } from "../artist/artist.model";
import { User } from "../user/user.model";

export class Music {
    _id: string;
    name: string; 
    artists: Artist[];
    duration: Number;
    country: string;
    userId: number;

    constructor(values = {}) {
        Object.assign(this, values);
      }
}