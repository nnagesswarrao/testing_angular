import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api-service.service';

import biblesdata from '../../assets/bible.json'
import { switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-show-bible',
  templateUrl: './show-bible.component.html',
  styleUrls: ['./show-bible.component.scss'],
})
export class ShowBibleComponent implements OnInit {
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
    console.log(biblesdata)
  }

  ngOnInit() {

    const t: any = localStorage.getItem(`vRsnsData`);
    const localSene = JSON.parse(t)
    if (localSene && [localSene] && [localSene].length && [localSene].length > 0) {
      this.getPassageData(localSene);
    }
    // this.data.selectedVerse = localSene ? JSON.parse(localSene) : this.data.selectedVerse;
    // this.getChatersPages(this.data.selectedVerse.chapterId)
    // console.log(this.data.selectedVerse)
  }

  // splitByLastDot = function (text: any) {
  //   var index = text.lastIndexOf('.');
  //   return [text.slice(0, index), text.slice(index + 1)]
  // }


  onOpenModal(options: boolean) {
    this.isModalOpen = options;
  }
  // onVerseData(event: object) {
  //   console.log(event)
  // this.data.verse = event;

  // localStorage.setItem('slctV', JSON.stringify({
  //   bibleId: this.data.verse.bibleId, bookId: this.data.verse.bookId,
  //   chapterId: this.data.verse.chapterId, id: this.data.verse.id, verse_id: 'verse_id is id',
  //   reference_nm: this.data.verse.reference_nm.replace(/[0-9;:]/g, " "), reference_id: this.splitByLastDot(this.data.verse.id)[1],
  //   chapter_Ids: this.splitByLastDot(this.data.verse.chapterId)[1]
  // }))

  // this.data.selectedVerse = {
  //   bibleId: this.data.verse.bibleId, bookId: this.data.verse.bookId,
  //   chapterId: this.data.verse.chapterId, id: this.data.verse.id, verse_id: 'verse_id is id',
  //   reference_nm: this.data.verse.reference_nm.replace(/[0-9;:]/g, " "), reference_id: this.splitByLastDot(this.data.verse.id)[1],
  //   chapter_Ids: this.splitByLastDot(this.data.verse.chapterId)[1]
  // }
  // this.getChatersPages(this.data.verse.chapterId);
  // this.isModalOpen = !this.isModalOpen;
  // }

  onVerseData = (event: any) => {
    console.log(event);
    this.getPassageData(event);
    this.data.BookName = event.bk_nm;
    localStorage.setItem('vRsnsData', JSON.stringify(event))
    this.isModalOpen = !this.isModalOpen;


  }

  getPassageData = (data: any) => {
    this.data.Versions = [];
    this.data.BookName = data.bk_nm;
    console.log(data, biblesdata.Book[(data.book_id - 1)]);
    var isSelected = false
    biblesdata.Book[(data.book_id - 1)].Chapter[(data.chptr_id - 1)].Verse.forEach((k: any, i: number) => {
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
  }

    ;
  // getChatersPages = (value: any) => {
  //   // const rte = `5b835ce16a1703ff-01/chapters/${event}/verses`;
  //   const rte = `5b835ce16a1703ff-01/chapters/${value}`;

  //   this.apiService.getbible(rte).subscribe((res: any) => {
  //     this.data.TotalChapter = res.data;
  //     const replaeString: string = (((this.data.TotalChapter.content.replace(/<span/g, '<br><span')).replace(/<p class="s">/g, '')).replace(/<p class="p">/g, ''))
  //       .replace(/<\/p>/g, '').replace(/<\//g, '.</').replace(/<span/g, '<p class="text-makeup textheilight"> <span').replace(/<br>/g, '</p><br>').replace(/<\/span>/g, '')
  //       .replace(/<\/p>/g, '</span></p>');

  //     this.data.chapterStr = replaeString;

  //     console.log(this.data.chapterStr)

  //     this.getHeilightData();
  //   })
  // }
  // getHeilightData = () => {
  //   var myElement: any = document.getElementById("chapter-data");
  //   // var ajdsanjc:any = document.querySelector(`span[data-number="${this.data.selectedVerse.reference_id}"].v`);
  //   // console.log(ajdsanjc)
  //   // ajdsanjc.classList.add('higiwe8723392rhlighted');
  //   var spans: any = document.getElementsByTagName("span");
  //   var kpsmns = document.getElementsByClassName("v");

  //   console.log(kpsmns, spans.HTMLCollection)
  //   for (var i = 0; i < spans.length; i++) {
  //     var span = spans[i];
  //     console.log(span)
  //     // Check data attributes to identify the specific <span> element
  //     console.log(span.getAttribute("data-number"), this.data.selectedVerse.reference_id, span.getAttribute("data-number") == this.data.selectedVerse.reference_id)
  //     if (
  //       span.getAttribute("data-number") == this.data.selectedVerse.reference_id
  //     ) {
  //       // Add a class to highlight the element
  //       span.classList.add("highlighted_xghsgas");
  //     }
  //   }
  // }

  onLongPress(e: any): void {
    console.log(e)
  }




  coppiedSelectedText = (obj: any) => {
    this.cmnService.writeToClipboard(obj);
    this.cmnService.checkClipboard()
  }

  item = { text: 'Sample Text' };
  showShareIcon = false;
  showTagIcon = false;


  shareAction(): void {
    console.log('Share action');
    // Implement your share logic here
  }

  tagAction(): void {
    console.log('Tag action');
    // Implement your tag logic here
  }








}
