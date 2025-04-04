import { Component, OnInit } from '@angular/core';
import { AppUser } from '../../../../models/post.model';
import { FriendService } from '../../../../shared/services/friend.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat-left-side',
  imports: [NgFor, CommonModule, RouterLink],
  templateUrl: './chat-left-side.component.html',
  styleUrl: './chat-left-side.component.css'
})
export class ChatLeftSideComponent implements OnInit {

  inboxedUser: AppUser[] = []

  constructor(private friendsService: FriendService) {

  }

  ngOnInit(): void {
    this.friendsService.getFriends().subscribe({
      next: (res: any) => {
        this.inboxedUser = res.friends;
      }
    })
  }

}
