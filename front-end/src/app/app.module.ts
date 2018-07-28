import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserListComponent } from './userlist/userlist.component';
import { FormPoster } from './service/form-post.service';
import { UserlistService } from './service/userlist.service';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const routes = [{path : 'register', component: FormComponent}, 
//{path: 'userlist', component: UserListComponent}
{path : '', component:WelcomeComponent}]

@NgModule({
  declarations: [AppComponent, FormComponent, UserListComponent, WelcomeComponent],
  imports: [BrowserModule, FormsModule, HttpModule, NgbModule.forRoot(), RouterModule.forRoot(routes)],
  providers: [FormPoster, UserlistService],
  bootstrap: [AppComponent],
})
export class AppModule {}
