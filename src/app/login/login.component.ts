import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  submit = false;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      projectName: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  get formControls() { return this.loginForm.controls; }

  onSubmit() {
    this.submit = true;
    if ((this.submit && this.loginForm.untouched) || this.loginForm.invalid) {
      return;
    }
    console.log('Login form has been submitted');
  }

}
