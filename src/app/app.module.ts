import { ChangeroleGuard } from './guard/changerole.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ScrumboardComponent } from './scrumboard/scrumboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './guard/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateprojectComponent } from './createproject/createproject.component';
import { ChangeroleComponent } from './changerole/changerole.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    ScrumboardComponent,
    HomepageComponent,
    CreateprojectComponent,
    ChangeroleComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
  ],
  providers: [AuthGuard, ChangeroleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
