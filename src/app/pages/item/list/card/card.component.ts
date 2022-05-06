import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { FbBaseService } from 'src/app/services/fb-base.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  items: Observable<Item[]> = null;

  constructor(private service: FbBaseService<Item>, private dialog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.items = this.service.getAll('items');
  }

}
