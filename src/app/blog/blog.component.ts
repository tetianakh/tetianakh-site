import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from './blog.service';
import { Post } from './post.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass'],
})
export class BlogComponent implements OnInit, OnDestroy {
  allPosts: Post[];
  posts: Post[];
  sub: Subscription;
  page = 0;
  pageSize = 5;
  lastPage = 0;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const page = params['page'];
      this.page = page ? page : 0;
      console.log(this.page);
      if (this.allPosts) {
        this.selectPage();
      }
    });

    this.sub = this.blogService.posts.subscribe((posts) => {
      this.allPosts = posts.slice().sort((a, b) => b.timestamp - a.timestamp);
      this.selectPage();
      this.lastPage = this.allPosts.length / this.pageSize;
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  selectPage() {
    const start = this.page * this.pageSize;
    if (start >= this.allPosts.length || start < 0) {
      this.router.navigate(['/not-found']);
    }
    this.posts = this.allPosts.slice(start, start + this.pageSize);
  }
}
