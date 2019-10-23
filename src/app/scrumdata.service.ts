import { Scrumuser } from './model/scrumuser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrumdataService {

  constructor(private http: HttpClient) { }

  signupApiUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumusers/';
  loginApiUrl = 'https://liveapi.chatscrum.com/scrum/api-token-auth/';
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  signup(user: Scrumuser): Observable<any> {
    return this.http.post(this.signupApiUrl, {
      email: user.email, password: user.password, full_name: user.fullname,
      usertype: user.userType, projname: user.projectName,
    }, this.httpOptions);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  login(user): Observable<any> {
    return this.http.post(this.loginApiUrl, { username: user.email, password: user.password, project: user.projectName}, this.httpOptions);
  }
}
