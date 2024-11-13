import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { PersonajeService } from 'src/app/services/personaje.service';

@Component({
  standalone : true,
  imports : [FormsModule, CommonModule, RouterModule],
  selector: 'app-puntos',
  templateUrl: './puntos.component.html',
  styleUrls: ['./puntos.component.scss'],
})
export class PuntosComponent  implements OnInit {

  private registrosSubscription !: Subscription;
  puntos : Punto[] = [];
  puntosOrdenados : Punto[] = [];
  cargando : boolean = false;

  constructor(private perso: PersonajeService) { }

  async ngOnInit() {
    this.cargando = true;
    await this.cargarPuntos();
  }


  async cargarPuntos()
  {
    this.registrosSubscription = await this.perso.traerPuntos().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc : any) => {
        const data = doc.data() as Punto; 

        data.Url = `assets/${data.Peronaje}.png`;
        this.puntos.push(data);
        
      });

      this.cargando = false;
      this.puntosOrdenados = this.puntos.sort((a,b) => b.Tiempo - a.Tiempo);
      this.puntosOrdenados = this.puntosOrdenados.slice(0,5);
    });
  }

}
export interface Punto {
  Jugador : string;
  Tiempo: number;
  Peronaje : string
  Url : string;
}
