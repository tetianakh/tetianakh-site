import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { DisqusModule } from 'ngx-disqus';

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
import { environment } from 'src/environments/environment';
import { BlogPostPreviewComponent } from './blog/blog-post-preview/blog-post-preview.component';
import { ShortenPipe } from './shared/shorten.pipe';
import { NewPostComponent } from './blog/new-post/new-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './blog/post/post.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GistComponent } from './shared/gist/gist.component';
import { DynamicHTMLModule } from './dynamic-html';
import { AuthComponent } from './auth/auth.component';

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
    BlogPostPreviewComponent,
    ShortenPipe,
    NewPostComponent,
    PostComponent,
    NotFoundComponent,
    GistComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    DynamicHTMLModule.forRoot({
      components: [{ component: GistComponent, selector: 'app-gist' }],
    }),
    DisqusModule.forRoot('tetianakh'),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
