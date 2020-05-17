import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '../blog.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../post.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass'],
})
export class NewPostComponent implements OnInit {
  newPostForm: FormGroup;
  mode: string = 'new';
  key?: string;

  constructor(
    private blogService: BlogService,
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newPostForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]),
    });

    this.route.queryParams.subscribe((params) => {
      const postKey = params['postId'];
      this.key = postKey;
      if (postKey) {
        this.mode = 'edit';
        this.blogService.getPostByKey(postKey).subscribe((post) => {
          this.newPostForm = new FormGroup({
            title: new FormControl(post.title, [Validators.required]),
            body: new FormControl(post.body, [Validators.required]),
          });
        });
      }
    });
  }

  onSubmit() {
    if (this.newPostForm.invalid) {
      return;
    }
    if (this.mode === 'new') {
      const newPost = new Post(
        this.newPostForm.value.title,
        this.newPostForm.value.body,
        new Date().getTime(),
        false
      );
      const resp = this.blogService.savePost(newPost);
      this.router.navigate(['blog', resp.key]);
    } else {
      this.blogService.updatePost(this.key, {
        title: this.newPostForm.value.title,
        body: this.newPostForm.value.body,
      });
      this.router.navigate(['blog', this.key]);
    }
  }
}
