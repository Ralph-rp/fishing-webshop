import { Component, OnInit } from '@angular/core';
import { Observable, Timestamp } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { FbBaseService } from 'src/app/services/fb-base.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {

  list: Observable<Item[]> = null;
  dataSource: Item[] = null;
  displayedColumns: string[] = ['name', 'description', 'quantity', 'price', 'actions']

  constructor(private service: FbBaseService<Item>, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getAll();
    this.list.subscribe(
      list => {
        this.dataSource = list;
      }
    );
  }

  getAll(): void {
    this.list = this.service.getAll('items');
  }

  getHourAndMin(t: number): string {
    if (t === 0) return "none"
    return this.datePipe.transform(t, 'shortTime');
  }

  edit(id: string) {
    this.router.navigateByUrl('/items/edit/' + id);
  }

  delete(id: string) {
    this.service.delete('items', id);
  }

  addToCart(id: string) {
    console.log(id)
    // TODO
  }

}
