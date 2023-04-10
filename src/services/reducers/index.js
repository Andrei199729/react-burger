import { combineReducers } from "redux";
import { ingredientReducer } from "./ingredient";
import { constructorReducer } from "./constructor";
import { popupOrderReducer } from "./popupOrder";
import { popupIngredientReducer } from "./popupIngredient";

export const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  popupIngredient: popupIngredientReducer,
  popupOrder: popupOrderReducer,
  constructorItems: constructorReducer,
});
