import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BibleComponent } from './bible.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatFormFieldModule } from '@angular/material/form-field';
// const MatModules = [FormsModule,
//   MatInputModule, MatSelectModule, MatFormFieldModule

// ]
const routes: Routes = [
  // {
  //   path: '',
  //   component: BibleComponent
  // }
];

@NgModule({
  declarations: [BibleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    IonicModule,
    ReactiveFormsModule
    // ...MatModules
  ],
  exports: [BibleComponent],
})
export class BibleModule { }
