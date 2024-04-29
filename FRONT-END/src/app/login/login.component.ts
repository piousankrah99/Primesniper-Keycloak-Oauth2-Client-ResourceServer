import {Component, inject, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {AuthService} from "../authentication/auth.service";
import {HttpClient} from "@angular/common/http";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  http = inject(HttpClient);

  home: HomeComponent = new HomeComponent();

  constructor(private authService: AuthService,
              private sanitizer: DomSanitizer) {
 }

  login(): void {
    this.authService.login();
  }

  ngOnInit(): void {
    this.http.get<string>('/Snipers/primeSniper').subscribe(console.log)
  }

}
