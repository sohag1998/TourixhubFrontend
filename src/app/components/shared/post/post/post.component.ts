import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../../../shared/services/post.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { CommonModule, NgFor } from '@angular/common';
import { LikeComponent } from "../like/like.component";
import { CommentComponent } from "../comment/comment.component";
import { AddcommentComponent } from "../addcomment/addcomment.component";
import { Post } from '../../../../models/post.model';
import { timeAgo } from '../../../../shared/utils/time-ago.util';

@Component({
  selector: 'app-post',
  imports: [CommonModule, NgFor, LikeComponent, CommentComponent, AddcommentComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
  constructor(
    private postService: PostService,
    private authService: AuthService

  ) { }

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
  formatDate(date: Date): string {
    return timeAgo(date);
  }
}
