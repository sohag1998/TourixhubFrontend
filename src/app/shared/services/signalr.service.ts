import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Comment } from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection!: signalR.HubConnection;
  private likeUpdates = new BehaviorSubject<{ postId: string; likeCount: number } | null>(null);
  likeUpdates$ = this.likeUpdates.asObservable();

  private commentsUpdates = new BehaviorSubject<{ postId: string; comments: Comment[] } | null>(null);
  commentsUpdates$ = this.commentsUpdates.asObservable();

  constructor(private authService: AuthService) {
    this.startConnection();
  }

  private startConnection() {

    const token = this.authService.getToken();
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7025/hub/postHub`, {
        accessTokenFactory: () => token!
      }) // Ensure your backend URL is correct
      .withAutomaticReconnect()
      .build();


    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.error('SignalR Connection Error:', err));

    this.hubConnection.on('ReceiveLikeUpdate', (postId: string, likeCount: number) => {
      this.likeUpdates.next({ postId, likeCount });
      // Emit updated like count
    });

    this.hubConnection.on('ReceivedCommentUpdate', (postId: string, comments: Comment[]) => {
      this.commentsUpdates.next({ postId, comments })
    })




  }
}
