import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection!: signalR.HubConnection;
  private likeUpdates = new BehaviorSubject<{ postId: string; likeCount: number } | null>(null);
  likeUpdates$ = this.likeUpdates.asObservable();

  constructor(private authService: AuthService) {
    this.startConnection();
  }

  private startConnection() {

    const token = this.authService.getToken();
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7025/likeHub`, {
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


  }
}
