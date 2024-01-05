import { Component, OnInit } from '@angular/core';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-biblecalander',
  templateUrl: './biblecalander.component.html',
  styleUrls: ['./biblecalander.component.scss'],
})
export class BiblecalanderComponent implements OnInit {

  constructor(private i18n: NzI18nService) { }

  ngOnInit() {
    this.i18n.setLocale(en_US);
   }

  date = new Date();
  mode: NzCalendarMode = 'month';

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }

  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

}
