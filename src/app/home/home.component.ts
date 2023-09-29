import { Component, ViewChild, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, RowDoubleClickedEvent, GetContextMenuItemsParams, MenuItemDef  } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { API_URL } from 'config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: ActivatedRoute){}
  public columnDefs: ColDef[] = [
    { field: 'username', filter: 'agTextColumnFilter', floatingFilter: true, sortable: true},
    { field: 'firstName', filter: 'agTextColumnFilter', floatingFilter: true, sortable: true},
    { field: 'middleName', filter: 'agTextColumnFilter', floatingFilter: true, sortable: true},
    { field: 'lastName', filter: 'agTextColumnFilter', floatingFilter: true, sortable: true},
    { field: 'dateOfBirth', filter: 'agDateColumnFilter', floatingFilter: true, sortable: true, valueFormatter: ({value}) => value.split('T')[0].replaceAll('-', '/')},
    { field: 'email', filter: 'agTextColumnFilter', floatingFilter: true, sortable: true},
    { field: 'age', filter: 'agNumberColumnFilter', floatingFilter: true, sortable: true},
    { field: 'phoneNumber', filter: 'agTextColumnFilter', floatingFilter: true, sortable: true},
    { field: 'zipCode', filter: 'agTextColumnFilter', floatingFilter: true, sortable: true},
  ];
  userId = '';
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  public rowData$!: any[];
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  getContextMenuItems(params: GetContextMenuItemsParams) : (string | MenuItemDef)[]{
    return [
      {
        name: 'Add new User',
        action: () => {
          window.location.href = '/user/add'
        }
      },
      {
        name: `Edit ${params.node?.data.username ?? ''}`,
        action: () => {
          window.location.href = `/user/edit/${params.node?.data.username}`
        },
        disabled: !params.node?.data?.username
      },
      {
        name: `Remove ${params.node?.data?.username ?? ''}`,
        action: () => {
          Swal.fire({
            title: 'Are you sure?', 
            text: `Are you sure you want to delete ${params.node?.data?.username}?` ,
            cancelButtonColor: 'green',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonColor: 'red',
            confirmButtonText: 'Yes',
            focusCancel: true,
            icon: 'question'
          })
          .then(resp => {
            if(!resp.isConfirmed) return;
            fetch(`${API_URL}/Customer/deleteCustomer?username=${params.node?.data?.username}`, {
              method: 'DELETE', 
              headers: { 'Content-Type': 'application/json' }
            })
            .then(resp => {
              if(resp.status === 200)
                Swal.fire({ title: 'Success', text: `${params.node?.data?.username} has been deleted successfully`, icon: 'success' })
              .then(() => window.location.reload())
              else
                Swal.fire({ title: 'Error', text: 'An error occured while trying to delete this user.', icon:'error' })
            }).catch(() => Swal.fire({ title: 'Error', text: 'An error occured while trying to delete this user.', icon:'error' }))
          })
        },
        disabled: !params.node?.data?.username,

      },
      ...( params.defaultItems ?? [])
    ]
  }
  onGridReady(params: GridReadyEvent) {
   fetch(`${API_URL}/Customer/getAllCustomers`)
   .then(resp => resp.json())
   .then(resp => this.rowData$ = resp);
  }
  rowDoubleClicked(params : RowDoubleClickedEvent){
    const { username } = params.data;
    window.location.href = `/user/edit/${username}`
  }
  ngOnInit(): void {
  }
}
