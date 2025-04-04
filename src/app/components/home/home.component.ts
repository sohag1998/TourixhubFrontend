import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../shared/services/post.service';
import { CommonModule, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LikeComponent } from "../shared/post/like/like.component";
import { AuthService } from '../../shared/services/auth.service';
import { AddcommentComponent } from "../shared/post/addcomment/addcomment.component";
import { CommentComponent } from "../shared/post/comment/comment.component";
import { AddpostComponent } from "../shared/post/addpost/addpost.component";
import { PostComponent } from "../shared/post/post/post.component";
import { SignalrService } from '../../shared/services/signalr.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, AddpostComponent, PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private signalrService: SignalrService,
    private authserVice: AuthService
  ) { }
  ngOnInit(): void {

    this.signalrService.startConnection(this.authserVice.getToken()!)
  }
  ngOnDestroy(): void {
    this.signalrService.stopConnection();
  }

}
