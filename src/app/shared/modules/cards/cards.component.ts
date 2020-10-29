import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() color: string;
  @Input() icon: number;
  @Input() count: number;
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
