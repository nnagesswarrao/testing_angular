import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../service/api-service.service';
import { BibleService } from '../services/bible.service';
import { Subscription } from 'rxjs';
import { IonContent } from '@ionic/angular';

// import biblesdata from '../../assets/bible.json'
import { switchMap, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-show-bible',
  templateUrl: './show-bible.component.html',
  styleUrls: ['./show-bible.component.scss'],
})
export class ShowBibleComponent implements OnInit, OnDestroy {
  @ViewChild(IonContent) content!: IonContent;
  private scrollSubscription: Subscription | undefined;

  biblesdata: any;
  isModalOpen = false;
  data: any = {
    verse: {},
    TotalChapter: {},
    chapterStr: '',
    selectedVerse: {
      vrsn_id:1, chptr_id: 1, bk_nm: 'ఆదికాండం', book_id: 1,
      bibleId: "5b835ce16a1703ff-01", bookId: "GEN",
      chapterId: "GEN.1", id: "GEN.1.1", verse_id: 'verse_id is id',
      reference_nm: 'ఆదికాండం', reference_id: '1', chapter_Ids: '1'
    },
    Versions: [],
    BookName: 'ఆదికాండం',
  }

  constructor(private apiService: ApiService, private cmnService: CommonService, private bibleService: BibleService) {
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
    this.scrollSubscription = this.bibleService.scrollToVerse$.subscribe(verseNumber => {
      if (this.content) {
        this.scrollToVerse(verseNumber);
      }
    });

    const t: any = localStorage.getItem(`vRsnsData`);
    const localSene = JSON.parse(t)
    if (localSene && [localSene] && [localSene].length && [localSene].length > 0) {
      this.getPassageData(localSene);
    } else {
      this.getPassageData(this.data.selectedVerse);
    }
  }

  ngOnDestroy() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  async scrollToVerse(verseNumber: number) {
    try {
      // Wait for content to be ready
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Find all verse elements
      const verses = document.querySelectorAll('.ion-padding p');
      const targetVerse = verses[verseNumber - 1] as HTMLElement;
      
      if (targetVerse && this.content) {
        // Remove any existing highlights
        verses.forEach(verse => verse.classList.remove('highlight-scroll'));
        
        // Scroll to the verse
        await this.content.scrollToPoint(0, targetVerse.offsetTop - 80, 500);
        
        // Add highlight effect
        targetVerse.classList.add('highlight-scroll');
        
        // Remove highlight after animation
        setTimeout(() => {
          targetVerse.classList.remove('highlight-scroll');
        }, 2000);
      }
    } catch (error) {
      console.error('Error scrolling to verse:', error);
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
