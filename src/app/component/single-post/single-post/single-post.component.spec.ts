import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePostComponent } from './single-post.component';
import { Post } from 'src/app/models/Post';
import { first } from 'rxjs';

describe('SinglePostComponent', () => {
  let component: SinglePostComponent;
  let fixture: ComponentFixture<SinglePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SinglePostComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SinglePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise an event when the post delete is clicked', () => {
    const comp = new SinglePostComponent();
    const post: Post = { id: 2, body: 'test body', title: 'test title', userId: 2 };
    comp.post = post;
    comp.delete.pipe(first()).subscribe(selectedPost => {
      expect(selectedPost).toEqual(post);
    });

    comp.onDeletePost(new MouseEvent('click'));
  })
});
