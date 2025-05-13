import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  searchGifService = inject(GifService);

  gifs = signal<Gif[]>([])
  onSearch(query: string) {
    this.searchGifService.searchGifs(query).subscribe((resp) =>{
      this.gifs.set(resp)
    })
  }
}
