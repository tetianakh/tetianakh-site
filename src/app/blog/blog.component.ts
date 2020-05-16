import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from './blog.service';
import { Post } from './post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass'],
})
export class BlogComponent implements OnInit, OnDestroy {
  posts: Post[];
  sub: Subscription;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.sub = this.blogService.posts.subscribe((posts) => {
      this.posts = posts
        .slice()
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
