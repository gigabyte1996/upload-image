import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss']
})
export class ShowImageComponent implements OnInit {
  // images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  // @Input() imageSrc1: string[];
  constructor() { }

  ngOnInit() {
  }

}
