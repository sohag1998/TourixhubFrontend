import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../../models/post.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) { }

  getNonFriendsUser(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(environment.BASEURL + '/nonfriendusers')
  }

  getFriends(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(environment.BASEURL + '/getfriends')
  }

  getPendingFrinedRequests(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(environment.BASEURL + '/receivedrequests')
  }

  sendFriendRequest(formData: any) {
    return this.http.post(environment.BASEURL + '/sendfriendrequest', formData)
  }

  acceptFriendRequest(formData: any) {
    return this.http.post(environment.BASEURL + '/acceptrequest', formData)
  }

  declinedRequest(formData: any) {
    return this.http.delete(environment.BASEURL + '/declinedrequest', { body: formData })
  }

  removeFriend(formData: any) {
    return this.http.delete(environment.BASEURL + '/remove-friend', { body: formData })
  }
}
