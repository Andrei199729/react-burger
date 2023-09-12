import {
  INGREDIENT_DATA_MODAL,
  DELETE_INGREDIENT_DATA_MODAL,
  TIngredientDataModalAction,
} from "../actions/popupIngredient";
import { TIngredient } from "../types/data";

type TIngredientModalState = {
  ingredientsDataModal: TIngredient[];
};

const initialState: TIngredientModalState = {
  ingredientsDataModal: [],
};

export const popupIngredientReducer = (
  state = initialState,
  action: TIngredientDataModalAction
): TIngredientModalState => {
  switch (action.type) {
    case INGREDIENT_DATA_MODAL:
      return {
        ...state,
        ingredientsDataModal: action.ingredientsDataModal,
      };

    case DELETE_INGREDIENT_DATA_MODAL:
      return {
        ...state,
        ingredientsDataModal: [],
      };

    default:
      return state;
  }
};
