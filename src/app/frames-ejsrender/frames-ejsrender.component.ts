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
  @Input() version: any = {};
  constructor() {
    console.log(this.version, "[[[[[[[[")
    // this.imageData.emit({ data: "nagesswararo" });
  }
  ngOnInit() {
    console.log(this.version, "234234")

    // this.convertHtmltoImages();

  }
  imgTags: any;
  ngOnChanges(data: any): void {
    console.log(data, this.version);

    this.convertHtmltoImages()
    console.log(this.imgTags, "pppppppppppppppppppppppppppppppppppppppppppppppppppp")
  }


  convertHtmltoImages = () => {
    var framedata = document.getElementById('covert-frame') as HTMLElement;
    var imgUrl = (m: any) => {
      console.log(m, "img");
      this.imgTags = m;
      //save image cde
      // document.location = m;
      // console.log(document, "sjwahfesbf");

      // var a = document.createElement("a"); //Create <a>
      // a.href = m; //Image Base64 Goes here
      // a.download = "Image.png"; //File name Here
      // a.click()
    }

    htmlToImage.toPng(framedata)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        // console.log(img, "=========");
        document.body.appendChild(img);
        // console.log(dataUrl, document);
        imgUrl(dataUrl)
        // return dataUrl
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
        // return error
      });
  }


}
