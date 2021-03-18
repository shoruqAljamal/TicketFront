import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { User } from '../Models/User';
import { UserServiceService } from '../Services/user-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TicketServiceService } from '../Services/ticket-service.service';
import { IComboSelectionChangeEventArgs, IgxComboComponent } from "igniteui-angular";

@Component({
  selector: 'app-show-admin',
  templateUrl: './show-admin.component.html',
  styleUrls: ['./show-admin.component.css']
})
export class ShowAdminComponent implements OnInit {
  // public GROUP_KEY = "region";
  // public lData: any[];
  // @ViewChild("combo", { read: IgxComboComponent, static: true }) public combo: IgxComboComponent;

  // public filterable = true;
  // public showSearchCaseIcon = false;
  // public customValues = true;
  // public disabled = false;
  
  id: string;
  user: User;
  users: User[] = [];
  searchedUser: any[] = [];
  selectedUser : any;
  selectedUserval :any; 
  selectedUserId: any;
  showTable: boolean =false;
  columnsName : any[];
  columnsVariable : any[];
  tickets : any[];
  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private ticketService: TicketServiceService,
    private modalService: NgbModal,
    public fb: FormBuilder,
  ) {

    this.userService.getAll().subscribe(e => {
      this.users = e;
      console.log(this.users);
    }
    );
  }

  adminForm: FormGroup
  form: FormGroup = this.fb.group({
    searchedUser: ['']
  });
  userName = '';
  onKey(event: any) { // without type info
    this.searchedUser=[];
    this.userName = '';
    this.userName += event.target.value;
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].userName.startsWith(this.userName)) {
        this.searchedUser.push(this.users[i]);
        console.log(this.searchedUser);
      }
    }

  }


  selectChangeHandler(event: any) {
    //update the ui
    this.selectedUserId = event.target.value;
    this.ticketService.getByUserId(this.selectedUserId).subscribe(e=>{
    this.tickets=e;
    //console.log(this.selectedUser);
    this.showTable=true;
    }
    );

  }
  public handleAddition(event) { }

  // public enableGroups(event) {
  //     this.combo.groupKey = event.checked ? this.GROUP_KEY : "";
  // }
  ngOnInit(): void {
    // this.lData=this.users;
    this.id = this.route.snapshot.paramMap.get('id');
    //get user by id to show his info
    console.log(this.id);
    this.userService.getById(parseInt(this.id)).subscribe(e => {
      this.user = e;
    }
    );

    this.columnsName =[ "#" , "Name","Gender", "Date Of Birth","",""];
    this.columnsVariable =["name","description","travelDate"];
 
  }
  addAdmin() {
    const modalRef = this.modalService.open(AddAdminComponent, { size: 'lg' });

  }
  showMyTable(user){
    //console.log(user);

    this.ticketService.getByUserId(user.id).subscribe(e=>{
    this.tickets=e;
    //console.log(this.selectedUser);
    this.showTable=true;
    }
    );
  }

}
