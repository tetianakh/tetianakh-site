import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.keySub = this.route.params.subscribe((params) => {
      this.key = params['key'];

      if (this.postSub) {
        this.postSub.unsubscribe();
      }
      this.postSub = this.blogService
        .getPostByKey(this.key)
        .subscribe((post) => {
          if (!post) {
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
  }
}
