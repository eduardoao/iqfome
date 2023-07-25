import { FoodService } from './../../../services/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Food } from 'src/app/shared/models/food';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent {
  food!:Food;

  constructor(activatedRoute: ActivatedRoute, foodService:FoodService,
    private cartService:CartService, private route:Router) {
    activatedRoute.params.subscribe((params) => {
      if(params.id)
        //this.food = foodService.getFoodById(params.id);
        foodService.getFoodById(params.id).subscribe(serverFood => {
          this.food = serverFood;
        });
    });
  }

  addToCard(){
    this.cartService.addToCart(this.food);
    this.route.navigateByUrl('/cart-page');
  }



}
