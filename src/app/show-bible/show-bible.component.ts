import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api-service.service';

// import biblesdata from '../../assets/bible.json'
import { switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-show-bible',
  templateUrl: './show-bible.component.html',
  styleUrls: ['./show-bible.component.scss'],
})
export class ShowBibleComponent implements OnInit {
  biblesdata: any;
  isModalOpen = false;
  data: any = {
    verse: {},
    TotalChapter: {},
    chapterStr: '',
    selectedVerse: {
      bibleId: "5b835ce16a1703ff-01", bookId: "GEN",
      chapterId: "GEN.1", id: "GEN.1.1", verse_id: 'verse_id is id',
      reference_nm: 'rఆదికాండం', reference_id: '1', chapter_Ids: '1'
    },
    Versions: [],
    BookName: 'ఆదికాండం',
  }




  constructor(private apiService: ApiService, private cmnService: CommonService) {
    this.biblesdata = this.apiService.getBible()
    // var booklength = this.biblesdata.Book.length;
    // console.log(this.biblesdata, booklength);
    // var Booid = Math.floor(Math.random() * booklength)
    // var Chapterlegth = this.biblesdata.Book[(Booid)].Chapter.length;
    // var chapterId = Math.floor(Math.random() * Chapterlegth)
    // var versionLegth = this.biblesdata.Book[(Booid - 0)].Chapter[(chapterId-0)].Verse.length
    // var versionId = Math.floor(Math.random() * versionLegth)
    // var version = this.biblesdata.Book[(Booid - 0)].Chapter[(chapterId-0)].Verse[(versionId - 0)]
    // console.log(version)
  }

  ngOnInit() {

    const t: any = localStorage.getItem(`vRsnsData`);
    const localSene = JSON.parse(t)
    if (localSene && [localSene] && [localSene].length && [localSene].length > 0) {
      this.getPassageData(localSene);
    }
  }




  onOpenModal(options: boolean) {
    this.isModalOpen = options;
  }
  onVerseData = (event: any) => {
    console.log(event);
    this.getPassageData(event);
    this.data.BookName = event.bk_nm;
    localStorage.setItem('vRsnsData', JSON.stringify(event));
    this.isModalOpen = !this.isModalOpen;


  }

  getPassageData = (data: any) => {
    this.data.Versions = [];
    this.data.BookName = data.bk_nm;
    console.log(data, this.biblesdata.Book[(data.book_id - 1)]);
    var isSelected = false
    this.biblesdata.Book[(data.book_id - 1)].Chapter[(data.chptr_id - 1)].Verse.forEach((k: any, i: number) => {
      if (i == (data.vrsn_id - 1)) {
        console.log("==========", i);
        isSelected = true;
      } else {
        isSelected = false;

      }
      this.data.Versions.push({
        book_id: data.book_id, chpter_id: data.chptr_id, vrsn_id: i + 1, Verse: k.Verse, bk_nm: data.bk_nm, isSelected: isSelected
      });
    })
    console.log(this.data.Versions)
  };


  onLongPress(e: any): void {
    console.log(e)
  }




  coppiedSelectedText = (obj: any) => {
    this.cmnService.writeToClipboard(obj);
    this.cmnService.checkClipboard()
  }

}
