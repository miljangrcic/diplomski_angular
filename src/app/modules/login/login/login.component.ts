import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    ) { }


  ngOnInit() {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  onFormSubmit() {
    let credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(data => {
      this.router.navigate(['admin']);
    })
  }

  // getters
  get username() { return this.loginForm.controls['username'] }
  get password() { return this.loginForm.controls['password'] } 

}
