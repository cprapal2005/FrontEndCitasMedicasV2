import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { BackendService } from '../services/backend.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  persona: any;

  constructor(private alertController: AlertController, private location: Location, private storage: StorageService, private backend: BackendService) {

    this.persona = {
      username: "",
      password: "",
      nombre: "",
      apellido1: "",
      apellido2: "",
      telf: "",
      dni: "",
      email:""
    }

  }

  ngOnInit() {

    this.storage.get(this.storage.usuarioActual)?.then((token) => {

      this.persona = {
        username: token.persona.username,
        password: token.persona.password,
        nombre: token.persona.nombre,
        apellido1: token.persona.apellido1,
        apellido2: token.persona.apellido2,
        telf: token.persona.telf,
        dni: token.persona.dni,
        email: token.persona.email
      }

    });

  }

  myBackButton(){
    this.location.back();
  }

  actualizarPersona() {
    this.storage.get(this.storage.usuarioActual)?.then((tokensito) => {
      this.backend.updatePersona(tokensito.persona.id, {token:tokensito.token, persona:this.persona}).subscribe(data=>{
        tokensito.persona = this.persona;
        this.storage.set(this.storage.usuarioActual, tokensito);
        this.mostrarAlerta("Perfil Actualizado", "Tu perfil ha sido actualizado correctamente",["OK"]);
      })
    });
    this.location.back()
  }

  private async mostrarAlerta(header_param:string,message_param:string,buttons_param:any[]) {
    const alert = await this.alertController.create({
        header: header_param,
        message: message_param,
        buttons: buttons_param
    });

    await alert.present();
  }

}
