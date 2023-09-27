import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, RowDoubleClickedEvent } from 'ag-grid-community';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private router: Router){}
  public columnDefs: ColDef[] = [
    { field: 'userName', filter: 'agTextColumnFilter', floatingFilter: true, sortable: true},
    { field: 'firstName', filter: 'agTextColumnFilter', floatingFilter: true, sortable: true},
    { field: 'middleName', filter: 'agTextColumnFilter', floatingFilter: true, sortable: true},
    { field: 'lastName', filter: 'agTextColumnFilter', floatingFilter: true, sortable: true},
    { field: 'dateOfBirth', filter: 'agDateColumnFilter', floatingFilter: true, sortable: true},
    { field: 'email', filter: 'agTextColumnFilter', floatingFilter: true, sortable: true},
    { field: 'age', filter: 'agNumberColumnFilter', floatingFilter: true, sortable: true},
    { field: 'phoneNumber', filter: 'agTextColumnFilter', floatingFilter: true, sortable: true},
    { field: 'zipCode', filter: 'agTextColumnFilter', floatingFilter: true, sortable: true},
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  public rowData$!: any[];
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = [{
      firstName: "John",
      middleName: "Robert",
      lastName: "Doe",
      dateOfBirth: "1990-05-15",
      email: "john.doe@example.com",
      age: 33,
      phoneNumber: "123-456-7890",
      zipCode: "12345",
      userName: "johndoe123"
    },
    {
      firstName: "Alice",
      middleName: "Grace",
      lastName: "Smith",
      dateOfBirth: "1985-08-20",
      email: "alice.smith@example.com",
      age: 38,
      phoneNumber: "987-654-3210",
      zipCode: "54321",
      userName: "alicesmith456"
    },
    {
      firstName: "Michael",
      middleName: "James",
      lastName: "Johnson",
      dateOfBirth: "1995-02-10",
      email: "michael.johnson@example.com",
      age: 28,
      phoneNumber: "555-123-4567",
      zipCode: "67890",
      userName: "michaelj"
    }]
  }
  rowDoubleClicked(params : RowDoubleClickedEvent){
    const { userName } = params.data;
    this.router.navigate([`/user/edit/${userName}`]);
  }
}
