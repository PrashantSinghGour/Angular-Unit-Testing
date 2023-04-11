import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './component/post/post.component';
import { PostDetailsComponent } from './component/post-details/post-details.component';

const routes: Routes = [
  {
    path: 'posts',
    component: PostComponent
  },
  {
    path: 'details/:id',
    component: PostDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
