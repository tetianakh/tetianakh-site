import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../post.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-blog-post-preview',
  templateUrl: './blog-post-preview.component.html',
  styleUrls: ['./blog-post-preview.component.sass'],
})
export class BlogPostPreviewComponent implements OnInit {
  @Input() post: Post;
  postBody: string;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.postBody = this.post.body.replace(/<[^>]*>/g, '');
  }
}
