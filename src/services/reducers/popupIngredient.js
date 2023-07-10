import {
  INGREDIENT_DATA_MODAL,
  DELETE_INGREDIENT_DATA_MODAL,
} from "../actions/popupIngredient";

const initialState = {
  ingredientsDataModal: [],
};

export const popupIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENT_DATA_MODAL:
      return {
        ...state,
        ingredientsDataModal: action,
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
