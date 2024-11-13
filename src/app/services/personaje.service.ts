import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class PersonajeService {

  srcPersonaje : string | null = null;
  dc !: boolean;
  personaje : string | null = null;

  constructor(private firestore: AngularFirestore) { }


  setearSrc(imagen : string)
  {
    this.srcPersonaje = imagen;
  }

  async guardarPuntos(correo: string, tiempo : number)
  {
    try
    {
      await this.firestore.collection('Puntos').add({
        Jugador: correo,
        Tiempo: tiempo,
        Peronaje: this.personaje,
      });
      
    }
    catch(error){throw error}
  }

  traerPuntos()
  {
    const chats = this.firestore.collection('Puntos').get();
    return chats;
  }
}
