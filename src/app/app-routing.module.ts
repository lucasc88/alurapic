import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequiresAuthenticationGuard } from './core/auth/requires-authentication.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
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
    path: 'p/add',
    component: PhotoFormComponent,
    canActivate: [RequiresAuthenticationGuard]
  },
  {
    path: 'p/:photoId',
    component: PhotoDetailsComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],//useHash is to run in old browsers
  exports: [RouterModule]
})
export class AppRoutingModule { }
