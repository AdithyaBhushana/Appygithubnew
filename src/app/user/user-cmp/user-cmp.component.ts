import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/Services/HttpService';

@Component({
  selector: 'app-user-cmp',
  templateUrl: './user-cmp.component.html',
  styleUrls: ['./user-cmp.component.css']
})
export class UserCmpComponent implements OnInit {

  constructor(private _httpService: HttpService) { }
user:any;
  headers;
  tableData: any;
  ngOnInit() {

    this.headers = [

      {
        name: "UserName",
        fieldName: 'login',
        headercss: 'text-left',
        dataType: '',
        icon: '',
        navigation: ''
      },

      {
        name: "Url",
        fieldName: 'url',
        headercss: 'text-left',
        dataType: '',
        icon: '',
        navigation: ''
      },
      {
        name: "Repos URL",
        fieldName: 'repos_url',
        headercss: 'text-left',
        dataType: '',
        icon: '',
        navigation: ''
      },
      {
        name: "Type",
        fieldName: 'type',
        headercss: 'text-left',
        dataType: '',
        icon: '',
        navigation: ''
      },
      {
        name: 'Node',
        fieldName: 'node_id',
        headercss: 'text-left',
        dataType: '',
        icon: '',
        navigation: ''
      },

    ];
 this.getUsers()
 }
getUsers(){
  const url = 'https://api.github.com/users';
  this._httpService.getData(url).subscribe(data => {
    this.tableData = data;
    console.log('this.user', this.tableData)
  })
}
}
