import { TestBed } from "@angular/core/testing";
import { PostService } from "./post.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Post } from "src/app/models/Post";

describe('post service using HttpTestController and HttpClientTestingModule', () => {
  let postService: PostService;
  let httpTestingController: HttpTestingController;
  let POST: Post[];
  beforeEach(() => {
    POST = [
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
    TestBed.configureTestingModule({
      providers: [PostService],
      imports: [HttpClientTestingModule],
    })
    postService = TestBed.inject(PostService)
    httpTestingController = TestBed.inject(HttpTestingController);


  });

  it('should return post when getPost() is called', (done: DoneFn) => {
    postService.getPost().subscribe((result: Post[]) => {
      expect(result).toEqual(POST);
      done();
    });
    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
    req.flush(POST);
    expect(req.request.method).toBe('GET');
  });

})
