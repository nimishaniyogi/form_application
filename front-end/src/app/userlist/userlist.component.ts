import { Component, OnInit } from '@angular/core';
import { UserlistService } from '../service/userlist.service'

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html'
})
export class UserListComponent implements OnInit {
    userListData: any = [];
    res = [];

    constructor(private userlistservice:UserlistService) {}

    ngOnInit(): void {
        this.getUserDetilList();
    }

    getUserDetilList(){
        this.userlistservice.getUserList().subscribe( usersl => {
            console.log(usersl);
            this.res = usersl;
            if(usersl){
                this.userListData = this.res;
            }
        })

    }
  }
