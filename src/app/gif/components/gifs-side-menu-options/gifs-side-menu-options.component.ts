import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from '../../services/gifs.service';

interface MenuOptions{
  label:string;
  subLabel:string;
  router: string;
  icon: string
}


@Component({
  selector: 'app-gifs-side-menu-options',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './gifs-side-menu-options.component.html'
})
export class GifsSideMenuOptionsComponent {

  gifsService= inject(GifService)


  menuOptions: MenuOptions[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label:'Trending',
      router:'/dashboard/trending',
      subLabel:'Gifs Populares'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label:'Buscador',
      router:'/dashboard/search',
      subLabel:'Buscar gifs'
    }
  ]

}
