import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../service/api-service.service';
import bibileJson from '../../assets/bible.json';

@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss'],
})
export class BibleComponent implements OnInit {
  @Output() onChangedatad: EventEmitter<object> = new EventEmitter()


  Books: any = [
    "ఆదికాండము", "నిర్గమకాండము", "లేవీయకాండము", "సంఖ్యాకాండము", "ద్వితీయోపదేశకాండమ", "యెహొషువ",
    "న్యాయాధిపతులు", "రూతు", "సమూయేలు మొదటి గ్రంథము", "సమూయేలు రెండవ గ్రంథము", "రాజులు మొదటి గ్రంథము",
    "రాజులు రెండవ గ్రంథము", "దినవృత్తాంతములు మొదటి గ్రంథము", "దినవృత్తాంతములు రెండవ గ్రంథము", "ఎజ్రా", "నెహెమ్యా", "ఎస్తేరు", "యోబు గ్రంథము",
    "కీర్తనల గ్రంథము", "సామెతలు", "ప్రసంగి", "పరమగీతము", "యెషయా గ్రంథము", "యిర్మీయా", "విలాపవాక్యములు", "యెహెజ్కేలు",
    "దానియేలు", "హొషేయ", "యోవేలు", "ఆమోసు", "ఓబద్యా", "యోనా", "మీకా", "నహూము", "హబక్కూకు", "జెఫన్యా",
    "హగ్గయి", "జెకర్యా", "మలాకీ", "మత్తయి సువార్త", "మార్కు సువార్త", "లూకా సువార్త", "యోహాను సువార్త", "అపొస్తలుల కార్యములు",
    "రోమీయులకు", "1 కొరింథీయులకు", "2 కొరింథీయులకు", "గలతీయులకు", "ఎఫెసీయులకు", "ఫిలిప్పీయులకు",
    "కొలొస్సయులకు", "1 థెస్సలొనీకయులకు", "2 థెస్సలొనీకయులకు", "1 తిమోతికి", "2 తిమోతికి", "తీతుకు", "ఫిలేమోనుకు",
    "హెబ్రీయులకు", "యాకోబు", "1 పేతురు", "2 పేతురు", "1 యోహాను", "2 యోహాను", "3 యోహాను", "యూదా", "ప్రకటన గ్రంథము"];




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
    this.data.books = this.getBibledata()
  }
  ngOnInit() {
    // this.getBibles()
  }


  onSelectBook = (event: any) => {
    this.data.chapters = []
    // var chapter = new Array(bibileJson.Book[(event.id - 1)].Chapter.length).fill({ id: i++ })
    this.data.selected.book_id = event.id
    bibileJson.Book[(event.id - 1)].Chapter.forEach((p: any, i: any) => {
      this.data.chapters.push({ chpter_id: i + 1, book_id: event.id, bk_nm: event.name })
    })
    console.log(event, bibileJson, this.data.chapters)

  }


  onSelectChapter = (event: any) => {
    this.data.version = []
    bibileJson.Book[(event.book_id - 1)].Chapter[(event.chpter_id - 1)].Verse.forEach((p: any, i: any) => {
      this.data.version.push({ vrsn_id: i + 1, chptr_id: event.chpter_id, bk_nm: event.bk_nm, book_id: event.book_id })
    })

    console.log(this.data.version)

  }
  getBibledata = () => {
    var sampleData: any = []
    this.Books && this.Books.length && this.Books.forEach((mt: any, i: number) => {
      sampleData.push({ name: mt, id: i + 1 })

    });


    return sampleData
  }

  onSelectVersion = (event: any) => {

    this.onChangedatad.emit(event)


  }

  // onSelectVersion = (event: any) => {
  //   const rte = `5b835ce16a1703ff-01/verses/${event.id}`
  //   this.apiService.getbible(rte).subscribe((res: any) => {
  //     this.data.Words = res.data;
  //     this.data.Words.reference_nm = this.data.SelectedBook.nameLong
  //     this.onChangedatad.emit(this.data.Words)
  //   })

  // }

  // onSelectChapter = (event: any) => {
  //   console.log(event)
  //   const rte = `5b835ce16a1703ff-01/chapters/${event.id}/verses`;
  //   // const rte = `5b835ce16a1703ff-01/chapters/${event}`;
  //   // this.getChatersPages(event);
  //   this.apiService.getbible(rte).subscribe((res: any) => {
  //     if (res && res.data && res.data.length > 0) {
  //       this.data.version = res.data;

  //     } else {

  //     }


  //   })

  // }

  // onSelectBook = (event: any) => {
  //   console.log(event)
  //   this.data.chapters = [];
  //   const rte = `5b835ce16a1703ff-01/books/${event.id}/chapters`;
  //   // const rte = `5b835ce16a1703ff-01/books/${event}/sections`;
  //   // this.data.books.map((k: any) => k.id == event)
  //   this.apiService.getbible(rte).subscribe((res: any) => {
  //     if (res && res.data && res.data.length > 0) {
  //       this.data.chapters = res.data;
  //     } else {

  //     }
  //     this.data.SelectedBook = event



  //   })

  // }

  // // onSelectBook = (event: any) => {
  // //   const rte = `5b835ce16a1703ff-01/books/${event}/chapters`;
  // //   // const rte = `5b835ce16a1703ff-01/books/${event}/sections`;
  // //   this.data.books.map((k: any) => k.id == event)
  // //   this.apiService.getbible(rte).subscribe((res: any) => {
  // //     if (res && res.data && res.data.length > 0) {
  // //       this.data.chapters = res.data;
  // //     } else {

  // //     }
  // //     this.data.SelectedBook = this.data.books.filter((k: any) => k.id == event)



  // //   })

  // // }
  // getBibles = () => {
  //   const rte = `5b835ce16a1703ff-01/books`
  //   this.apiService.getbible(rte).subscribe((res: any) => {
  //     if (res && res.data && res.data.length > 0) {
  //       this.data.books = res.data;
  //     } else {

  //     }



  //   })
  // }
  // getChatersPages = (value: any) => {
  //   // const rte = `5b835ce16a1703ff-01/chapters/${event}/verses`;
  //   const rte = `5b835ce16a1703ff-01/chapters/${value}`;

  //   this.apiService.getbible(rte).subscribe((res: any) => {
  //     // if (res && res.data && res.data.length > 0) {
  //     this.data.TotalChapter = res.data;
  //     this.data.chapterStr = this.data.TotalChapter.content

  //     // } else {

  //     // }


  //   })
  // }
}
