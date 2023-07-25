import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent  {
  tags?:Tag[];

  constructor(foodService: FoodService) {
    let tagsObservable: Observable<Tag[]>;

    tagsObservable = foodService.getAllTags();


    tagsObservable.subscribe((serverTags) => {
      this.tags = serverTags;
    });

  }

}
