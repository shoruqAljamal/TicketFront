import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ticket } from '../Models/Ticket';
import { TicketServiceService } from '../Services/ticket-service.service';

@Component({
  selector: 'app-add-edit-ticket',
  templateUrl: './add-edit-ticket.component.html',
  styleUrls: ['./add-edit-ticket.component.css']
})
export class AddEditTicketComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    public activeModal: NgbActiveModal ,
    public ticketService : TicketServiceService,
    public datepipe: DatePipe,
    private modalService: NgbModal
  ) { }

  ticketInstance : any; 
  editMode: boolean = false;
  dateObj :Date = new Date();

  ticketForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    travelDate: ['', ],
    expDate: ['', ],
    startingLocation: ['', ],
    destinationLocation: ['', ],
    description: ['', ]

  });


  CreateForm() {
    this.ticketForm = this.fb.group({
      name: ['', Validators.required],
      travelDate: ['', ],
      expDate: ['', ],
      startingLocation: ['', ],
      destinationLocation: ['', ],
      description: ['', ]

    });
  }
  resetForm() {
    this.ticketForm.reset();
  }
  ngOnInit(): void {
    if(!this.editMode){
      this.CreateForm();
      this.resetForm();
    }else{
     // this.dateObj = new Date(this.employeeInstance.dateOfBirth);
      let latest_date =this.datepipe.transform(this.ticketInstance.expDate, 'yyyy-MM-dd');
      let latest_date2 =this.datepipe.transform(this.ticketInstance.travelDate, 'yyyy-MM-dd');
      this.ticketForm.patchValue ({
        id: this.ticketInstance.id,
        name:this.ticketInstance.name,
        travelDate: latest_date2,
        expDate : latest_date,
        startingLocation : this.ticketInstance.startingLocation,
        destinationLocation :this.ticketInstance.destinationLocation,
        description : this.ticketInstance.description,
        userId : 2
      })
      console.log(this.ticketInstance.expDate);
    }

  }

  
  onSubmit(form : any ) {
  if(this.editMode){
  const ticket: Ticket = <Ticket>{
   id:this.ticketInstance.id,
   name :form.name,
   travelDate:form.travelDate,
   expDate:form.expDate,
   startingLocation:form.startingLocation,
   destinationLocation:form.destinationLocation,
   description:form.description,
   userId:2
 
     }
      this.ticketService.put(ticket).subscribe(e => {  
         this.activeModal.close('Ok click');}
   );
    }else{
      const ticket: Ticket = <Ticket>{
        id:0,
        name :form.name,
        travelDate:form.travelDate,
        expDate:form.expDate,
        startingLocation:form.startingLocation,
        destinationLocation:form.destinationLocation,
        description:form.description,
        userId:2
      
          }
     this.ticketService.post(ticket).subscribe(e => 
       {   this.activeModal.close('Ok click'); }

       );
 
    }
 
 
   }

}
