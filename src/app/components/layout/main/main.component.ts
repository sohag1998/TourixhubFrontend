import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LeftSideComponent } from "../common/left-side/left-side.component";
import { RightSideComponent } from "../common/right-side/right-side.component";
import { HeaderComponent } from "../common/header/header.component";

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, LeftSideComponent, RightSideComponent, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
