import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePostComponent } from './single-post.component';
import { Post } from 'src/app/models/Post';
import { first } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('SinglePostComponent', () => {
  let component: SinglePostComponent;
  let fixture: ComponentFixture<SinglePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SinglePostComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SinglePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the post title in the anchor element', () => {
    const post: Post = { id: 2, body: 'test body', title: 'test title', userId: 2 };
    component.post = post;
    fixture.detectChanges();
    const postElement: HTMLElement = fixture.nativeElement;
    const a = postElement.querySelector('a');
    expect(a?.textContent).toBe(post.title);
  });

  it('should render the post title in the anchor element (by debugElement)', () => {
    const post: Post = { id: 2, body: 'test body', title: 'test title', userId: 2 };
    component.post = post;
    fixture.detectChanges();
    const postDebugElement = fixture.debugElement;
    const a = postDebugElement.query(By.css('a')).nativeElement;
    // const a = postElement.querySelector('a');
    expect(a?.textContent).toBe(post.title);
  });

  it('should raise an event when the post delete is clicked', () => {
    const post: Post = { id: 2, body: 'test body', title: 'test title', userId: 2 };
    component.post = post;
    component.delete.pipe(first()).subscribe(selectedPost => {
      expect(selectedPost).toEqual(post);
    });

    component.onDeletePost(new MouseEvent('click'));
  })
});
