import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  info: any;
  date: Date = new Date();
  strDate: string = "";
  username: string = "";

  constructor(private token: TokenStorageService) {
    this.username = token.getUsername();
    setInterval(() => {
      this.date = new Date();
      this.strDate = this.formateDate(this.date.getHours()) + ":" + this.formateDate(this.date.getMinutes()) + ":" + this.formateDate(this.date.getSeconds());
    }, 1);
  }

  formateDate(test: number): string {
    let formate = "";
    if(test < 10) {
      formate = "0";
    }
    formate += test;
    return formate;
  }

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername()
    };
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }
}
