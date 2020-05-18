import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-gist',
  templateUrl: './gist.component.html',
  styleUrls: ['./gist.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class GistComponent implements OnInit, AfterViewInit {
  @ViewChild('iframe') iframe: ElementRef;
  src: string;
  gistId: string;
  hasFooter: boolean;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.gistId = this.elementRef.nativeElement.getAttribute('gistId');
    const file = this.elementRef.nativeElement.getAttribute('file');
    this.src = `https://gist.github.com/${this.gistId}.js?file=${
      file ? file : ''
    }`;
    const footer = this.elementRef.nativeElement.getAttribute('footer');
    this.hasFooter = footer === 'true';
  }

  ngAfterViewInit() {
    let content = `
        <html>
        <head>
          <base target="_blank">
          <style>
          .gist-meta {
            display: ${this.hasFooter ? 'block' : 'none'};
          }
          </style>
        </head>
        <body onload="parent.document.getElementById('${this.gistId}')">
        <script type="text/javascript" src=${this.src}></script>
        </body>
      </html>
    `;
    this.doc.open();
    this.doc.write(content);
    this.doc.close();
  }

  get doc() {
    return (
      this.iframe.nativeElement.contentDocument ||
      this.iframe.nativeElement.contentElement.contentWindow
    );
  }

  onLoad() {
    const gist = this.doc.getElementsByClassName('gist')[0];
    if (gist) {
      this.iframe.nativeElement.style.height = gist.scrollHeight + 'px';
    }
  }
}
