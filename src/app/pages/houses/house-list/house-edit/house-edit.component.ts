import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house-edit',
  templateUrl: './house-edit.component.html',
  styleUrls: ['./house-edit.component.scss']
})
export class HouseEditComponent {

  constructor(private router: Router) {
  }

  close() {
    this.router.navigate(['/'])
  }
}
