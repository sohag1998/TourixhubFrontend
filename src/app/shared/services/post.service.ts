import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.BASEURL + "/posts")
  }

  togglePostLike(formData: any) {
    return this.http.post(environment.BASEURL + "/togglelike", formData)
  }
  addComment(formData: any) {
    return this.http.post(environment.BASEURL + "/addcomment", formData)
  }

  getAllCommentByPostId(postId: string): Observable<Comment[]> {
    const params = new HttpParams()
      .set('postId', postId)

    return this.http.get<Comment[]>(environment.BASEURL + '/commentsbypostId', { params })
  }
}
