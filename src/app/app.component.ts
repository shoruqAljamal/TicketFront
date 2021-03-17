import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './Services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-app';
  isLoggedIn:boolean;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService :LoginService,
  ) {
    loginService.isLoggen.subscribe(e=>{
      this.isLoggedIn = e;
      console.log(e);
    });
  
   }

  logout(): void {
    this.isLoggedIn = !this.isLoggedIn;
    this.loginService.isLoggen.next(this.isLoggedIn);
    this.router.navigate(['../login']);
    
  }
}
