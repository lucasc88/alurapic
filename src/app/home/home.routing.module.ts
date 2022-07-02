//each module you would like to apply lazy load, must has your own routing module
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth/auth.guard';
import { HomeComponent } from './home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
    {
        path: '',//actually, this route is not blank, '/home' route was declared in AppRouting
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: SigninComponent
            },
            {
                path: 'signup',
                component: SignupComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],//forChild() because only the AppRoutingModule is forRoot()
    exports: [RouterModule]
})
export class HomeRoutingModule { }
