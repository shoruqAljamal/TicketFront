import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { LoginModel } from '../Models/LoginModel';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  Api = '/User/';
  constructor(public apiService:ApiService,
   ) { }

  getAll(): Observable<User[]> {
    return this.apiService.get<User>(this.Api + "GetAllUsers");
}
getById(): Observable<User[]> {
  return this.apiService.get<User>(this.Api+"GetUserById/");
}
  post(input : User) :Observable<User> {
    return this.apiService.post(this.Api+"AddUser",input);
}
login(input : LoginModel) :Observable<User> {
  return this.apiService.post(this.Api+"Login",input);
}

put(input : User) :Observable<User> {
  return this.apiService.put(this.Api+"UpdateUser",input);
}
delete(id : number) :Observable<Boolean> {
  return this.apiService.delete(this.Api+"DeleteUserById/"+id);
}
}
