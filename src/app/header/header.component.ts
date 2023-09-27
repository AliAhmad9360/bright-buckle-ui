import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName?: string;
  @Input() activeLink?: string;
  ngOnInit(): void {
    this.userName = 'Ali Ahmad'
  }
  Logout(){
    console.log('LOG OUT')
  }
}
