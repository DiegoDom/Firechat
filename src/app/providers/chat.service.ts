import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chats: Mensaje[] = [];

  private itemsCollection!: AngularFirestoreCollection<Mensaje>;

  constructor(private afs: AngularFirestore) { }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('date', 'asc').limitToLast(5));

    return this.itemsCollection.valueChanges().pipe(map((mensajes: Mensaje[]) => {
      this.chats = mensajes;
    }));
  }

  agregarMensaje(mensaje: string) {

    let message: Mensaje = {
      name    : 'Demo',
      message : mensaje,
      date    : new Date().getTime()
    };

    return this.itemsCollection.add(message);

  }

}
