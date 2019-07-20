import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const BASE_API = environment.api;

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private http: HttpClient) {
  }

  /**
   * fetch the character details from the remote server
   */
  getPeople(page?: number): Observable<any> {
    const pageIndex = (page === -1) ? 1 : page;
    // console.log('page at service', page);
    return this.http.get(BASE_API + 'people/', {params: {page: String(pageIndex)}});
  }

  /**
   * fetch the films data from server
   * @param list
   */
  getFilmsData(list): Promise<any[]> {

    const filmNames = [];
    list.filter(e => {
      return this.http.get(e).subscribe(res => {
        filmNames.push(res['title']);
      });
    });
    return new Promise(resolve => {
      resolve(filmNames);
    });
  }

  /**
   * fetch the species data from server
   * @param list
   */
  getSpecies(list): Promise<any[]> {
    const speciesNames = [];
    list.filter(e => {
      return this.http.get(e).subscribe(res => {
        speciesNames.push(res['name']);
      });
    });
    return new Promise(resolve => {
      resolve(speciesNames);
    });
  }

  /**
   *fetch the vehicles data from the server
   * @param list
   */
  getVehicles(list): Promise<any[]> {
    const vehicleNames = [];
    list.filter(e => {
      return this.http.get(e).subscribe(res => {
        vehicleNames.push(res['name']);
      });
    });
    return new Promise(resolve => {
      resolve(vehicleNames);
    });

  }

  /**
   * fetch the star ship data from server
   * @param list
   */
  getStarShips(list): Promise<any[]> {
    const shipNames = [];
    list.filter(e => {
      return this.http.get(e).subscribe(res => {
        shipNames.push(res['name']);
      });
    });
    return new Promise(resolve => {
      resolve(shipNames);
    });

  }
}
