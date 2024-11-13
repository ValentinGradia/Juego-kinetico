import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Motion } from '@capacitor/motion';
import { PersonajeService } from 'src/app/services/personaje.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  standalone : true,
  imports : [FormsModule, CommonModule, RouterModule],
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss'],
})
export class JuegoComponent  implements OnInit {

  jugando : boolean = false;
  selector : boolean = false;
  flagBack : boolean = false;
  flagChoque : boolean = false
  flagMotion : boolean = false;
  flagSelector : boolean = false;
  personajeActual : any;
  personajeDiv : any;
  x : number = 0; 
  y : number = 0;
  intervalId : any
  velX: number = 0;  
  velY: number = 0;  
  ultimoId : number = 0;
  aceleracion: number = 0.005;  
  friccion: number = 0.1;  
  limiteVelocidad: number = 10;  
  puntos : number = 0;
  puntosId : any; 
  perdio : boolean = false;
  puntosGuardados : number = 0;
  imagenPersonaje : string | null  = null;
  dc !: boolean;

  constructor(private router: Router, private perso : PersonajeService, private user: UsuarioService, private toastController: ToastController) { }

  ngOnInit() {
    this.imagenPersonaje = this.perso.srcPersonaje;
    this.dc = this.perso.dc;
    this.iniciarJuego();
  }

  iniciarJuego(){

      this.jugando = true;
      this.perdio = false;
      setTimeout(async() => {
        this.puntosId = setInterval(()=>{
          this.puntos++;
        }, 1000);
        this.personajeDiv = document.getElementById('personaje');
        this.personajeDiv.style.transform = `translate(${0}px, ${0}px)`;
        this.flagMotion = true;
        this.starMotion();
        this.startMovimientoContinuo();
      }, 500);
  }


  detectarColision() {
    const personajeRect = this.personajeDiv.getBoundingClientRect();
    const anchoVentana = window.innerWidth;
    const altoVentana = window.innerHeight;
  
    if (personajeRect.left <= 0) {
      this.flagChoque = true
    }
  
    if (personajeRect.right >= anchoVentana) {
      this.flagChoque = true
    }
  
    if (personajeRect.top <= 0) {
      this.flagChoque = true
    }
  
    if (personajeRect.bottom >= altoVentana) {
      this.flagChoque = true
    }
    
    if (this.flagChoque) {
      clearInterval(this.intervalId);
      clearInterval(this.puntosId);
      setTimeout(() => {
        this.flagChoque = false;
        this.perdio = true;
        return this.perdido();
      }, 2000);
    }
  }

  startMovimientoContinuo() {
    const duration = 16; // Aproximadamente 60 FPS
    this.intervalId = setInterval(() => {
      // fricción para desacelerar progresivamente
      if (this.velX > 0) {
        this.velX -= this.friccion;
      } else if (this.velX < 0) {
        this.velX += this.friccion;
      }
  
      if (this.velY > 0) {
        this.velY -= this.friccion;
      } else if (this.velY < 0) {
        this.velY += this.friccion;
      }
  
      // que nunca se detenga
      const minVel = 0.4;
      if (Math.abs(this.velX) < minVel) {
        this.velX = this.velX > 0 ? minVel : -minVel;
      }
      if (Math.abs(this.velY) < minVel) {
        this.velY = this.velY > 0 ? minVel : -minVel;
      }
  
      this.x += this.velX;
      this.y += this.velY;
  
      if (!this.flagChoque) {
        this.personajeDiv.style.transform = `translate(${this.x}px, ${this.y}px)`;
      }
  
      this.detectarColision();

    }, duration);
  }

  salir()
  {
    this.perdio = false;
    if(this.dc)
    {
      this.router.navigateByUrl('/dc');
    }
    else
    {
      this.router.navigateByUrl('/marvel');
    }
  }

  starMotion(){

    Motion.addListener('orientation', event => {
      if(this.flagMotion){
        this.velX += Number(event.gamma) * this.aceleracion;
        this.velY += Number(event.beta) * this.aceleracion;

        
        this.velX = Math.min(this.limiteVelocidad, Math.max(-this.limiteVelocidad, this.velX));
        this.velY = Math.min(this.limiteVelocidad, Math.max(-this.limiteVelocidad, this.velY));
        
        console.log(`VelX: ${this.velX} - VelY: ${this.velY}`);
      }
    });
  }

  stopMotion(){
    Motion.removeAllListeners();
  }




  async guardar()
  {
    this.perso.guardarPuntos(this.user.correoUsuario!,this.puntosGuardados);

    const toast = await this.toastController.create({
      message: 'La partido se guardo correctamente',
      duration: 1500, // Milisegundos,
      position : 'bottom'
    });

    toast.present()
  }

  perdido(){
    
    this.flagMotion = false;
    this.jugando = false;
    this.flagChoque = false;
    this.x = 0;
    this.y = 0;
    this.velX = 0;
    this.velY = 0;
    this.puntosGuardados = this.puntos;
    this.puntos = 0;
  }


}
