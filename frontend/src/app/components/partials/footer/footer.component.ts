import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  date :string | undefined;


constructor() {
  this.date = "21/07/2023 - 22:15" ;

}

}
