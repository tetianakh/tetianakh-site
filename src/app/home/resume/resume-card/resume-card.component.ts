import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-resume-card',
  templateUrl: './resume-card.component.html',
  styleUrls: ['./resume-card.component.sass'],
})
export class ResumeCardComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  content?: string;
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.content = this.el.nativeElement;
  }
}
