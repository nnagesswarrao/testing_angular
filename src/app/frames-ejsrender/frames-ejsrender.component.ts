import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

@Component({
  selector: 'app-frames-ejsrender',
  templateUrl: './frames-ejsrender.component.html',
  styleUrls: ['./frames-ejsrender.component.scss'],
})
export class FramesEjsrenderComponent implements OnInit, OnChanges {
  @Output() imageData: EventEmitter<object> = new EventEmitter();
  @Input() count: number = 0;
  constructor() {
    console.log(this.count, "[[[[[[[[")
    // this.imageData.emit({ data: "nagesswararo" });
  }
  ngOnInit() {
    console.log(this.count, "234234")

    // this.convertHtmltoImages();

  }
  ngOnChanges(data: any): void {
    console.log(data);
    this.convertHtmltoImages()
  }


  convertHtmltoImages = () => {
    var framedata = document.getElementById('covert-frame') as HTMLElement
    htmlToImage.toPng(framedata)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        console.log(img, "=========")

        document.body.appendChild(img);
        console.log(dataUrl, document)

      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }


}
