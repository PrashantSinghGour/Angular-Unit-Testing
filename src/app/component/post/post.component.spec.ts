import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/models/Post';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let posts: Post[] = [];
  let mockPostService: any;
  beforeEach(async () => {
    mockPostService = jasmine.createSpyObj(['getPost', 'deletePost']);
    await TestBed.configureTestingModule({
      providers: [
        PostComponent,
        {
          provide: PostService,
          useValue: mockPostService
        },
      ],
    }).compileComponents();


    // fixture = TestBed.createComponent(PostComponent);
    // component = fixture.componentInstance;
    component = TestBed.inject(PostComponent);
    // fixture.detectChanges();
    // component = new PostComponent(mockPostService);
    posts = [
      {
        id: 1,
        userId: 1,
        body: 'dummy body 1',
        title: 'dummy title 1'
      },
      {
        id: 2,
        userId: 1,
        body: 'dummy body 1',
        title: 'dummy title 1'
      },
      {
        id: 3,
        userId: 1,
        body: 'dummy body 1',
        title: 'dummy title 1'
      }
    ];

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('delete', () => {
    beforeEach(() => {
      mockPostService.deletePost.and.returnValue(of(true));
      component.posts = posts;
      component.deletePost(posts[0]);
    });

    it('should delete the selected post from the posts', () => {
      expect(component.posts.length).toBe(2);
    });

    it('should delete the actual post', () => {
      component.posts.forEach((p: Post) => {
        expect(p.id).not.toBe(posts[0].id)
      });
    });

    it('should call the delete method in post service only once', () => {
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
    });
  });
});
