import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Motion } from '@capacitor/motion';
import { PersonajeService } from 'src/app/services/personaje.service';

@Component({
  standalone : true,
  imports : [FormsModule, CommonModule, RouterModule],
  selector: 'app-marvel',
  templateUrl: './marvel.component.html',
  styleUrls: ['./marvel.component.scss'],
})
export class MarvelComponent  implements OnInit {

  constructor(private perso: PersonajeService, private router: Router) { }

  ngOnInit() {}

  iniciar(heroe : string)
  {
    this.perso.srcPersonaje = `assets/${heroe}.png`;
    this.perso.personaje = heroe;
    this.perso.dc = false;
    this.router.navigateByUrl('/juego');
  }

}
