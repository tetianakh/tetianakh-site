import { PostComment } from './post-comment.model';

export class Post {
  constructor(
    public title: string,
    public body: string,
    public comments: PostComment[],
    public authorName: string,
    public timestamp: number,
    public authorId: string = null,
    public id: string = null
  ) {}
}
