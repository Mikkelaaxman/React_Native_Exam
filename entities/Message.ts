 export class Message {
    constructor(public user: string, public message: string, public timestamp: Date, public id?: string,) { }
}

export enum Status {
    LIKED = "LIKED", UNLIKED = "UNLIKED"
}