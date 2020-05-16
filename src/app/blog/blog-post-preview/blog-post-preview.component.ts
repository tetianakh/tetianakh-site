import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-blog-post-preview',
  templateUrl: './blog-post-preview.component.html',
  styleUrls: ['./blog-post-preview.component.sass'],
})
export class BlogPostPreviewComponent implements OnInit {
  @Input() post: Post;
  postBody: string;

  constructor() {}

  ngOnInit(): void {
    this.postBody = this.post.body.replace(/<[^>]*>/g, '');
  }
}
