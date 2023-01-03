import { Injectable } from '@angular/core';
import { IUsers } from '../interface/users-interface';
import { Observable, Subject, of } from 'rxjs';
import { IHeader } from '../interface/header-table-intrface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private listHeader : IHeader[] = [];
  private activeUsers : IUsers[] = [];
  private activeIndexUser: number = -1;
  selectedUser$: Subject<IUsers> = new Subject<IUsers>();

  constructor() { }

  set header(item: IHeader[]){
    this.listHeader = item;
  }

  addUser$(item: IUsers): Observable<boolean>{
    this.addUser(item);
    return of(true);
  }

  removeUser$(indexUser: number): Observable<boolean>{
    this.removeUser(indexUser);
    return of(true);
  }



  updateUser$(item: IUsers): Observable<boolean>{
    this.removeUser(this.activeIndexUser);
    this.addUser(item);
    return of(true);
  }

  getUsers$(sort: boolean, index?: number): Observable<IUsers[]>{
    index = sort === true ? index : 0;
    this.activeUsers = this.sortData(index!, this.listUsers);
    return of(this.activeUsers);
  }

  searchUsers$(value: string): Observable<IUsers[]>{
    const newValue = value.toLowerCase();

    if(newValue.length === 0){
      return of(this.sortData(0, this.listUsers));
    }

    const filterUser = this.listUsers.filter(el => {
      return this.checkingValue(el.firstName, newValue) ||
      this.checkingValue(el.lastName, newValue) ||
      this.checkingValue(el.dateOfBirth, newValue) ||
      this.checkingValue(el.gender, newValue) ||
      this.checkingValue(el.qualification, newValue) ||
      this.checkingValue(el.specialization, newValue) ||
      this.checkingValue(el.contact, newValue) ||
      this.checkingValueArr(el.language, newValue) ||
      this.checkingAge(el.dateOfBirth, newValue);
    });

    return of(filterUser);
  }

  checkingValue(value: string, checkValue: string){
    return value.trim().toLowerCase().includes(checkValue);
  }

  checkingValueArr(value: string[],  checking: string){
    return value.some(el => this.checkingValue(el, checking));
  }

  checkingAge(date: string, checking: string){
    return this.calculateAge(date).toString().includes(checking);
  }


  set activeUser(i: number){
    this.activeIndexUser = i;
    this.selectedUser$.next( this.activeUsers[i])
  }

  resetActiveUser(){
    this.activeIndexUser = -1;
  }

  private addUser(item: IUsers){
    const getUsers: IUsers[] = this.listUsers;

    getUsers.push(item);
    localStorage.setItem('list-users', JSON.stringify(getUsers));
  }

  private removeUser(indexUser: number){
    const filterUser = this.listUsers.filter((el, i) => {
      return i !== indexUser;
    });

    localStorage.setItem('list-users', JSON.stringify(filterUser));
  }

  private get listUsers(): IUsers[] | []{
    return localStorage.getItem('list-users') === null ? [] : JSON.parse(localStorage.getItem('list-users')!);
  }

  private sortData(i: number, dataSource: IUsers[]){
    const value =  this.listHeader[i];

    this.listHeader.map(el => {
      if(el.activeSort){
        el.activeSort = false;
      }

      return el;
    });

    value.activeSort = !value.activeSort;
    value.descSort = !value.descSort;

    let sortingValue;

    if(value.descSort){
      sortingValue = dataSource.sort((a, b) => (a[value.object as keyof IUsers]! > b[value.object as keyof IUsers]!) ? 1 : (a[value.object as keyof IUsers]! < b[value.object as keyof IUsers]!) ? -1 : 0);
    }else{
      sortingValue = dataSource.sort((a, b) => (a[value.object as keyof IUsers]! < b[value.object as keyof IUsers]!) ? 1 : (a[value.object as keyof IUsers]! > b[value.object as keyof IUsers]!) ? -1 : 0);
    }

    return sortingValue;
  }

  calculateAge(date: string){
    const DOB = date;
    const millisecondsBetweenDOBAnd1970 = Date.parse(DOB);
    const millisecondsBetweenNowAnd1970 = Date.now();
    const ageInMilliseconds = millisecondsBetweenNowAnd1970-millisecondsBetweenDOBAnd1970;

    const milliseconds = ageInMilliseconds;
    const second = 1000;
    const minute = second*60;
    const hour = minute*60;
    const day = hour*24;

    const year = day*365;

    const years = Math.round(milliseconds/year);
    return years;
  }

}
