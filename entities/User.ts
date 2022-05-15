export class User {
    id?: string;
    email: string;
    displayname?: string;
    photoUrl?: string

    constructor(email: string, displayname?: string, photoUrl?: string, id?: string) {
        this.id = id;
        this.email = email;
        this.displayname = displayname;
        this.photoUrl = photoUrl;
    }
}