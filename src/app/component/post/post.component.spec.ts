import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/models/Post';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, DebugElement, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SinglePostComponent } from '../single-post/single-post/single-post.component';
import { RouterTestingModule } from '@angular/router/testing';



describe('Posts Component', () => {
  let POSTS: Post[];
  let component: PostComponent;
  let mockPostService: any;
  let fixture: ComponentFixture<PostComponent>;
  @Component({
    selector: 'app-single-post',
    template: '<div></div>',
  })
  class FakeSinglePostComponent {
    @Input() post!: Post;
  }

  beforeEach(() => {
    POSTS = [
      {
        id: 1,
        body: 'body 1',
        title: 'title 1',
        userId: 1
      },
      {
        id: 2,
        body: 'body 2',
        title: 'title 2',
        userId: 1
      },
      {
        id: 3,
        body: 'body 3',
        title: 'title 3',
        userId: 1
      },
    ];

    mockPostService = jasmine.createSpyObj(['getPost', 'deletePost']);

    TestBed.configureTestingModule({
      // declarations: [PostComponent, FakeSinglePostComponent],
      declarations: [PostComponent, SinglePostComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
      imports: [RouterTestingModule]
    });

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
  });

  it('should set posts from the service directly', () => {
    mockPostService.getPost.and.returnValue(of(POSTS));
    fixture.detectChanges(); // this triggers component `ngOnInit()`
    expect(component.posts.length).toBe(3);
  });

  it('should create a SinglePostComponent for each post', () => {
    mockPostService.getPost.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const divElement = debugElement.queryAll(By.css('.posts'));
    expect(divElement.length).toBe(POSTS.length)
  });

  it('should create a SinglePostComponent for each post by directive', () => {
    mockPostService.getPost.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const divElement = debugElement.queryAll(By.directive(SinglePostComponent));
    expect(divElement.length).toBe(POSTS.length)
  });

  it('should set the post data correctly in each child component', () => {
    mockPostService.getPost.and.returnValue(of(POSTS));
    fixture.detectChanges();
    const singlePostComponentDEs = fixture.debugElement.queryAll(By.directive(SinglePostComponent));
    singlePostComponentDEs.forEach((singlePostComponentDE: DebugElement, index: number) => {
      const singlePostComponentInstance = singlePostComponentDE.componentInstance as SinglePostComponent;
      expect(singlePostComponentInstance.post.title).toEqual(POSTS[index].title);
    })
  })

  describe('delete', () => {
    beforeEach(() => {
      mockPostService.deletePost.and.returnValue(of(true));
      component.posts = POSTS;
    });
    it('should delete the selected Post from the posts', () => {
      component.deletePost(POSTS[1]);
      expect(component.posts.length).toBe(2);
    });

    it('should delete the actual selected Post in Posts', () => {
      component.deletePost(POSTS[1]);
      for (let post of component.posts) {
        expect(post).not.toEqual(POSTS[1]);
      }
    });

    it('should call the delete method in Post Service only once', () => {
      component.deletePost(POSTS[1]);
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
    });
  });
});
