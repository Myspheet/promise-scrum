import { ChangeroleGuard } from './guard/changerole.guard';
import { ChangeroleComponent } from './changerole/changerole.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { ScrumboardComponent } from './scrumboard/scrumboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {path: '', component: HomepageComponent },
  {path: 'home', component: HomepageComponent },
  {path: 'scrumboard/:project_id', component: ScrumboardComponent, canActivate: [ AuthGuard ]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'createproject', component: CreateprojectComponent},
  {path: 'changerole/:project_id', component: ChangeroleComponent, canActivate: [ AuthGuard, ChangeroleGuard ]},
  {path: '**', redirectTo: '/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
