import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../shared/services/post.service';
import { CommonModule, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LikeComponent } from "../shared/post/like/like.component";
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgFor, ReactiveFormsModule, LikeComponent],
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

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      next: (res: any) => {
        this.posts = res;
      },
      error: (err) => {
        console.log(err);
      }

    })

    console.log(this.authService.getSignedInUser())
  }

}
