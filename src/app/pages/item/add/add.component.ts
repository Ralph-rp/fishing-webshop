import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Item } from 'src/app/models/item.model';
import { FbBaseService } from 'src/app/services/fb-base.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { getItemForm } from 'src/app/shared/forms/item.form';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  form: FormGroup = getItemForm();
  items: Observable<Item[]>;
  item: Item;

  constructor(private service: FbBaseService<Item>, private location: Location) { }

  ngOnInit(): void {
  }


  getAllWhere(where: string) {
    this.items = this.service.getAllWhere('items', where);
    this.items.subscribe(res => {
      this.item = res[1];

      Object.entries(this.item).forEach(item => {
        if (item && item[1] && Array.isArray(item[1])) {
          (this.form.get(item[0]) as FormArray).clear();
          for (let i = 0; i < item[1].length; ++i) {
            if (typeof item[1][i] === 'object') {
              let formGroup = new FormGroup({});
              Object.entries(item[1][i]).forEach( (attr) => {
                formGroup.addControl(attr[0], new FormControl(attr[1]));
              });
              (this.form.get(item[0]) as FormArray).push(formGroup);
            } else {
              (this.form.get(item[0]) as FormArray).push(new FormControl(item[1][i]));
            }
          }
        }
      });

      this.form.patchValue(this.item);

    });
  }

  getAll() {
    this.items = this.service.getAllOrderBy('items');
    this.items.subscribe(res => {
      this.item = res[1];

      Object.entries(this.item).forEach(item => {
        if (item && item[1] && Array.isArray(item[1])) {
          (this.form.get(item[0]) as FormArray).clear();
          for (let i = 0; i < item[1].length; ++i) {
            if (typeof item[1][i] === 'object') {
              let formGroup = new FormGroup({});
              Object.entries(item[1][i]).forEach( (attr) => {
                formGroup.addControl(attr[0], new FormControl(attr[1]));
              });
              (this.form.get(item[0]) as FormArray).push(formGroup);
            } else {
              (this.form.get(item[0]) as FormArray).push(new FormControl(item[1][i]));
            }
          }
        }
      });

      this.form.patchValue(this.item);

    });
  }

  get getRelatedItems(): FormArray {
    return this.form.get('relatedItems') as FormArray;
  }

  // TODO:

  addRelatedItem() {
    this.item?.relatedItems.push('');
    (this.form.get('relatedItems') as FormArray).push(new FormControl('', Validators.required));
  }

  removeRelatedItem() {
    let relatedItems = this.form.get('relatedItems') as FormArray;
    relatedItems.removeAt(relatedItems.length - 1);
    this.item?.relatedItems.pop();
  }

  back() {
    this.location.back();
  }

  submit() {
    if (this.form.valid) {
      let item: Item = this.form.value;
      item.lastUpdate = new Date();
      this.service.add('items', item).then(console.log);
      this.back();
    }
  }

  log(): void {
    console.log(this.form.value);
  }

}
