import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTPService } from './service/http-service.service';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { BibleComponent } from './bible/bible.component';
import { BibleModule } from './bible/bible.module';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowBibleModule } from './show-bible/show-bible.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,ShowBibleModule, 
    BrowserAnimationsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },HTTPService,HTTP],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule {}
