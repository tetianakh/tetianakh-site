export class Post {
  constructor(
    public title: string,
    public body: string,
    public timestamp: number,
    public published: boolean,
    public id: string = null
  ) {}
}
