import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass'],
})
export class NewPostComponent implements OnInit {
  newPostForm: FormGroup;

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.newPostForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.newPostForm.invalid) {
      return;
    }
    const newPost = new Post(
      this.newPostForm.value.title,
      this.newPostForm.value.body,
      [],
      'Tetiana Khotiaintseva',
      new Date()
    );
    const key = this.blogService.savePost(newPost);
    this.router.navigate(['blog', key]);
  }
}
