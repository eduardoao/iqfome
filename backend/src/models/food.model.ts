import {Schema, model} from 'mongoose';

export interface Food {   
        _id:string;
        name:string;
        price:number;
        tags: string[];
        favorite:boolean;
        stars: number;
        imageUrl: string;
        origins: string[];
        cookTime:string;
        information:string;
}

export const FoodSchema = new Schema<Food>(
    {
        _id: {type: String },
        name: {type: String, required:true},
        price: {type: Number, required:true},
        tags: {type: [String]},
        favorite: {type: Boolean, default:false},
        stars: {type: Number, required:true},
        imageUrl: {type: String, required:true},
        origins: {type: [String], required:true},
        cookTime: {type: String, required:true},
        information: {type: String, required:false}
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps:true
    }
);

export const FoodModel = model<Food>('food', FoodSchema);
