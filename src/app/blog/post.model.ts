export class Post {
  constructor(
    public title: string,
    public body: string,
    public authorName: string,
    public timestamp: number,
    public authorId: string = null,
    public id: string = null
  ) {}
}
