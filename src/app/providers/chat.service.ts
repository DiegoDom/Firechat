
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chats: Mensaje[] = [];
  public usuario: any = {};

  private itemsCollection!: AngularFirestoreCollection<Mensaje>;

  constructor(private afs: AngularFirestore, public FBauth: AngularFireAuth) {
    this.FBauth.authState.subscribe(user => {
      if (!user) {
        return;
      }

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  login(proveedor: string) {
    if (proveedor === 'google') {
      this.FBauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } else {
      this.FBauth.signInWithPopup(new firebase.auth.GithubAuthProvider());
    }
  }
  logout() {
    this.usuario = {};
    this.FBauth.signOut();
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('date', 'asc').limitToLast(5));

    return this.itemsCollection.valueChanges().pipe(map((mensajes: Mensaje[]) => {
      this.chats = mensajes;
    }));
  }

  agregarMensaje(mensaje: string) {

    let message: Mensaje = {
      name    : this.usuario.nombre,
      message : mensaje,
      date    : new Date().getTime(),
      uid     : this.usuario.uid
    };

    return this.itemsCollection.add(message);
  }

}
