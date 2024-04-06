import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { BackendService } from '../services/backend.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username?: string;
  password?: string;

  constructor(private alertController:AlertController, private router: Router, private storage: StorageService, private backendService: BackendService) {}

  login() {
    
    if (!this.username || !this.password || this.username.length > 50 || this.username.length > 50){
      this.mostrarAlerta( "Error", "Faltan campos por llenar",["OK"]);
    }
    else{
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
    
  }

  private async mostrarAlerta(header_param:string,message_param:string,buttons_param:any[]) {
    const alert = await this.alertController.create({
        header: header_param,
        message: message_param,
        buttons: buttons_param
    });

    await alert.present();
  }

  registrar():void{
    this.router.navigate(['/registro'])
  }

  ngOnInit() {
  }

}