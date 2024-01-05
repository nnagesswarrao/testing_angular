import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShowBibleComponent } from './show-bible.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BibleModule } from '../bible/bible.module';
// import { BiblecalanderComponent } from './biblecalander/biblecalander.component';
// import { IonModal } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: ShowBibleComponent
  },
  // {
  //   path: 'calander',
  //   component: BiblecalanderComponent
  // }
];

@NgModule({
  declarations: [ShowBibleComponent],
  imports: [
    CommonModule,
    BibleModule,
    RouterModule.forChild(routes),
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    // IonModal
  ]
})
export class ShowBibleModule { }
