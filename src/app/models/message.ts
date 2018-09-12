export class Message {
  constructor(
    public _id: String,
    public emitter: String,
    public receiver: String,
    public viewed: String,
    public text: String,
    public created_at: String
  ) {}
}
