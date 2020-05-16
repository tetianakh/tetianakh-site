import { Component, OnInit, Input } from '@angular/core';
import { PostComment } from '../post-comment.model';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.sass'],
})
export class PostCommentComponent implements OnInit {
  @Input() comment: PostComment;
  @Input() commentId: number;

  constructor() {}

  ngOnInit(): void {}
}
