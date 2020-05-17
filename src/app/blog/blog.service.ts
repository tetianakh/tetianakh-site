import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  posts: Observable<Post[]>;

  constructor(private db: AngularFireDatabase) {
    this.posts = this.db
      .list<Post>('posts')
      .snapshotChanges()
      .pipe(
        map((posts) => {
          return posts.map(
            (p) =>
              new Post(
                p.payload.val().title,
                p.payload.val().body,
                p.payload.val().authorName,
                +p.payload.val().timestamp,
                p.payload.val().authorId,
                p.payload.key
              )
          );
        })
      );
  }

  savePost(newPost: Post) {
    return this.db.list<Post>('posts').push(newPost);
  }

  setPost(updatedPost: Post) {
    return this.db.list('posts').set(updatedPost.id, updatedPost);
  }

  updatePost(id: string, values: any) {
    return this.db.list('posts').update(id, values);
  }

  deletePost(deletedPostId: string) {
    return this.db.list('posts').remove(deletedPostId);
  }

  getPostByKey(key: string) {
    return this.db
      .object<Post>(`posts/${key}`)
      .valueChanges()
      .pipe(
        map(
          (post) =>
            new Post(
              post.title,
              post.body,
              post.authorName,
              post.timestamp,
              post.authorId,
              key
            )
        )
      );
  }
}
