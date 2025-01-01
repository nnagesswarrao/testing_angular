import { Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ApiService } from '../service/api-service.service';
import { BibleService } from '../services/bible.service';
// import bibileJson from '../../assets/bible.json';

@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss'],
})
export class BibleComponent implements OnInit {
  @Output() onChangedatad: EventEmitter<object> = new EventEmitter();
  // @ViewChildren('bookItem') bookItems!: QueryList<ElementRef>;

  // @ViewChild('scrollToElement') scrollToElement!: ElementRef;
  bibileJson: any;
  Books: any = []
  data: any = {
    books: [],
    chapters: [],
    version: [],
    Words: {},
    TotalChapter: {},
    chapterStr: '',
    SelectedBook: {},
    selected: {
      book_id: '',
      chapter_id: '',
      version_id: '',
    }

  }

  constructor(private apiService: ApiService, private bibleService: BibleService) {
    this.data.books = this.getBibledata();

  }
  ngOnInit() {
    this.bibileJson = this.apiService.getBible();

    this.prepareBibledata();
  }


  // scrollToSelected() {
  //   this.scrollToElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  // }

  onSelectBook = (event: any) => {

    this.data.books.map((k: any) => {
      k.isSelect = false
    });
    event.isSelect = true;
    console.log("======", event)
    this.data.chapters = []
    this.data.selected.book_id = event.id
    this.bibileJson.Book[(event.id - 1)].Chapter.forEach((p: any, i: any) => {
      this.data.chapters.push({ chpter_id: i + 1, book_id: event.id, bk_nm: event.name })
    });
  



  }


  onSelectChapter = (event: any) => {
    this.data.version = [];
    this.data.chapters.map((k: any) => {
      k.isSelect = false
    });
    event.isSelect = true;

    this.bibileJson.Book[(event.book_id - 1)].Chapter[(event.chpter_id - 1)].Verse.forEach((p: any, i: any) => {
      this.data.version.push({ vrsn_id: i + 1, chptr_id: event.chpter_id, bk_nm: event.bk_nm, book_id: event.book_id })
    })

  }
  getBibledata = () => {
    var sampleData: any = [];
    this.Books = this.apiService.getBibleBooks();
    this.Books && this.Books.length && this.Books.forEach((mt: any, i: number) => {
      sampleData.push({ name: mt, id: i + 1 })

    });


    return sampleData
  }

  onSelectVersion = (event: any) => {
    this.data.version.map((k: any) => {
      k.isSelect = false
    });
    event.isSelect = true;
    this.bibleService.triggerScrollToVerse(event.vrsn_id);
    this.onChangedatad.emit(event);
  }
  prepareBibledata = () => {
    const t: any = localStorage.getItem(`vRsnsData`);
    var localSene: any = {}
    const jSNoBJS = JSON.parse(t);
    var selectedVerse: any = {
      vrsn_id: 1, chptr_id: 1, bk_nm: 'ఆదికాండం', book_id: 1
    }
    if (jSNoBJS && [jSNoBJS] && [jSNoBJS].length && [jSNoBJS].length > 0) {
      localSene = jSNoBJS;
    } else {
      localSene = selectedVerse;
    }

    if (localSene && [localSene] && [localSene].length && [localSene].length > 0) {
      this.data.books.map((k: any) => { if (localSene.book_id == k.id) { k.isSelect = true } });
      this.data.chapters = [];
      this.bibileJson.Book[(localSene.book_id - 1)].Chapter.forEach((p: any, i: any) => {
        if ((i + 1) == localSene.chptr_id) {
          this.data.chapters.push({ chpter_id: i + 1, book_id: localSene.book_id, bk_nm: localSene.bk_nm, isSelect: true })
        } else {
          this.data.chapters.push({ chpter_id: i + 1, book_id: localSene.book_id, bk_nm: localSene.bk_nm })
        }
      })
      this.data.version = [];

      this.bibileJson.Book[(localSene.book_id - 1)].Chapter[(localSene.chptr_id - 1)].Verse.forEach((p: any, i: any) => {
        if ((i + 1) == localSene.vrsn_id) {
          this.data.version.push({
            vrsn_id: i + 1,
            chptr_id: localSene.chptr_id, bk_nm: localSene.bk_nm,
            book_id: localSene.book_id, isSelect: true
          })
        } else {
          this.data.version.push({
            vrsn_id: i + 1,
            chptr_id: localSene.chptr_id, bk_nm:
              localSene.bk_nm, book_id: localSene.book_id
          })
        }
      })
    } 
    // this.scrollToSelected();


  }

  onVerseSelected(verseNumber: number) {
    this.bibleService.triggerScrollToVerse(verseNumber);
  }

}
