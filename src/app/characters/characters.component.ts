import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Character} from '../model/character';
import {StoryService} from '../services/story.service';
import {Router} from '@angular/router';
import {DataShareService} from '../services/data-share.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  pageEvent: any = {};
  pageCount: number;
  public dataSource = new MatTableDataSource<Character>();
  // display the columns in the table
  displayedColumns = ['name', 'height', 'mass', 'birth_year', 'gender', 'details'];

  charactersResponseList: Character[];

  constructor(private storyService: StoryService,
              private router: Router,
              private shareService: DataShareService) {
    this.charactersResponseList = [];
    this.pageCount = 0;

  }

  //  for sort
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit() {
    // for initial page size
    this.pageEvent.pageSize = 10;
    // for initial page size base value
    this.pageEvent.baseValue = 0;
    // service call to fetch characters from server
    if (this.shareService.getPageIndex() === -1) {
      this.getCharacterResponse();
    } else {
      this.getCharacterResponse(this.shareService.getPageIndex());
    }
  }

  /**
   *
   * navigate to display more details about particular character
   * @param index
   */
  onMoreDetails(index: number): void {
    this.shareService.setCharacterList(this.charactersResponseList);
    const characterName = this.charactersResponseList[index]['name'];
    this.router.navigate([`/characters/${characterName}`]);
  }

  /**
   * customize the pages based on the length given
   */
  onPaginateChange(page: any) {
    this.getCharacterResponse(page['pageIndex'] + 1);
    this.pageEvent = {};
    this.pageEvent.pageSize = page.pageSize * (page.pageIndex + 1);
    this.pageEvent.baseValue = this.pageEvent.pageSize - page.pageSize;
  }

  /**
   *  fetch the character data from the server
   * @param pageIndex for pagination
   */
  getCharacterResponse(pageIndex?: number): void {
    if (pageIndex === undefined) {
      pageIndex = -1;
    }
    if (pageIndex === -1 || this.shareService.getCharacterList().length === 0) {
      this.storyService.getPeople(pageIndex).subscribe((res: Character[]) => {
        if (res) {
          this.pageCount = res['count'];
          this.shareService.setPageIndex(pageIndex);
          this.shareService.setPageCount(this.pageCount);
          this.charactersResponseList = res['results'];
          this.shareService.setCharacterList(this.charactersResponseList);
          this.dataSource = new MatTableDataSource<Character>(this.charactersResponseList);
        }
      });
    } else if (pageIndex !== -1) {
      this.storyService.getPeople(pageIndex).subscribe((res: Character[]) => {
        if (res) {
          this.pageCount = res['count'];
          this.shareService.setPageIndex(pageIndex);
          this.shareService.setPageCount(this.pageCount);
          this.charactersResponseList = res['results'];
          this.shareService.setCharacterList(this.charactersResponseList);
          this.dataSource = new MatTableDataSource<Character>(this.charactersResponseList);
        }
      });
    }

    // sorting
    this.dataSource = new MatTableDataSource<Character>(this.charactersResponseList);
    this.dataSource.sort = this.sort;
    console.log('page index', this.pageEvent);
  }

  /**
   * to filter source data with the given input
   * @param filterValue
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
