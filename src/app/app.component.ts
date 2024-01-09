import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  churchname: any = null
  public appPages = [
    { title: 'Bible', url: '/bible', icon: 'book' },
    { title: 'Calander', url: '/calander', icon: 'calendar' },
    { title: 'Today word', url: '/words', icon: 'today' },
    { title: 'Sign In', url: '/sign-in', icon: 'log-in', id: 4 },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {
    this.churchname = localStorage.getItem('charch');
    console.log(this.churchname)
  }
}
