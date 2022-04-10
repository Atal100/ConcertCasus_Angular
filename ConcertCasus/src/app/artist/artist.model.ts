export  class Artist{
     _id: string;
     name: string;
     genre: string;
     image: string;
    
     constructor(values = {}) {
          Object.assign(this, values);
        }
}