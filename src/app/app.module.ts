import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StrengthPipe } from './pipes/strength/strength.pipe';
import { PostComponent } from './component/post/post.component';
import { HttpClientModule } from '@angular/common/http';
import { SinglePostComponent } from './component/single-post/single-post/single-post.component';

@NgModule({
  declarations: [
    AppComponent,
    StrengthPipe,
    PostComponent,
    SinglePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
