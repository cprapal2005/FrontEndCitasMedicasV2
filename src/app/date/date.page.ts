import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.page.html',
  styleUrls: ['./date.page.scss'],
})
export class DatePage implements OnInit {

  fechaSeleccionada:any
  horaSeleccionada:any
  minDate: string;
  datoRecibido:any
  persona: any;
  centroMedico: any;

  constructor(private router:Router, private backendService:BackendService, private route: ActivatedRoute, private alertController: AlertController, private location: Location, private storage: StorageService) {
    this.minDate = new Date().toISOString();
    this.persona = {nombre:""};
    this.centroMedico = {nombre:""}
  }

  private parsearFechaHora(){
    if (this.fechaSeleccionada && this.horaSeleccionada) {
      const array1 = this.fechaSeleccionada.split("T");
      const array2 = this.horaSeleccionada.split("T");
      this.datoRecibido.fecha = array1[0];
      this.datoRecibido.hora = array2[1];
      return true
    } 
    else {
      this.mostrarAlerta('¡Ups!','Recuerda seleccionar fecha y hora',['OK'])
      return false
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

  agregarCita(){

    if (this.parsearFechaHora()) {
      this.storage.get(this.storage.usuarioActual)?.then((token) => {
        this.backendService.yaExiste(this.datoRecibido, token).subscribe(
          (response) => {

            if (!response){
              this.backendService.addCita(this.datoRecibido, token).subscribe(
                () => {
                  this.mostrarAlerta('¡Atención!','Ya tienes tu cita.',['OK'])
                  this.router.navigate(['/home']);
                },
                (error) => {
                  console.error('Error al obtener datos del backend:', error);
                }
              );
            }
            else this.mostrarAlerta('Lo sentimos...','Está ocupado en este momento.',['OK'])
          },
          (error) => {
            console.error('Error al obtener datos del backend:', error);
          }
        );
      });
    }
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const medico = params['id'];
      const medicoParseo = parseInt(medico);
      this.storage.get(this.storage.usuarioActual)?.then((token) => {
        this.backendService.getCentroMedico(params['idCentroMedico'], token).subscribe(
          (response) => {

            if (response){
              this.centroMedico = response;
            }
            else this.mostrarAlerta('Lo sentimos...','Está ocupado en este momento.',['OK'])
          },
          (error) => {
            console.error('Error al obtener datos del backend:', error);
          }
        );
      });

      this.storage.get(this.storage.usuarioActual)?.then((token) => {
        this.backendService.getPersona(params['idPersona'], token).subscribe(
          (response) => {

            if (response){
              this.persona = response;
            }
            else this.mostrarAlerta('Lo sentimos...','Está ocupado en este momento.',['OK'])
          },
          (error) => {
            console.error('Error al obtener datos del backend:', error);
          }
        );
      });
      this.datoRecibido = {
        idMedico: medicoParseo,
        idPaciente : 1,
        idCentroMedico : 1,
        planta : '2',
        sala : 'A',
        fecha : '2024-01-27',
        hora : '10:00:00'
      }
    });

    

  }

  myBackButton(){
    this.location.back();
  }

}
