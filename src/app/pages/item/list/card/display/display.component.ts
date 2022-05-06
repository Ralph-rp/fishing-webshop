import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { FbBaseService } from 'src/app/services/fb-base.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  @Input() item: Item;

  constructor(private service: FbBaseService<Item>, private router: Router) { }

  ngOnInit(): void {
  }

  edit(id: string) {
    this.router.navigateByUrl('/item/edit/' + id);
  }

  delete(id: string) {
    this.service.delete('items', id);
  }

  addToCart(id: string) {
    // TODO
    console.log(id)
  }
}
