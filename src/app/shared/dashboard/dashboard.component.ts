import { Component, OnInit } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [NgZorroModule]
})
export class DashboardComponent implements OnInit {

  isCollapsed = false;

  constructor() { }

  ngOnInit() {
  }

}
