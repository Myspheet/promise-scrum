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
  scrumProjectUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumprojects/';
  updateProjectUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumgoals/';
  updateRoleUrl = 'https://liveapi.chatscrum.com/scrum/api/scrumprojectroles/';
  token;
  encode;
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  allProjectGoals(projectId): Observable<any>{
    return this.http.get(this.scrumProjectUrl + projectId, this.httpOptions);
  }

  signup(user: Scrumuser): Observable<any> {
    return this.http.post(this.signupApiUrl, {
      email: user.email, password: user.password, full_name: user.fullname,
      usertype: user.userType, projname: user.projectName,
    }, this.httpOptions);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  updateUser(user): Observable<any> {
    this.token = this.getUser().token;
    this.encode = JSON.parse(localStorage.getItem('AuthUser'));
    this.encode = btoa(`${this.encode.email}:${this.encode.password}`);
    console.log(user.role);
    return this.http.patch(this.updateRoleUrl + user.id +'/',{role: user.role}, {headers: new HttpHeaders() 
      .set('Authorization', `Basic ${this.encode}==`)
      });
  }

  updateProject(project): Observable<any> {
     this.token = this.getUser().token;
     this.encode = JSON.parse(localStorage.getItem('AuthUser'));
    this.encode = btoa(`${this.encode.email}:${this.encode.password}`);
    return this.http.patch(this.updateProjectUrl + project.id +'/',{status: project.status}, {headers: new HttpHeaders() 
      .set('Authorization', `Basic ${this.encode}==`)
      });
  }

  createProject(project): Observable<any> {
    return this.http.post(this.signupApiUrl, {email: project.email, full_name: project.fullname, usertype:'Owner', projname: project.projectName}, this.httpOptions);
  }

  login(user): Observable<any> {
    return this.http.post(this.loginApiUrl, { username: user.email, password: user.password, project: user.projectName}, this.httpOptions);
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user'));
  }
}
