import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  name:string = '';
  number: string = '';
  password: string = '';

  constructor(private authServ: AuthService, private router: Router,private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      number:['',Validators.required],
      password:['',Validators.required]
    })
  }

  onLogin(): void {
    console.log('before login');

    if(this.loginForm.valid){
      const number = this.loginForm.value.number;
      const password = this.loginForm.value.password;
      console.log('before calling service');
      //calling auth
      this.authServ.login(number, password).subscribe(
        (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/home'],{queryParams:{number,password}});
        },
        (error) => {
          //handle login error
          console.log('login Failed', error);
        }
      );
    } else {
      //handle error
    }
   
  }
}
