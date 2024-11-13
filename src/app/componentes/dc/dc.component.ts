import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PersonajeService } from 'src/app/services/personaje.service';

@Component({
  standalone : true,
  imports : [FormsModule, CommonModule, RouterModule],
  selector: 'app-dc',
  templateUrl: './dc.component.html',
  styleUrls: ['./dc.component.scss'],
})
export class DcComponent  implements OnInit {

  constructor(private perso: PersonajeService, private router: Router) { }

  ngOnInit() {}

  iniciar(heroe : string)
  {
    this.perso.srcPersonaje = `assets/${heroe}.png`;
    this.perso.personaje = heroe;
    this.perso.dc = true;
    this.router.navigateByUrl('/juego');
  }

}
