import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BiblewordsComponent } from './biblewords.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FramesEjsrenderModule } from '../frames-ejsrender/frames-ejsrender.module';
const apiroutes:Routes=[
  {path:'', component:BiblewordsComponent}
]

@NgModule({
  declarations: [BiblewordsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(apiroutes),
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FramesEjsrenderModule
    
  ]
})
export class BiblewordsModule { }
