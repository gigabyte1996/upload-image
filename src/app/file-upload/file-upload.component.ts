import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ImageSrc } from '../shared/imageSrc.model';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {


  ngOnInit() {
  }

  private imageSrc: string = '';
  imageName: string ='';
  // @Output() imageSrcsEvent = new EventEmitter<Observable<any[]>>() ;

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
  // private itemsCollection: AngularFirestoreCollection<ImageSrc>;
  // imageSrcs: Observable<ImageSrc[]>;
  // constructor(private db: AngularFirestore) {
  //   this.itemsCollection = db.collection<ImageSrc>('images').valueChanges();
  //   console.log(this.imageSrcs, db.collection('images').valueChanges());
  // }
  private itemsCollection: AngularFirestoreCollection<ImageSrc>;
  imageSrcs: Observable<ImageSrc[]>;
  constructor(private db: AngularFirestore) {
    this.itemsCollection = db.collection<ImageSrc>('images');
    this.imageSrcs = this.itemsCollection.valueChanges();
  }
  addDocument() {
    const imageSrcs = this.db.collection('images');
    imageSrcs.add({ name: this.imageSrc });
  }


  

}
