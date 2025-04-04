import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { AppUser } from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class SignalrFriendService {

  private hubConnection!: signalR.HubConnection

  private friendRequestUpdate = new BehaviorSubject<{ receiverId: string; requestUser: AppUser } | null>(null)
  friendRequestUpdate$ = this.friendRequestUpdate.asObservable();

  private declinedRequestUpdate = new BehaviorSubject<{ receiverId: string; receiver: AppUser } | null>(null)
  declinedRequestUpdate$ = this.declinedRequestUpdate.asObservable();

  private acceptFriendUpdate = new BehaviorSubject<{ receiver: AppUser } | null>(null)
  acceptFriendUpdate$ = this.acceptFriendUpdate.asObservable();

  private updateFriendRemove = new BehaviorSubject<{ userOneId: string } | null>(null)
  updateFriendRemove$ = this.updateFriendRemove.asObservable();

  constructor(private authService: AuthService) {

  }

  startConnection(userId: string) {
    const authToken = this.authService.getToken();

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7025/hub/friendsHub?userId=${userId}`, {
        accessTokenFactory: () => authToken!
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log("Friend hub connection start"))
      .catch(err => console.log('Friend hub connection faild: ', err))

    this.hubConnection.on('ReceivedFriendRequest', (receiverId: string, requestUser: AppUser) => {
      this.friendRequestUpdate.next({ receiverId, requestUser })
    })

    this.hubConnection.on('ReceivedDeclinedRequest', (receiverId: string, receiver: AppUser) => {
      this.declinedRequestUpdate.next({ receiverId, receiver })
    })

    this.hubConnection.on('ReceivedAcceptFriendRequest', (receiver: AppUser) => {
      this.acceptFriendUpdate.next({ receiver });
    })

    this.hubConnection.on('UpdateFriendAfterRemove', (userOneId: string) => {
      this.updateFriendRemove.next({ userOneId })
    })
  }

  stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}
