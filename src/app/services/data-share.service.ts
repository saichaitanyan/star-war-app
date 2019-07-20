import {Injectable} from '@angular/core';
import {Character} from '../model/character';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private currentCharacterList: Character[];
  private _pageCount: number;
  private _pageIndex: number;

  constructor() {
    this.currentCharacterList = [];
    this._pageIndex = -1;
    this._pageCount = 0;
  }

  /**
   *
   * @param list
   */
  setCharacterList(list: Character[]): void {
    console.log('subject at set', list);
    this.currentCharacterList = list;
  }

  /**
   * get the character list
   */
  getCharacterList(): Character[] {
    // console.log('subject at get');
    return this.currentCharacterList;
  }


  setPageCount(count: number) {
    this._pageCount = count;
  }

  getPageCount(): number {
    return this._pageCount;
  }

  setPageIndex(index: number) {
    this._pageIndex = index;
  }

  getPageIndex(): number {
    return this._pageIndex;
  }
}
