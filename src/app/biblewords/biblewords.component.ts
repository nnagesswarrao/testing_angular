import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-biblewords',
  templateUrl: './biblewords.component.html',
  styleUrls: ['./biblewords.component.scss'],
})
export class BiblewordsComponent implements OnInit {
  Counter = 0;
  constructor() { }

  ngOnInit() { }

  getImagedata(event: any): void {
    console.log(event)

  }
  getBibelWords(): void {
    this.Counter++;
  }
}
