
export class Chatroom {
  constructor(
    public title: string,
    public status: Status,
    public timestamp: Date,
    public messages?: any[],
    public id?: string
  ) {}
}

export enum Status {
  READ = "READ",
  UNREAD = "UNREAD",
}
