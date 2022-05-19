export class Comment {
    constructor(public status: Status, public message: string, public timestamp: Date, public id?: string,) { }
}

export enum Status {
    LIKED = "LIKED", UNLIKED = "UNLIKED"
}