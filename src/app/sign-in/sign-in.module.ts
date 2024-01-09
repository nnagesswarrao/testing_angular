import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const apirouts:Routes=[
  {path:'',component:SignInComponent}
]


@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(apirouts),
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  
  ]
})
export class SignInModule { }
