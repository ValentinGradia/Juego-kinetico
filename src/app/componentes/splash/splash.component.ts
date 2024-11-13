import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone : true,
  imports : [RouterModule],
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent  implements OnInit {

  constructor(private router: Router) {
    setTimeout( () =>{
      this.router.navigateByUrl('/inicio');
    },3000);
   }

  ngOnInit() {}

}
