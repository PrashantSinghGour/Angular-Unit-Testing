import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailsComponent } from './post-details.component';
import { PostService } from 'src/app/services/post/post.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;
  let mockPostService: jasmine.SpyObj<PostService>
  let POSTS: Post[];
  beforeEach(async () => {
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
    mockPostService = jasmine.createSpyObj(['getSinglePost', 'updatePost']);
    let mockLocation = jasmine.createSpyObj(['back']);
    let mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (name: string) => { return '3' }
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [PostDetailsComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService
        },
        {
          provide: Location,
          useValue: mockLocation
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title in the h2 element', () => {
    mockPostService.getSinglePost.and.returnValue(of(POSTS[0]));
    fixture.detectChanges();

    const titleDiv = (fixture.debugElement.query(By.css('.post-title')).nativeElement as HTMLElement);
    expect(titleDiv.innerText).toBe(POSTS[0].title);
  })
});
