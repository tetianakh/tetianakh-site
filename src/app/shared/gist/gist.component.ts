import {
  Component,
  Input,
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
  @Input() file: string;
  gistid: string;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.gistid = this.elementRef.nativeElement.getAttribute('gistid');
  }

  ngAfterViewInit() {
    let fileName = this.file ? this.file : '';
    this.iframe.nativeElement.id = 'gist-' + this.gistid;
    let doc =
      this.iframe.nativeElement.contentDocument ||
      this.iframe.nativeElement.contentElement.contentWindow;
    let content = `
        <html>
        <head>
          <base target="_parent">
        </head>
        <body onload="parent.document.getElementById('${this.iframe.nativeElement.id}')">
        <script type="text/javascript" src="https://gist.github.com/${this.gistid}.js?file=${fileName}"></script>
        </body>
      </html>
    `;
    doc.open();
    doc.write(content);
    doc.close();
  }
}
