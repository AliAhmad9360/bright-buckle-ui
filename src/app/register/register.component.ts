import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_URL } from 'config';
import Swal from 'sweetalert2';
import CustomerValidator from './CustomerValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private router : ActivatedRoute){}
  userId = '';
  errors : string[] = [];
  user = {
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    zipCode: '',
    username: '',
    password: ''
  }
  register(){
  }
  saveUser(){
    const validator = new CustomerValidator();
    const result = validator.validate(this.user);
    this.errors = Object.values(result).map(err => String(err));
    if(this.errors.length > 0) return;
    if(this.userId){
      fetch(`${API_URL}/Customer/updateCustomer`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.user)
      })
      .then(resp => {
        if(resp.status === 403 || resp.status === 400)
        Swal.fire({title: 'Error', text: 'Backend validation failed.', icon: 'error'})
      else if(resp.status === 200)
        Swal.fire({ title: 'Success', text: 'Customer has been saved successfully.' }).then(() => window.location.href = '/users')
      else
        Swal.fire({title: 'Error', text: 'Server error occured.', icon: 'error'})
      })
      .catch(err => Swal.fire({ title: 'Error', text: 'An error occured while saving user.', icon: 'error' }))
    }
    else{
      fetch(`${API_URL}/Customer/createNewCustomer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.user)
      })
      .then(resp => {
        if(resp.status === 403 || resp.status === 400)
        Swal.fire({title: 'Error', text: 'Backend validation failed.', icon: 'error'})
        else if(resp.status === 200)
        Swal.fire({ title: 'Success', text: 'Customer has been saved successfully.' }).then(() => window.location.href = '/users')
        else
        Swal.fire({title: 'Error', text: 'Server error occured.', icon: 'error'})
      })
      .catch(err => Swal.fire({ title: 'Error', text: 'An error occured while creating user.', icon: 'error' }))
    }
  }
  ngOnInit(): void {
    this.router.params.subscribe(params => this.userId = params['userName']);
    if(this.userId){
      fetch(`${API_URL}/Customer/getCustomerByUsername?username=${this.userId}`)
      .then(resp => resp.json())
      .then(resp => {
        this.user = {...resp, dateOfBirth: resp.dateOfBirth.split('T')[0]}
      })
    }
  }
}
