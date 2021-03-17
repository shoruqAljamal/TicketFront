import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditTicketComponent } from '../add-edit-ticket/add-edit-ticket.component';
import { Ticket } from '../Models/Ticket';
import { User } from '../Models/User';
import { TicketServiceService } from '../Services/ticket-service.service';
import { UserServiceService } from '../Services/user-service.service';

@Component({
  selector: 'app-show-client',
  templateUrl: './show-client.component.html',
  styleUrls: ['./show-client.component.css']
})
export class ShowClientComponent implements OnInit {
  id:string;
  tickets:Ticket[]=[];
  user : User;
  columnsName : any[] =[];
  columnsVariable : any[] =[] ;
  ticketInstance : any; 
  isLogged :boolean = true;

  constructor(private route: ActivatedRoute ,
    private userService: UserServiceService,
    private ticketService: TicketServiceService,
   private modalService: NgbModal) {

    }

    refreshTickets() {
      this.ticketService.getAll().subscribe(e => {
        this.tickets = e;
      })
    } 
    
addTicket()
{
  const modalRef = this.modalService.open(AddEditTicketComponent,{ size: 'lg' });
  modalRef.componentInstance.editMode = false;
  modalRef.result.finally(() => {this.refreshTickets();});

}
editTicket(ticket : Ticket){
  const modalRef = this.modalService.open(AddEditTicketComponent,{ size: 'lg' });
  modalRef.componentInstance.ticketInstance = ticket;
  modalRef.componentInstance.editMode = true;
  modalRef.result.finally(() => {this.refreshTickets();});
}

deleteTicket(ticket:Ticket){
  this.ticketService.delete(ticket.id).subscribe(e=>{
    this.modalService.dismissAll();
    this.refreshTickets();
  });
}

  ngOnInit(): void { 
    localStorage.setItem('isLoggedIn', this.isLogged.toString());
    this.id =this.route.snapshot.paramMap.get('id');
    //get user by id to show his info
    this.columnsName =[ "#" , "Name","Description", "Date","",""];
    this.columnsVariable =["name","description","travelDate"];
    console.log(this.id);
    this.userService.getById(parseInt(this.id)).subscribe( e=>{
    this.user =e;
    }
    )
    
    //get tickets to show it 
    this.ticketService.getByUserId(parseInt(this.id)).subscribe(e => {
      this.tickets = e;
      console.log(this.tickets.length);
    })


  }

}
