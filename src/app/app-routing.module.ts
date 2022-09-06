import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequiresAuthenticationGuard } from './core/auth/requires-authentication.guard';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';
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
    },
    data: {
      title: 'Timeline'
    }
  },
  {
    path: 'p/add',
    component: PhotoFormComponent,
    canActivate: [RequiresAuthenticationGuard],
    data: {
      title: 'Photo Upload'
    }
  },
  {
    path: 'p/:photoId',
    component: PhotoDetailsComponent,
    data: {
      title: 'Photo Detail'
    }
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: {
      title: 'Not Found'
    }
  },
  {
    path: 'error',
    component: GlobalErrorComponent,
    data: { 
      title: 'Error'
    }
  },
  {
    path: '**',//if the user write some non-existent page
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],//useHash is to run in old browsers
  exports: [RouterModule]
})
export class AppRoutingModule { }
