import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppUser } from '../../models/post.model';
import { FriendService } from '../../shared/services/friend.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { SignalrFriendService } from '../../shared/services/signalr-friend.service';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-community',
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent implements OnInit, OnDestroy {

  nonFriendsUsers: AppUser[] = []
  friends: AppUser[] = []
  pendingRequest: AppUser[] = []
  appUserId: string | null = null;
  constructor(
    private authService: AuthService,
    private friendService: FriendService,
    private friendHubService: SignalrFriendService) { }



  ngOnInit(): void {

    this.appUserId = this.authService.getSignedInUser().UserId;
    if (this.appUserId != null) {
      this.friendHubService.startConnection(this.appUserId)

      this.friendHubService.friendRequestUpdate$.subscribe(update => {
        if (update?.requestUser != null || update?.requestUser != undefined)
          this.pendingRequest.push(update.requestUser)
        const index = this.nonFriendsUsers.findIndex(u => u.id === update?.requestUser.id)
        if (index != -1) {
          this.nonFriendsUsers.splice(index, 1);
        }
      })

      this.friendHubService.declinedRequestUpdate$.subscribe(update => {
        if (update?.receiver != null) {
          this.nonFriendsUsers.push(update.receiver)
        }
      })

      this.friendHubService.acceptFriendUpdate$.subscribe(update => {
        if (update?.receiver != null) {
          this.friends.push(update.receiver);
        }
      })

      this.friendHubService.updateFriendRemove$.subscribe(update => {
        if (update?.userOneId != null) {
          const index = this.friends.findIndex(u => u.id === update.userOneId)
          if (index !== -1) {
            let users = this.friends.splice(index, 1)
            this.nonFriendsUsers.push(users[0])
          }
        }
      })
    }

    this.friendService.getNonFriendsUser().subscribe({
      next: (res: any) => {
        this.nonFriendsUsers = res.nonFriendUsers;
      },
      error: err => {
        console.log("error: ", err);

      }
    })

    this.friendService.getFriends().subscribe({
      next: (res: any) => {
        this.friends = res.friends
      },
      error: err => {
        console.log("error ", err);

      }
    })

    this.friendService.getPendingFrinedRequests().subscribe({
      next: (res: any) => {
        this.pendingRequest = res.receivedRequest
      },
      error: err => {
        console.log("error ", err);

      }
    })
  }

  ngOnDestroy(): void {
    this.friendHubService.stopConnection();
  }

  sendRequest(id: string) {

    if (id == null) {
      console.log('null');

    }
    const form = {
      'receiverId': ''
    }

    form.receiverId = id;

    this.friendService.sendFriendRequest(form).subscribe({
      next: (res: any) => {
        const index = this.nonFriendsUsers.findIndex(u => u.id === id)
        if (index !== -1) {
          this.nonFriendsUsers.splice(index, 1);
        }

      },
      error: err => {
        console.log(err);
        form.receiverId = ''

      }
    })
  }

  acceptRequest(id: string) {

    if (id == null) {
      console.log('Id is null');

    }
    const form = {
      'senderId': ''
    }

    form.senderId = id;

    this.friendService.acceptFriendRequest(form).subscribe({
      next: (res: any) => {
        if (res.success === true) {
          const index = this.pendingRequest.findIndex(u => u.id === id)
          if (index !== -1) {
            let users = this.pendingRequest.splice(index, 1)
            this.friends.push(users[0])
          }
          console.log('res', res);
        }


      },
      error: err => {
        console.log('error', err);

      }
    })

  }

  declinedRequest(id: string) {
    if (id == null) {
      console.log('Id is null');

    }
    const form = {
      'senderId': ''
    }

    form.senderId = id;

    this.friendService.declinedRequest(form).subscribe({
      next: (res: any) => {
        if (res.success === true) {
          const index = this.pendingRequest.findIndex(u => u.id === id)

          if (index !== -1) {
            let users = this.pendingRequest.splice(index, 1);
            this.nonFriendsUsers.push(users[0])

          }


        }

      },
      error: err => {
        console.log('error', err);

      }
    })

  }

  removeFriend(id: string) {
    if (id == null || id == undefined) console.log("Id can't be empty");

    const form = {
      'senderId': id
    }

    this.friendService.removeFriend(form).subscribe({
      next: (res: any) => {
        if (res.success === true) {
          const index = this.friends.findIndex(u => u.id === id)
          if (index !== -1) {
            let users = this.friends.splice(index, 1)
            this.nonFriendsUsers.push(users[0])
          }
        }
        console.log(res);

      },
      error: err => {
        console.log(err);

      }
    })

  }
}
