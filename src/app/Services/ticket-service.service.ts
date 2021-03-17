import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../Models/Ticket';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {

  Api = '/Ticket/';
  API_URL: string = 'https://localhost:44355/api/Ticket/';
  http: any;
  constructor(public apiService:ApiService,
   ) { }

  getAll(): Observable<Ticket[]> {
    return this.apiService.get<Ticket>(this.Api + "GetAllTickets");
}
getById(): Observable<Ticket[]> {
  return this.apiService.get<Ticket>(this.Api+"GetTicketById/");
}
getByUserId(id:number): Observable<Ticket[]>
{
  return this.apiService.get<Ticket>(this.Api + "GetTicketsByUserId/"+id);
}
getTicket(ticketId){
  return this.http.get(`${this.API_URL + 'tickets'}/${ticketId}`) 
 }

  post(input : Ticket) :Observable<Ticket> {
    return this.apiService.post(this.Api+"AddTicket",input);
}
put(input : Ticket) :Observable<Ticket> {
  return this.apiService.put(this.Api+"UpdateTicket",input);
}
delete(id : number) :Observable<Boolean> {
  return this.apiService.delete(this.Api+"DeleteTicketById/"+id);
}
}
