import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService } from '../../../../shared/services/post.service';
import { Comment } from '../../../../models/post.model';
import { timeAgo } from '../../../../shared/utils/time-ago.util';
import { SignalrService } from '../../../../shared/services/signalr.service';

@Component({
  selector: 'app-comment',
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
  @Input() postId!: string;

  @Output() commentCount = new EventEmitter<number>();
  constructor(
    private postService: PostService,
    private signalRService: SignalrService
  ) { }

  comments: Comment[] = [];

  ngOnInit(): void {
    if (this.postId) {
      this.postService.getAllCommentByPostId(this.postId).subscribe({
        next: (res: any) => {
          this.comments = res;
          this.commentCount.emit(this.comments.length);
        },
        error: err => {
          console.log(err);

        }
      })
    }
    this.signalRService.commentsUpdates$.subscribe(update => {
      if (this.postId == update?.postId) {
        this.comments = update.comments;
        this.commentCount.emit(update.comments.length);
      }
    })

  }

  formatDate(date: Date): string {
    return timeAgo(date);
  }
}
