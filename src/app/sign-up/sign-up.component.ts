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
  constructor(private formBuilder: FormBuilder, private scrumDataService: ScrumdataService) {
    this.signupForm = this.formBuilder.group({
      email: ['',  [Validators.required, Validators.email]],
      fullname: ['', Validators.required],
      password: ['', [Validators.required,
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~`!@#$%\^&*()_+={}|\\[\\]\\\\;:"\'<,>.?/-]).{8,}$')]],
      userType: ['regular user', Validators.required],
    });

    this.userTypes = ['regular user', 'project owner'];
   }

  get formControls() { return this.signupForm.controls; }

  signupForm;
  userTypes = [];
  scrumUser = new Scrumuser('', '', '', '', '');
  submit = false;
  feedback = '';

  ngOnInit() {
  }

  setScrumUserData() {
    this.scrumUser.email = this.formControls.email.value;
    this.scrumUser.fullname = this.formControls.fullname.value;
    this.scrumUser.password = this.formControls.password.value;
    this.scrumUser.userType = this.formControls.userType.value;

  }

  onSubmit() {
    this.submit = true;
    if ((this.submit && this.signupForm.untouched) || this.signupForm.invalid) {
      return;
    }
    this.setScrumUserData();
    console.log(this.scrumUser);
    this.scrumDataService.signup(this.scrumUser).subscribe(
      data => {
        console.log('Success!', data);
        this.feedback = 'Account was created succesfully';
      },
      error => {
        console.error('Error!', error);
        this.feedback = 'Sign Up Failed';
      }
    );
  }

}
