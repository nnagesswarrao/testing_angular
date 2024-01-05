import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BiblecalanderComponent } from './biblecalander.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzButtonModule } from 'ng-zorro-antd/button';
const apiroutes: Routes = [
  { path: '', component: BiblecalanderComponent }
]

@NgModule({
  declarations: [BiblecalanderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(apiroutes),
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NzCalendarModule,
    NzButtonModule
  ]
})
export class BiblecalanderModule { }
