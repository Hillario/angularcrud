import { Component,OnInit,AfterViewInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular_crud';
  displayedColumns: string[] = ['productName', 'category', 'date', 'quality', 'price', 'comment','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private api:ApiService
    ) {}

    //lifecycle hook
    ngOnInit(): void {
        this.getAllProducts()
    }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,
      {
        width: '30%'
      }).afterClosed().subscribe(val=>{
        if(val==='save')
        {
          this.getAllProducts() //refresh product data automatically to display updated data
        }
      })
  }

  getAllProducts()
  {
    this.api.getProduct()
    .subscribe({
      next:res=>
      {
        this.dataSource=new MatTableDataSource(res)
        this.dataSource.paginator=this.paginator
        this.dataSource.sort=this.sort
      },
      error:res=>
      {
        alert('Error while fetching data: '+res)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row:any)
  {
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row

    }).afterClosed().subscribe(val=>{
      if(val==='update')
      {
        this.getAllProducts() //refresh product data automatically to display updated data
      }
    })
  }

  deleteProduct(id:number)
  {
    this.api.deleteProduct(id)
    .subscribe({
      next:res=>
      {
        alert('Product deleted successfully!')
        this.getAllProducts()
      },
      error:res=>
      {
        alert('Error while deleting product '+res)
      }
    })
  }

}
