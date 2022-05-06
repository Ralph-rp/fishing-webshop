import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Timestamp } from '../models/item.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FbBaseService<T extends { id?: string }> {

  // convert timestamps to dates
  public static convertDate(firebaseObject: any) {
    if (!firebaseObject) return null;

    for (const [key, value] of Object.entries(firebaseObject)) {
      if (value && Array.isArray(value)) {
        firebaseObject[key] = value.map(item => this.convertDate(item));
      }
      if (value && typeof value === 'object') {
        firebaseObject[key] = this.convertDate(value);
      }
      if (value && value.hasOwnProperty('seconds')) {
        firebaseObject[key] = (value as Timestamp).toDate();
      }
    }
    return firebaseObject;
  }

  constructor(private afs: AngularFirestore) { }

  async add(collectionName: string, data: T, id?: string): Promise<string> {
    const uid = id ? id : this.afs.createId();
    data.id = uid;
    await this.afs.collection(collectionName).doc(uid).set(data);
    return uid;
  }

  getAll(collectionName: string): Observable<T[]> {
    return this.afs.collection(collectionName).valueChanges().pipe(
      map((data: any) => FbBaseService.convertDate(data))
    ) as Observable<T[]>;
  }

  get(collectionName: string, id: string): Observable<any> {
    return this.afs.collection(collectionName).doc(id).valueChanges().pipe(
      map((data: any) => FbBaseService.convertDate(data))
    );
  }

  getById(collectionName: string, id: string): Observable<any> {
    return this.afs.collection(collectionName).doc(id).valueChanges().pipe(
      map((data: any) => FbBaseService.convertDate(data))
    );
  }

  update(collectionName: string, id: string, data: T): Promise<void> {
    return this.afs.collection(collectionName).doc(id).update(data);
  }

  delete(collectionName: string, id: string): Promise<void> {
    return this.afs.collection(collectionName).doc(id).delete();
  }

}
