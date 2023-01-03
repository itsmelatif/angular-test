import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { IUsers } from '../../interface/users-interface';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { IHeader } from '../../interface/header-table-intrface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() statusSave = false;

  header: IHeader[] = [
    { label: 'Name', object: 'firstName', sort: true, activeSort: true, descSort: false, search: true },
    { label: 'Age', sort: true, activeSort: false, descSort: false, search: true },
    { label: 'DOB', sort: true, activeSort: false, descSort: false,  search: true },
    { label: 'Gender', object: 'gender', sort: true, activeSort: false, descSort: false,  search: true },
    { label: 'Language Known', sort: true, activeSort: false, descSort: false, search: true },
    { label: 'Qualification', object: 'qualifications', sort: true, activeSort: false, descSort: false, search: true },
    { label: 'Specialization', object: 'specialization', sort: true, activeSort: false, descSort: false, search: true },
    { label: 'Contact', object: 'contact', sort: true, activeSort: false, descSort: false, search: true },
    { label: 'Profile Image', sort: false, search: false },
    { label: 'Operations', sort: false, search: false },
  ];

  listUsers: IUsers[] = [];
  subscription: Subscription[] = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.header = this.header;
    this.loadUsers(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
      const statusSaveChange = changes['statusSave'];

      if(statusSaveChange.currentValue){
        this.loadUsers(false)
      }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => el.unsubscribe());
  }

  loadUsers(sort: boolean, index?: number){
    const subsGet = this.usersService.getUsers$(sort, index).subscribe(response => {
      this.listUsers = response;
      this.statusSave = false;
    });

    this.subscription.push(subsGet);
  }

  onSort(i: number){
    this.loadUsers(true, i);
  }

  onSearchData(event: Event){
    const value = (event.target as HTMLInputElement).value;
    const subsSearch = this.usersService.searchUsers$(value).subscribe(response => {
      this.listUsers = response;
    });

    this.subscription.push(subsSearch);
  }


  editUser(index: number){
    this.usersService.activeUser = index;
  }

  removeUser(index: number){
    const confirmRemove = confirm('Are you sure to remove this user ?');

    if(confirmRemove){
      const subsRemove = this.usersService.removeUser$(index).subscribe(response => {
        this.loadUsers(false);
      });

      this.subscription.push(subsRemove);
    }
  }

  calculateAge(date: string){
    return this.usersService.calculateAge(date);
  }
}
