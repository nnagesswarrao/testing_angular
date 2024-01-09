import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api-service.service';

@Component({
  selector: 'app-biblewords',
  templateUrl: './biblewords.component.html',
  styleUrls: ['./biblewords.component.scss'],
})
export class BiblewordsComponent implements OnInit {
  Version = {};
  biblesdata: any;
  Books: any = [];
  constructor(private apiService: ApiService) {
    this.Books = this.apiService.getBibleBooks()
    this.biblesdata = this.apiService.getBible();
  }

  ngOnInit() { }

  getImagedata(event: any): void {
    console.log(event)

  }
  getBibelWords(): void {
    // this.Counter++;

    var booklength = this.biblesdata.Book.length;
    console.log(this.biblesdata, booklength);
    var Booid = Math.floor(Math.random() * booklength)
    var Chapterlegth = this.biblesdata.Book[(Booid)].Chapter.length;
    var chapterId = Math.floor(Math.random() * Chapterlegth)
    var versionLegth = this.biblesdata.Book[(Booid - 0)].Chapter[(chapterId - 0)].Verse.length
    var versionId = Math.floor(Math.random() * versionLegth)
    var version = this.biblesdata.Book[(Booid - 0)].Chapter[(chapterId - 0)].Verse[(versionId - 0)]
   
    let realChapterId=chapterId+1 ;
    let realVersionId= versionId+1;

    this.Version = {
      bookName: this.Books[Booid],
      chapterId: (realChapterId-0),
      versionId: (realVersionId-0),
      vernm: version.Verse,
      bookid: Booid,
      refVersion: version.Verse.concat(` - ${this.Books[Booid]}  ${realChapterId} : ${realVersionId} `)
    }
    console.log(typeof chapterId,chapterId,versionId,realChapterId,realVersionId,chapterId && chapterId==0,versionId && versionId==0 ,versionId==0,
      "I Love India");
  }
}
