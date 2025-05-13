import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@enviroments/environment';
import { map, Observable, tap } from 'rxjs';
import { Gif } from '../interfaces/gif.service';
import { GiphyResponse } from '../interfaces/giphy.interfce';
import { GifMapper } from '../mapper/gif.mapper';

const loadFromLocalStorage = () => {
  const characters = localStorage.getItem('searchHistory');

  return characters ? JSON.parse(characters) : {};
};

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  trandingGifs = signal<Gif[]>([]);
  trandingGifsLoading = signal(false);
  private trendingPage = signal(0);

  trendingGifGroup = computed<Gif[][]>(() => {
    const group = [];
    for (let i = 0; i < this.trandingGifs().length; i += 3) {
      group.push(this.trandingGifs().slice(i, i + 3));
    }
    return group;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  saveGifsToLocalStorage = effect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory()));
  });
  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.apiKey,
          limit: 20,
          offset: this.trendingPage() * 20,
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trandingGifs.update((currentGifs) => [...currentGifs, ...gifs]);
        this.trendingPage.update(page => page +1 )
        this.trandingGifsLoading.set(false);
      });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.apiKey,
          limit: 20,
          q: query,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((item) => GifMapper.mapGiphyItemsToGifArray(item)),
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        })
      );

    // .subscribe((resp) =>{
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data)

    //     console.log(gifs)
    // })
  }

  getHistoryGifs(query: string) {
    return this.searchHistory()[query] ?? [];
  }
}
