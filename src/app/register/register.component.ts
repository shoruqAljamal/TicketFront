import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../Models/User';
import { UserServiceService } from '../Services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading = false;
  submitted = false;
  isLoggedIn :boolean =false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
   private userService: UserServiceService,
   public activeModal: NgbActiveModal ,
  ) { }
  userForm = this.formBuilder.group({
    userName: ['', Validators.required],
    password:['',Validators.required],
    emailAddress:['',[Validators.required,Validators.email]],
    dateOfBirth: ['', ],
   gender: ['', Validators.required]

});
  
  CreateForm() {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password:['',Validators.required],
      emailAddress:['',[Validators.required,Validators.email]],
      dateOfBirth: ['', ],
     gender: ['',Validators.required ]

    });
  }
  ngOnInit(): void {
    this.CreateForm();

  }
      // convenience getter for easy access to form fields

    onSubmit(form : any ) {
      this.submitted = true;
      const user: User = <User>{
        id:0,
        userName:form.userName,
        emailAddress:form.emailAddress,
        password:form.password,
        dateOfBirth:form.dateOfBirth,
        gender:form.gender,
        userTypeId:2
          }
     this.userService.post(user).subscribe(e => 
       {//this.activeModal.close('Ok click');
       this.loading = true;
       this.isLoggedIn =false;
      // localStorage.setItem('isLoggedIn', this.isLoggedIn.toString());
       this.router.navigate(['../login'], { relativeTo: this.route });
       }

       );
  
      

    }

}
