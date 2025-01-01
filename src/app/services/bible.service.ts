import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibleService {
  private scrollToVerseSubject = new Subject<number>();
  scrollToVerse$ = this.scrollToVerseSubject.asObservable();

  triggerScrollToVerse(verseNumber: number) {
    this.scrollToVerseSubject.next(verseNumber);
  }
} 