import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ticket } from '../Models/Ticket';
import { User } from '../Models/User';
import { TicketServiceService } from '../Services/ticket-service.service';

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css']
})
export class ComboBoxComponent implements OnInit {

  @Input() list: any[];
  @Input() filterType : string;
  @Output('selectedItemEvnet') selectedItemEvnet = new EventEmitter();
  listn: string[] =[];

  // two way binding for input text
  inputItem= '';
  // enable or disable visiblility of dropdown
  listHidden = true;
  showError = false;
  selectedIndex = -1;

  // the list to be shown after filtering
  filteredList: any[] = [];
  selectedUserId: number;
 

  constructor() { }

   ngOnInit() {

    this.filteredList = this.list;

    
  }

  // modifies the filtered list as per input
  getFilteredList() {

    this.listHidden = false;
    // this.selectedIndex = 0;
    if (!this.listHidden && this.inputItem !== undefined) {
      this.filteredList = this.list.filter((item) => item[this.filterType].toLowerCase().startsWith(this.inputItem.toLowerCase()));
    }
  }

  // // select highlighted item when enter is pressed or any item that is clicked
  selectItem(index) {
    this.selectedItemEvnet.emit( this.filteredList[index]);
    this.inputItem= this.filteredList[index][this.filterType];
    this.listHidden = true;
    this.selectedIndex = index;
    
  }

  // navigate through the list of items
  onKeyPress(event) {

    if (!this.listHidden) {
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.toggleListDisplay(0);
      }

      if (event.key === 'Enter') {

        this.toggleListDisplay(0);
      }
      if (event.key === 'ArrowDown') {

        this.listHidden = false;
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
          document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      } else if (event.key === 'ArrowUp') {

        this.listHidden = false;
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredList.length;
        }
        this.selectedIndex = (this.selectedIndex - 1) % this.filteredList.length;

        if (this.filteredList.length > 0 && !this.listHidden) {

          document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      }
    } 
  }

  // selectChangeHandler(event: any) {
  //   //update the ui
  //   this.selectedUserId = event.target.value;
  //   this.ticketService.getByUserId(this.selectedUserId).subscribe(e=>{
  //   this.tickets=e;
  //   //console.log(this.selectedUser);
  //   this.showTable=true;
  //   }
  //   );

  // }


  // show or hide the dropdown list when input is focused or moves out of focus
  toggleListDisplay(sender: number) {

    if (sender === 1) {
      // this.selectedIndex = -1;
      this.listHidden = false;
      this.getFilteredList();
    } else {
      // helps to select item by clicking
      setTimeout(() => {
       // this.selectItem(this.selectedIndex);
        this.listHidden = true;
        if (!this.listn.includes(this.inputItem)) {
          this.showError = true;
          this.filteredList = this.list;
        } else {
          this.showError = false;
        }
      }, 500);
    }
  }

}
