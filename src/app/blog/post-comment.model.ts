export class PostComment {
  constructor(
    public authorName: string,
    public authorId: string,
    public body: string,
    public timestamp: Date
  ) {}
}
