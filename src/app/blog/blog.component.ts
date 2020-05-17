import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { BlogService } from './blog.service';
import { Post } from './post.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DOCUMENT } from '@angular/common';

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

  sectionHeight: number;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    @Inject(DOCUMENT) document: HTMLDocument
  ) {
    this.sectionHeight =
      window.innerHeight - document.getElementById('footer').offsetHeight;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const page = params['page'];
      this.page = page ? page : 0;
      if (this.allPosts) {
        this.selectPage();
      }
    });

    this.sub = this.blogService.posts.subscribe((posts) => {
      this.allPosts = posts
        .slice()
        .filter((post) => post.published || this.authService.isAuthenticated)
        .sort((a, b) => b.timestamp - a.timestamp);
      this.selectPage();
    });
  }

  get lastPage() {
    if (this.allPosts.length === 0) {
      return 0;
    }
    return Math.floor((this.allPosts.length - 1) / this.pageSize);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  selectPage() {
    const start = this.page * this.pageSize;
    if (
      this.allPosts &&
      this.allPosts.length > 0 &&
      (start >= this.allPosts.length || start < 0)
    ) {
      this.router.navigate(['/not-found']);
    }
    this.posts = this.allPosts.slice(start, start + this.pageSize);
  }
}
