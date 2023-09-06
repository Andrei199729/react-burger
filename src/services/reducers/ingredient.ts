import {
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_FAILED,
  TBurgerIngredientsAction,
} from "../actions/ingredient";
import { TIngredient } from "../types/data";

type TIngredientState = {
  ingredients: TIngredient[];
  preloader: boolean;
};

const initialState: TIngredientState = {
  ingredients: [],
  preloader: false,
};

export const ingredientReducer = (
  state = initialState,
  action: TBurgerIngredientsAction
): TIngredientState => {
  switch (action.type) {
    case GET_BURGER_INGREDIENTS_REQUEST:
      return {
        ...state,
        preloader: action.preloader,
      };
    case GET_BURGER_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.ingredients,
        preloader: action.preloader,
      };
    case GET_BURGER_INGREDIENTS_FAILED:
      return {
        ...state,
        preloader: action.preloader,
      };

    default:
      return state;
  }
};
