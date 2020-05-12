import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resume-card',
  templateUrl: './resume-card.component.html',
  styleUrls: ['./resume-card.component.sass'],
})
export class ResumeCardComponent implements OnInit {
  @Input() title: string;
  @Input() timeRange: string;
  constructor() {}

  ngOnInit(): void {}
}
