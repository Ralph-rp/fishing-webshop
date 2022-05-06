import { FormArray, FormControl, FormGroup } from "@angular/forms";


export function getItemForm(): FormGroup {
   return new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    category: new FormControl(),
    description: new FormControl(),
    quantity: new FormControl(),
    relatedItems: new FormArray([]),
    lastUpdate: new FormControl(),
  })
}