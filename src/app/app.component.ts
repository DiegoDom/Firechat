import { Component } from '@angular/core';
import { ChatService } from './providers/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  title = 'firechat';

  constructor(public cs: ChatService) { }
}
