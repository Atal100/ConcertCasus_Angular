import { User } from "../user/user.model";

export  class Artist{
     _id: string;
     name: string;
   //  genre: string;
    // country: string;
    // user: User;
    
     constructor(values = {}) {
          Object.assign(this, values);
        }
}