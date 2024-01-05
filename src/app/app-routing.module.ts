import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BibleComponent } from './bible/bible.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'folder/Inbox',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // }
  // {
  //   path: 'bible/app',
  //   redirectTo: 'bible',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'bible',
  //   loadChildren: () => import('../app/bible/bible.module').then( m => m.BibleModule)
  // }

  {
    path: 'bible/app',
    redirectTo: 'bible',
    pathMatch: 'full',
  },
  {
    path: 'bible',
    loadChildren: () => import('../app/show-bible/show-bible.module').then(m => m.ShowBibleModule)
  },
  {
    path: 'calander',
    loadChildren: () => import('../app/biblecalander/biblecalander.module').then(m => m.BiblecalanderModule)
  },

  {
    path: 'words',
    loadChildren: () => import('../app/biblewords/biblewords.module').then(m => m.BiblewordsModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
