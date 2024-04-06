import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { BackendService } from '../services/backend.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioPrincipal!: FormGroup
  username =""
  password=""

  constructor(private alertController:AlertController, private location: Location, private storage: StorageService, private backend: BackendService, private router: Router) {

    this.formularioPrincipal = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      password: new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(6)]),
      nombre: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      apellido1: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      apellido2: new FormControl("", [Validators.maxLength(50)]),
      telf: new FormControl("", [Validators.required, Validators.maxLength(9)]),
      dni: new FormControl("", [Validators.required, Validators.maxLength(9)]),
      email: new FormControl("", [Validators.required, Validators.maxLength(100)])
    })

  }

  ngOnInit() {

  }

  myBackButton(){
    this.location.back();
  }

  private async mostrarAlerta(header_param:string,message_param:string,buttons_param:any[]) {
    const alert = await this.alertController.create({
        header: header_param,
        message: message_param,
        buttons: buttons_param
    });

    await alert.present();
  }

  registrarPersona() {

    if (this.formularioPrincipal.valid){

      this.backend.register({
        nombre: this.formularioPrincipal.get("nombre")?.value,
        apellido1: this.formularioPrincipal.get("apellido1")?.value,
        apellido2: this.formularioPrincipal.get("apellido2")?.value,
        dni: this.formularioPrincipal.get("dni")?.value,
        telf: this.formularioPrincipal.get("telf")?.value,
        email: this.formularioPrincipal.get("email")?.value,
        username: this.formularioPrincipal.get("username")?.value,
        password: this.formularioPrincipal.get("password")?.value,

      }).subscribe((token)=>{
        this.username = token.persona.username
        this.password = token.persona.password
        this.storage.set(this.username,token)
        this.storage.usuarioActual=this.username;

        this.backend.addPaciente(token.persona,token).subscribe(data=>{
          if (!data) console.log("error")
        })

        this.router.navigate(['/home']);
      })

    }

    else this.mostrarAlerta("Error","Los datos no son válidos",["Aceptar"]);
    
  }
}


