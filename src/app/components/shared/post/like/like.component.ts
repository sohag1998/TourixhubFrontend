import { Component, inject, Input, input, OnInit } from '@angular/core';
import { PostService } from '../../../../shared/services/post.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignalrService } from '../../../../shared/services/signalr.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-like',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './like.component.html',
  styleUrl: './like.component.css'
})
export class LikeComponent implements OnInit {

  @Input() post: any; // Receive post as input
  likeForm!: FormGroup;

  isLiked: boolean = false;



  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private signalRService: SignalrService,
    private authSerive: AuthService
  ) { }


  ngOnInit() {
    this.likeForm = this.fb.group({
      postId: [this.post?.id]  // ✅ Set value here
    });

    if (this.post.likedByUserIds.includes(this.authSerive.getSignedInUser().UserId)) {
      this.isLiked = true
    }
    else {
      this.isLiked = false;
      console.log(this.isLiked)
    }



    this.signalRService.likeUpdates$.subscribe(update => {
      if (update && update.postId === this.post.id) {
        this.post.likeCount = update.likeCount;
      }
    });
  }

  onSubmitLikeToggle() {
    if (this.likeForm.valid) {
      this.postService.togglePostLike(this.likeForm.value).subscribe({
        next: (res: any) => {
          // console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  updateLikeBtn(liked: boolean) {
    if (liked) {
      this.isLiked = false;
    }
    else
      this.isLiked = true
  }
}
