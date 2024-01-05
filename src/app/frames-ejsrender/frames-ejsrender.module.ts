import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FramesEjsrenderComponent } from './frames-ejsrender.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FramesEjsrenderComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    
  ],
  exports:[FramesEjsrenderComponent]
})
export class FramesEjsrenderModule { }
