import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass'],
})
export class PostComponent implements OnInit, OnDestroy {
  key: string;
  post: Post;
  keySub: Subscription;
  postSub: Subscription;
  authSub: Subscription;
  isAuthenticated?: boolean = null;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authSub = this.authService.user.subscribe(
      (user) => (this.isAuthenticated = !!user)
    );
    this.keySub = this.route.params.subscribe((params) => {
      this.key = params['key'];

      if (this.postSub) {
        this.postSub.unsubscribe();
      }
      this.postSub = this.blogService
        .getPostByKey(this.key)
        .subscribe((post) => {
          if (!post || (!post.published && this.isAuthenticated === false)) {
            this.router.navigate(['/not-found']);
          }
          this.post = post;
        });
    });
  }

  ngOnDestroy() {
    if (this.keySub) {
      this.keySub.unsubscribe();
    }
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  onDeletePost() {
    this.blogService.deletePost(this.key);
    this.router.navigate(['/blog']);
  }

  obEditPost() {
    this.router.navigate(['/blog', 'new'], {
      queryParams: { postId: this.key },
    });
  }

  onPublishPost(state: boolean) {
    console.log(state);
    this.blogService
      .updatePost(this.key, { published: state })
      .then((resp) => console.log(resp));
  }
}
