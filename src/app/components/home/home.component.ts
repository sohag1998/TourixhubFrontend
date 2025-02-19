import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../shared/services/post.service';
import { CommonModule, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LikeComponent } from "../shared/post/like/like.component";
import { AuthService } from '../../shared/services/auth.service';
import { AddcommentComponent } from "../shared/post/addcomment/addcomment.component";
import { CommentComponent } from "../shared/post/comment/comment.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgFor, ReactiveFormsModule, LikeComponent, AddcommentComponent, CommentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(
    private postService: PostService,
    private authService: AuthService

  ) { }
  private formBuilder = inject(FormBuilder)
  posts: Post[] = [];
  commentCounts: { [postId: string]: number } = {};

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (res: any) => {
        this.posts = res;
        this.posts.forEach(post => {
          this.commentCounts[post.id] = post.commentCount || 0;
        })
      },
      error: (err) => {
        console.log(err);
      }

    })

    console.log(this.authService.getSignedInUser())
    console.log(this.commentCounts);

  }

  receivedCommentCount(posId: string, data: number) {
    this.commentCounts[posId] = data;
  }

}
