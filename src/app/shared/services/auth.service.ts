import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SignalrService } from './signalr.service';
import { SignalrFriendService } from './signalr-friend.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
  ) { }

  createUser(formData: any) {
    return this.http.post(environment.BASEURL + '/signup', formData);
  }

  signin(formData: any) {
    return this.http.post(environment.BASEURL + '/signin', formData);
  }

  signOut() {
    localStorage.removeItem('token');
  }

  isSignedIn(): boolean {
    this.removeTokenAfterExpire(); // Ensure expired tokens are removed
    return this.getToken() !== null;
  }

  getToken() {
    this.removeTokenAfterExpire(); // Check expiration before returning token
    return localStorage.getItem('token');
  }

  getProfile() {
    return this.http.get(environment.BASEURL + '/getprofile');
  }

  getSignedInUser() {
    const token = this.getToken();
    if (!token) return null; // Prevent errors if token is null
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  removeTokenAfterExpire() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expireDate = payload.exp * 1000; // Convert to milliseconds
      const currentTimeinMilliseconds = Date.now(); // Get current time in milliseconds

      if (currentTimeinMilliseconds >= expireDate) {
        this.signOut();
        return false;
      }
      return true;
    } catch (error) {
      console.error('Invalid token format:', error);
      this.signOut(); // Remove malformed token
      return false;
    }
  }
}
