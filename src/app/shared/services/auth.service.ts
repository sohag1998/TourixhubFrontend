import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

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
    return this.getToken() != null;
  }
  getToken() {
    return localStorage.getItem('token');
  }

  getProfile() {
    return this.http.get(environment.BASEURL + '/getprofile')
  }
}
