import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
  <ul>
    <li *ngFor="let item of items | async">
      {{ item.name }}
    </li>
  </ul>
  <button (click)="addDocument()">Add</button>
  `
})
export class AppComponent {
  items: Observable<any[]>;
  constructor(private db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
    console.log(this.items, db.collection('items').valueChanges());
  }

  addDocument() {
    const items = this.db.collection('items');
    items.add({ name: 'item'});
  }
}
