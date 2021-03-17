import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../Models/User';
import { TicketServiceService } from '../Services/ticket-service.service';
import { UserServiceService } from '../Services/user-service.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    public activeModal: NgbActiveModal ,
    public userService : UserServiceService,
    private modalService: NgbModal
  ) { }


  adminForm: FormGroup = this.fb.group({
    adminName: ['', Validators.required],
password:['',Validators.required],
emailAddress:['',[Validators.required,Validators.email]],
    dateOfBirth: ['', ],
    gender: ['', ]
  });

  CreateForm() {
    this.adminForm = this.fb.group({
      adminName: ['', Validators.required],
      password:['',Validators.required],
      emailAddress:['',[Validators.required,Validators.email]],
          dateOfBirth: ['', ],
          gender: ['', ]
   
    });
  }
  ngOnInit(): void {
    this.CreateForm();
  }

  onSubmit(form : any ) {
  
      const user: User = <User>{
        id:0,
        userName:form.userName,
        emailAddress:form.emailAddress,
        password:form.password,
        dateOfBirth:form.dateOfBirth,
        gender:form.gender,
        userTypeId:1
          }
     this.userService.post(user).subscribe(e => 
       {   this.activeModal.close('Ok click'); }

       );
 
    }
 
 
   

}
