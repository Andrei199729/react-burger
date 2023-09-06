import { combineReducers } from "redux";
import { ingredientReducer } from "./ingredient";
import { constructorReducer } from "./constructor";
import { popupOrderReducer } from "./popupOrder";
import { popupIngredientReducer } from "./popupIngredient";
import { authReducer } from "./user";
import { wsReducer } from "./wsReducer";
import { wsReducerProfile } from "./wsReducerProfile";

export const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  popupIngredient: popupIngredientReducer,
  popupOrder: popupOrderReducer,
  constructorItems: constructorReducer,
  user: authReducer,
  ws: wsReducer,
  wsProfile: wsReducerProfile,
});
