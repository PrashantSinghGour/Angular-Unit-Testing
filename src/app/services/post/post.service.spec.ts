import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Post } from 'src/app/models/Post';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('PostService', () => {
  let service: PostService;
  let POSTS: Post[];
  let spyHttpClient: jasmine.SpyObj<HttpClient>;
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
    spyHttpClient = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: spyHttpClient
        }
      ],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPost()', () => {
    it('should return expected post when getPost is called', (done: DoneFn) => {
      spyHttpClient.get.and.returnValue(of(POSTS));
      service.getPost().subscribe({
        next: (result: Post[]) => {
          expect(result).toEqual(POSTS);
          done();
        }, error: (error) => {
          done.fail(error);
        }
      });
      expect(spyHttpClient.get).toHaveBeenCalledTimes(1);
    });
  });

});
