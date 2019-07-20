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
    // console.log('subject at set', list);
    this.currentCharacterList = list;
  }

  /**
   * get the character list
   */
  getCharacterList(): Character[] {
    return this.currentCharacterList;
  }

  /**
   * set current page count
   * @param count
   */
  setPageCount(count: number) {
    this._pageCount = count;
  }

  /**
   * get the current page count
   */
  getPageCount(): number {
    return this._pageCount;
  }

  /**
   * set the current page index
   * @param index
   */
  setPageIndex(index: number) {
    this._pageIndex = index;
  }

  /**
   * get page index
   */
  getPageIndex(): number {
    return this._pageIndex;
  }
}
