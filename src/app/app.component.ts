import {Component} from '@angular/core';
import {StoryService} from './services/story.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'star-war-app';

  constructor(private storyService: StoryService) {
  }
}
