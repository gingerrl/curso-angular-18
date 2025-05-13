import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {

  routes= routes.map(route =>({
    title: route.title ?? '',
    path: route.path ?? ''
  }))
}
