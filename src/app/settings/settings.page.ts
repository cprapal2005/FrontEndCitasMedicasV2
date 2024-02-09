import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  persona: any;

  constructor(private location: Location, private storage: StorageService, private backend: BackendService) {

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
    this.storage.get(this.storage.usuarioActual)?.then((token) => {
      this.backend.updatePersona(token.persona.id, this.persona);
    });
  }

}
