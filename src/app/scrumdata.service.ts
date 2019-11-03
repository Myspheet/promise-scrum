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
    return this.http.patch(this.signupApiUrl + user.id +'/',{role: user.role}, {headers: new HttpHeaders() 
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
    return this.http.post(this.scrumProjectUrl, {email: project.email, name: project.fullname, projName: project.projectName,
    scrumprojectrole_set: [{role: 'Owner', user:'', scrumgoal_set:'', scrumnote_set:'', scrumworkid_set:'', scrumlog_set:''}], 
    scrumslack_set: [{access_token:'fkdoelaksdlf;kekpaiosd', bot_access_token:'aalskdofeisakdpf'}]}, this.httpOptions);
  }

  login(user): Observable<any> {
    return this.http.post(this.loginApiUrl, { username: user.email, password: user.password, project: user.projectName}, this.httpOptions);
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user'));
  }
}
