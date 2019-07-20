import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataShareService} from '../services/data-share.service';
import {Character} from '../model/character';
import {StoryService} from '../services/story.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  // panelOpenState = false;

  characterList: Character[];
  selectedCharacterObj: Character;
  selectedCharacterName: string;
  filmsList: string[];
  speciesList: string[];
  vehicleList: string[];
  starShipsList: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shareService: DataShareService,
    private storyService: StoryService
  ) {
    this.filmsList = [];
    this.speciesList = [];
    this.vehicleList = [];
    this.starShipsList = [];
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.selectedCharacterName = params.get('name');
      // console.log('name selected ', params.get('name'));
    });

    this.characterList = this.shareService.getCharacterList();
    if (this.characterList.length > 0) {
      this.selectedCharacterObj = this.characterList.filter(e => e['name'] === this.selectedCharacterName)[0];

      // fetch the film data
      if (this.selectedCharacterObj['films'].length > 0) {
        this.storyService.getFilmsData((this.selectedCharacterObj['films'])).then(data => {
          // console.log('film names', data);
          this.filmsList = data;
        });
      }

      //  fetch species data
      if (this.selectedCharacterObj['species'].length > 0) {
        this.storyService.getSpecies(this.selectedCharacterObj['species']).then(data => {
          // console.log('species names', data);
          this.speciesList = data;
        });
      }

      //  fetch vehicles data
      if (this.selectedCharacterObj['vehicles'].length > 0) {
        this.storyService.getVehicles(this.selectedCharacterObj['vehicles']).then(data => {
          // console.log('vehicle names', data);
          this.vehicleList = data;
        });
      }

      // fetch star ships data
      if (this.selectedCharacterObj['starships'].length > 0) {
        this.storyService.getStarShips(this.selectedCharacterObj['starships']).then(data => {
          // console.log('vehicle names', data);
          this.starShipsList = data;
        });
      }

    }
  }


  onBack(): void {
    this.router.navigate(['/home']);
  }
}
