import { Component } from '@angular/core';
import { environment } from '@enviroments/environment';

@Component({
  selector: 'app-gifs-side-menu-header',
  standalone: true,
  imports: [],
  templateUrl: './gifs-side-menu-header.component.html'
})
export class GifsSideMenuHeaderComponent {

  envs = environment;
}
