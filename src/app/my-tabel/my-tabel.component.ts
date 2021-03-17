import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ticket } from '../Models/Ticket';
@Component({
  selector: 'app-my-tabel',
  templateUrl: './my-tabel.component.html',
  styleUrls: ['./my-tabel.component.css']
})
export class MyTabelComponent implements OnInit {

  constructor() { }
  @Input() columnsName : any[];
  @Input() columnsVariable : any[];
  @Input() data : any[];
  @Output("edit") edit = new EventEmitter();
  @Output("delete") delete = new EventEmitter<Ticket>();
  mydata : any[] =[] ;
  ngOnInit(): void {
   
  }
 editElement(ticket:Ticket){
     this.edit.emit(ticket);
 }
 deleteElement(ticket){
  this.delete.emit(ticket);
}
}
