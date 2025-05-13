import { Component, input } from '@angular/core';
import { GifListItemComponent } from '../gif-list-item/gif-list-item.component';
import { Gif } from '../../interfaces/gif.service';

@Component({
  selector: 'gif-list',
  standalone: true,
  imports: [
    GifListItemComponent
  ],
  templateUrl: './gif-list.component.html',
  styles: ``
})
export class GifListComponent {
  gifs = input.required<Gif[]>()
}
