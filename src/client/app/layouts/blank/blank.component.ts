import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    jQuery('body').addClass('gray-bg');
  }

  ngOnDestroy() {
    jQuery('body').removeClass('gray-bg');
  }
}
