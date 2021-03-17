import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginModel } from '../Models/LoginModel';
import { User } from '../Models/User';
import { LoginService } from '../Services/login.service';
import { UserServiceService } from '../Services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  loginUser: User;
  isLogged: boolean=false;
  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: UserServiceService,
    private loginService :LoginService,
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email,Validators.required]],
      password: ['', Validators.required]
  });
 
  }
   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }
   onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
    //check user & pssword
    const user: LoginModel = <LoginModel>{
        emailAddress : this.f.email.value ,
        password : this.f.password.value
    }

    this.service.login(user).subscribe(e => 
      { 
        if(e===null){
          this.loading =false;
        }
        else
        {
          this.loginUser = e ;
          this.loading =false;
          this.isLogged =true;
          this.loginService.isLoggen.next(true);
          if(this.loginUser.userTypeId == 1)
          {
            this.router.navigate(['../admin',  this.loginUser.id ]);
          }
          else
          { this.router.navigate(['../client',  this.loginUser.id ]);}
         
          //console.log(this.loginUser);
        }

        //console.log(this.loginUser.id + this.loginUser.userName);
      }

      );
    
       
     

}


}
