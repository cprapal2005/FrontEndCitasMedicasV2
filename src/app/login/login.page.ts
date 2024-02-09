import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username?: string;
  password?: string;

  constructor(private router: Router, private storage: StorageService, private backendService: BackendService) {}

  login() {
    
    this.backendService.login({username:this.username, password:this.password}).subscribe((token) => {

      if(token!=null) {

        this.storage.set(this.username!.toString(), token);

        this.storage.usuarioActual = this.username!.toString();

        this.username = "";
        this.password = "";

        this.router.navigate(['/home']);

      }

    });
    
  }

  ngOnInit() {
  }

}