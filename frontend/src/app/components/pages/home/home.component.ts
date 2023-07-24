import { FoodService } from './../../../services/food.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  foods:Food[] =[];
  constructor(private foodService: FoodService, activetedRoute:ActivatedRoute) {
    let foodsObservalbe:Observable<Food[]>;

    activetedRoute.params.subscribe(params => {
      if(params.searchTerm)
      foodsObservalbe = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      else if(params.tag)
      {
        console.log(params.tag);
        foodsObservalbe = this.foodService.getAllFoodByTag(params.tag);
        console.log(this.foods);
      }
      else
      foodsObservalbe = foodService.getAll();

      foodsObservalbe.subscribe((serverFoods) => {
        this.foods = serverFoods;
      })
    })
   }




}
