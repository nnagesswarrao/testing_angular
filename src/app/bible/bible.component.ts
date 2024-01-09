import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../service/api-service.service';
// import bibileJson from '../../assets/bible.json';

@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss'],
})
export class BibleComponent implements OnInit {
  @Output() onChangedatad: EventEmitter<object> = new EventEmitter()
  bibileJson:any;
  Books: any =[]
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

  constructor(private apiService: ApiService) {
    this.data.books = this.getBibledata();
   


  }
  ngOnInit() {
    this.bibileJson=this.apiService.getBible();
  }

  onSelectBook = (event: any) => {
    console.log("======", event)
    this.data.chapters = []
    this.data.selected.book_id = event.id
    this.bibileJson.Book[(event.id - 1)].Chapter.forEach((p: any, i: any) => {
      this.data.chapters.push({ chpter_id: i + 1, book_id: event.id, bk_nm: event.name })
    })
  }


  onSelectChapter = (event: any) => {
    this.data.version = []
    this.bibileJson.Book[(event.book_id - 1)].Chapter[(event.chpter_id - 1)].Verse.forEach((p: any, i: any) => {
      this.data.version.push({ vrsn_id: i + 1, chptr_id: event.chpter_id, bk_nm: event.bk_nm, book_id: event.book_id })
    })

  }
  getBibledata = () => {
    var sampleData: any = [];
    this.Books=this.apiService.getBibleBooks();
    this.Books && this.Books.length && this.Books.forEach((mt: any, i: number) => {
      sampleData.push({ name: mt, id: i + 1 })

    });


    return sampleData
  }

  onSelectVersion = (event: any) => {

    this.onChangedatad.emit(event)


  }


}
