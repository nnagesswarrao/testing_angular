import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  charchName: any = null;
  constructor() { }

  ngOnInit() { }

  ChuchnameRegisted = () => {
    if (this.charchName && this.charchName.length > 0) {
      localStorage.setItem('charch', this.charchName)

    }
  }

}
