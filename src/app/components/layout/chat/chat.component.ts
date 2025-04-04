import { Component } from '@angular/core';
import { ChatLeftSideComponent } from "../common/chat-left-side/chat-left-side.component";
import { HeaderComponent } from "../common/header/header.component";

@Component({
  selector: 'app-chat',
  imports: [ChatLeftSideComponent, HeaderComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

}
