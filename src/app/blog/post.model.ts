export class Post {
  constructor(
    public title: string,
    public body: string,
    public timestamp: number,
    public id: string = null
  ) {}
}
