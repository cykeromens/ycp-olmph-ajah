import {Component, OnInit} from '@angular/core';
import {detectBody} from '../../app.helpers';

declare var jQuery: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): any {
    detectBody();
  }

  public onResize() {
    detectBody();
  }

}
