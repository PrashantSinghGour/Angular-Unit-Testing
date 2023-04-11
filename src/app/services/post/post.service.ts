import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Post } from 'src/app/models/Post';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPost(): Observable<Post[]> {
    return this.httpClient.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  getSinglePost(postId: number): Observable<Post> {
    return this.httpClient.get<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }

  deletePost(post: Post) {
    return this.httpClient.delete(`https://jsonplaceholder.typicode.com/posts/{post.id}`);
  }

  updatePost(post: Post) {
    return this.httpClient.put(`https://jsonplaceholder.typicode.com/posts/{post.id}`, post);
  }


}
