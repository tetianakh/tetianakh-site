import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-published-tag',
  templateUrl: './published-tag.component.html',
  styleUrls: ['./published-tag.component.sass'],
})
export class PublishedTagComponent implements OnInit {
  @Input() published: boolean;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
