import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './home/resume/resume.component';
import { ResumeCardComponent } from './home/resume/resume-card/resume-card.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectsComponent } from './home/projects/projects.component';
import { ContactComponent } from './home/contact/contact.component';
import { BlogComponent } from './blog/blog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    HomeComponent,
    ResumeComponent,
    ResumeCardComponent,
    FooterComponent,
    ProjectsComponent,
    ContactComponent,
    BlogComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
