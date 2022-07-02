import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListResolver } from './photos/photo-list/photo-list-resolver';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',//the path needs to combine fully
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
  },
  {//when routes uses parameter in the URL, ActivatedRoute is used in the component
    path: 'user/:userName',
    component: PhotoListComponent,
    resolve: {
      photosResolver: PhotoListResolver //photos is a property to user the resolver
    }
  },
  {
    path: 'p',
    component: PhotoFormComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],//useHash is to run in old browsers
  exports: [RouterModule]
})
export class AppRoutingModule { }
