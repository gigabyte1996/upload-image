import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map,  } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ImageSrc } from '../shared/imageSrc.model';
import { ImagesService } from '../images.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  itemsCollection: AngularFirestoreCollection<ImageSrc>;
  imageSrcs: any;
  imageSrc: string = '';
  imageName: string ='';
  ngOnInit() {
  }

  constructor(
    private db: AngularFirestore,
    private data: ImagesService
  ) {
    this.itemsCollection = db.collection<ImageSrc>('images');
    this.imageSrcs = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ImageSrc;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    this.imageSrcs.subscribe(elm => this.data.changeMessage(elm));
  }

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
  }

  addDocument() {
    const imageSrcs = this.db.collection('images');
    imageSrcs.add({ name: this.imageSrc });
  }
}
