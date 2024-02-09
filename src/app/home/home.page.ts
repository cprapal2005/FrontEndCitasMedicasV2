import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { FiltradoService } from '../services/filtrado.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit{

  especializaciones: any;
  medicos: any;
  flag = true;
  isOpen = false;
  searchTerm: string = '';
  constructor(private backendService: BackendService, private filtradoService: FiltradoService, private router:Router,  private storage: StorageService) {}

  ngAfterViewInit(): void {
    this.obtenerDatosDesdeBackend('');
  }

  ngOnInit() {

    this.storage.get(this.storage.usuarioActual)?.then((token) => {
      this.filtradoService.getLista(token).subscribe(lista =>{
        this.especializaciones = lista
      })
    })

    this.filtradoService.$listaEspecializaciones.subscribe(lista =>{
      this.especializaciones = lista
    })

  }

  obtenerDatosDesdeBackend(filtro: string) {
    this.filtradoService.filtrarEspecializaciones(filtro);
  }

  buscarDoctores(id: string) {
    this.flag = true;
    this.isOpen = true;
    this.storage.get(this.storage.usuarioActual)?.then((token) => {
      this.backendService.getMedicos(id, token).subscribe(
        (response) => {
          if (response.length === 0) {
            this.flag = false;
          }
          this.medicos = response;
        },
        (error) => {
          console.error('Error al obtener datos del backend:', error);
        }
      );
    });
  }

  irPaginaCita(dato:any):void{
    this.router.navigate(['/date',dato]);
  }

  cerrarSesion():void{
    this.storage.usuarioActual="";
    this.router.navigate(['/login']);
  }

  irPaginaCuenta():void{
    this.router.navigate(['/settings']);
  }

    obtenerIcono(categoriaNombre: string): string {
      const mapaIconos: { [key: string]: string } = {
        'Cardiología': 'heart',
        'Neurología': 'brain',
        'Dermatología': 'man',
        'Pediatría': 'happy',
        'Oftalmología': 'eye'

        // Agrega más categorías y sus iconos correspondientes según necesites
      };
      const icono = mapaIconos[categoriaNombre];
      return icono ? icono : 'help-circle'; // Icono predeterminado si no se encuentra uno específico
    }

}
