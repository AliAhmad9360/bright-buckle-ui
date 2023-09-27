import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isUserEditing: boolean = false;
  constructor(private router : ActivatedRoute){}
  register(){
    console.log('REGISTERING: ', this.isUserEditing)
  }
  saveUser(){
    console.log('SAVE USER')
  }
  ngOnInit(): void {
    this.router.params.subscribe( observer => {
      this.isUserEditing = !!observer['userName'];
    })
  }
}
