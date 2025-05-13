import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";

@Component({
  selector: 'app-country-layout-page',
  standalone: true,
  imports: [RouterOutlet, TopMenuComponent],
  templateUrl: './country-layout-page.component.html',
  styles: ``
})
export class CountryLayoutPageComponent {

}
