// backend.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private apiUrl = 'http://localhost:3000'; // Cambia la URL según la configuración de tu servidor

  constructor(private http: HttpClient) {}

  getEspecializacion(token: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', "Bearer " + token.token);
    
    return this.http.get(`${this.apiUrl}/especializacion/getAllEspecializaciones`, { headers });
  }

  addCita(cita: any, token: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', "Bearer " + token.token);
    return this.http.post(`${this.apiUrl}/cita/create`, cita, { headers });
  }
 

  getMedicos(especializacion:String, token: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', "Bearer " + token.token);
    return this.http.get(`${this.apiUrl}/medico/getMedicosEspecializacion/${especializacion}`, { headers });
  }

  yaExiste(cita: any, token: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', "Bearer " + token.token);
    return this.http.post(`${this.apiUrl}/cita/exist`, cita, { headers });
  }

  getCentrosMedicos(token: any): Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', "Bearer " + token.token);
    return this.http.get(`${this.apiUrl}/centro_medico/all`, { headers })
  }

  getCentroMedico(id: number, token: any): Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', "Bearer " + token.token);
    return this.http.get(`${this.apiUrl}/centro_medico/get/${id}`, { headers })
  }

  getPersona(id: number, token: any): Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', "Bearer " + token.token);
    return this.http.get(`${this.apiUrl}/persona/getPersonaId/${id}`, { headers })
  }

  getPaciente(id: number, token: any): Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', "Bearer " + token.token);
    return this.http.get(`${this.apiUrl}/paciente/${id}`, { headers })
  }

  login(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, usuario)
  }

  updatePersona(id: number, token: any): Observable<any>{
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', "Bearer " + token.token);
    return this.http.put(`${this.apiUrl}/persona/update/${id}`, token.persona,{ headers })
  }

  register(persona:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/auth/register`, persona)
  }

  addPaciente(persona: any, token: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', "Bearer " + token.token);
    return this.http.post(`${this.apiUrl}/paciente/create`, {idPersona:persona.id, fechaNacimiento:"2000-10-10", tarjetaSanitaria:"123456789012"}, { headers });
  }

}
