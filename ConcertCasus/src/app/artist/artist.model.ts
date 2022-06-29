import { User } from "../user/user.model";

export  class Artist{
     _id: string;
     name: string;
     genre: string;
     image: string;
    // user: User;
    
     constructor(values = {}) {
          Object.assign(this, values);
        }
}