import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss']
})
export class ShowImageComponent implements OnInit {
  
  @Input() imageSrc1: string[];
  constructor() { }

  ngOnInit() {
  }

}
