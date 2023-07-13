import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})

export class UsersComponent implements OnInit {
  pageSize = 5;
  currentPage = 0;
  totalLength = 0;
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'avatar'];

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<User>();
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.loadUsers();
  }

  loadUsers(pageNumber: number = 1) {
    const perPage = this.pageSize;

    this.http.get<any>(`https://reqres.in/api/users?per_page=${perPage}&page=${pageNumber}`).subscribe(response => {
      this.dataSource.data = response.data;
      this.totalLength = response.total;
      this.currentPage = pageNumber - 1;
    });
  }

  onPageSizeChange(event: any) {
    const newPageSize = event.target.value;
    this.pageSize = newPageSize;
    this.loadUsers();
  }

  onPageChange(event: PageEvent) {
    const pageNumber = event.pageIndex + 1;
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const offset = this.currentPage * pageSize;
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    const newData = this.dataSource.data.slice(startIndex, endIndex);

    this.pageSize = pageSize;
    this.dataSource = new MatTableDataSource<User>(newData);

    if (offset >= this.totalLength) {
      this.currentPage = Math.floor((this.totalLength - 1) / pageSize);
    }

    this.loadUsers(pageNumber);
  }

}
