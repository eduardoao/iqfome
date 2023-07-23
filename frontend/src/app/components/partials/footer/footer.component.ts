import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  date :string | undefined;


constructor() {
  this.date = new Date().getFullYear().toString();
}

}
