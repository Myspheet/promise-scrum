import { Scrumuser } from './../model/scrumuser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ScrumdataService } from '../scrumdata.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private scrumSataService: ScrumdataService) {
    this.signupForm = this.formBuilder.group({
      email: ['',  [Validators.required, Validators.email]],
      fullname: ['', Validators.required],
      projectName: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~`!@#$%\^&*()_+={}|\\[\\]\\\\;:"\'<,>.?/-]).{8,15}$')]],
      userType: ['regular user', Validators.required],
    });

    this.userTypes = ['regular user', 'project owner'];
   }

  get formControls() { return this.signupForm.controls; }

  signupForm;
  userTypes = [];
  scrumUser = new Scrumuser('', '', '', '', '');
  submit = false;

  ngOnInit() {
  }

  setScrumUserData() {
    this.scrumUser = Object.assign({}, this.signupForm.value);
  }

  onSubmit() {
    this.submit = true;
    if ((this.submit && this.signupForm.untouched) || this.signupForm.invalid) {
      return;
    }
    this.setScrumUserData();
    console.log(this.scrumUser);
    this.scrumSataService.signup(this.scrumUser).subscribe(
      data => console.log('Success!', data),
      error => console.error('Error!', error)
    );
  }

}
