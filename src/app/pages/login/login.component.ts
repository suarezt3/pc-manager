import { Component, OnInit } from '@angular/core';
import { FormLoginComponent } from '../../components/form-login/form-login.component';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormLoginComponent]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
