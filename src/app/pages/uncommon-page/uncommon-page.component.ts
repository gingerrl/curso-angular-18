import { Component, signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import {
  AsyncPipe,
  I18nPluralPipe,
  I18nSelectPipe,
  JsonPipe,
  KeyValuePipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import CustomPageComponent from '../custom-page/custom-page.component';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Steven',
  gender: 'male',
  age: 33,
  address: 'Ecuador',
};

const client2 = {
  name: 'Ginger',
  gender: 'female',
  age: 30,
  address: 'Ecuador',
};

@Component({
  selector: 'app-uncommon-page',
  imports: [
    CardComponent,
    I18nSelectPipe,
    I18nPluralPipe,
    SlicePipe,
    JsonPipe,
    UpperCasePipe,
    KeyValuePipe,
    TitleCasePipe,
    AsyncPipe,
  ],
  templateUrl: './uncommon-page.component.html',
  styles: ``,
})
export default class UncommonPageComponent {
  //i18n Select
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2);
      return;
    }
    this.client.set(client1);
  }

  //i18n plural

  clientsMap = signal({
    '=0': 'no tenemos ningun cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    other: 'tenemos # clientes esperando',
  });

  clients = signal(['Maria', 'Roy', 'Jorge', 'Victoria', 'Miryam', 'Lucio']);

  deleteClient() {
    this.clients.update((prev) => prev.slice(1));
  }

  //keyvalue pipe

  profile = {
    name: 'Ginger',
    age: 30,
    address: 'Peru',
  };

  //Async pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('Tenemos un error');
      resolve('Tenemos data en la promesa.')
      console.log('Promesa finalizada');
    }, 3500);
  });

  myObservableTimer = interval(2000).pipe(
    map((value) => value+1),
    tap((value) => console.log(value))
  )
}
