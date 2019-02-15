import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private imageSrc: string = '';
  imageName: string ='';

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
  }
  imageSrcs: Observable<any[]>;
  constructor(private db: AngularFirestore) {
    this.imageSrcs = db.collection('images').valueChanges();
    console.log(this.imageSrcs, db.collection('images').valueChanges());
  }

  addDocument() {
    const imageSrcs = this.db.collection('images');
    imageSrcs.add({ name: this.imageSrc });
  }
}
