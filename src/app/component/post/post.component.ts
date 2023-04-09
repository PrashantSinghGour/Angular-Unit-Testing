import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    this.postService.getPost().subscribe({
      next: (result) => {
        this.posts = result;
      }, error: (error) => {
        console.error(error);
      }
    });
  }

  deletePost(deletePost: Post) {
    this.posts = this.posts.filter((post: Post) => post.id !== deletePost.id);
    this.postService.deletePost(deletePost).subscribe();
  }
}
