import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagesService } from '../images.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss'],
  providers: [NgbCarouselConfig]
})
export class ShowImageComponent implements OnInit {
  constructor(
    private data: ImagesService,
    config: NgbCarouselConfig
  ) { 
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
  
  imageData

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.imageData = message);
  }

}
