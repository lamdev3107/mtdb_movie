import { Component, OnInit } from '@angular/core';
import { header_navigation } from 'src/app/core/utils/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headerNavigation = header_navigation;
  constructor() {}

  ngOnInit(): void {}
}
