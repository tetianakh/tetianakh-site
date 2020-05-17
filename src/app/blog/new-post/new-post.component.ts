import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '../blog.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../post.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass'],
})
export class NewPostComponent implements OnInit, OnDestroy {
  newPostForm: FormGroup;
  isAuthenticated: boolean;
  authSub: Subscription;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.newPostForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]),
    });

    this.authSub = this.authService.user.subscribe((user) => {
      console.log(user);
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  onSubmit() {
    if (this.newPostForm.invalid) {
      return;
    }
    const newPost = new Post(
      this.newPostForm.value.title,
      this.newPostForm.value.body,
      'Tetiana Khotiaintseva',
      new Date().getTime()
    );
    const key = this.blogService.savePost(newPost);
    this.router.navigate(['blog', key]);
  }
}
