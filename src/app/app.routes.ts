import { Routes } from '@angular/router';
import { SplashComponent } from './componentes/splash/splash.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { MarvelComponent } from './componentes/marvel/marvel.component';
import { HomeComponent } from './componentes/home/home.component';
import { DcComponent } from './componentes/dc/dc.component';
import { JuegoComponent } from './componentes/juego/juego.component';
import { PuntosComponent } from './componentes/puntos/puntos.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  // },
  {
    path : '',
    redirectTo : '/splash',
    pathMatch : 'full'
  },
  {
    path : 'splash',
    component : SplashComponent
  },
  {
    path :'home',
    component : HomeComponent
  },
  {
    path : 'dc',
    component : DcComponent
  },
  {
    path : 'marvel',
    component : MarvelComponent
  },
  {
    path : 'inicio',
    component : InicioComponent
  },
  {
    path : 'marvel',
    component : MarvelComponent
  },
  {
    path : 'juego',
    component : JuegoComponent
  },
  {
    path : 'puntos',
    component : PuntosComponent
  }
];
