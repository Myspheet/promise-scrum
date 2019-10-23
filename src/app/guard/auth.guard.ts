import { ScrumdataService } from './../scrumdata.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private scrumDataService: ScrumdataService, private router: Router) {}
  canActivate(): boolean {
    if (this.scrumDataService.loggedIn()) {
      console.log(this.scrumDataService.loggedIn());
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
