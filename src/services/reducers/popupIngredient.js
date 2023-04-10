import {
  INGREDIENT_DATA_MODAL,
  DELETE_INGREDIENT_DATA_MODAL,
} from "../actions/popupIngredient";

const initialState = {
  ingredientsDataModal: [],
  ingredientDetailsPopupOpen: false,
};

export const popupIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENT_DATA_MODAL:
      return {
        ...state,
        ingredientsDataModal: action,
        ingredientDetailsPopupOpen: true,
      };

    case DELETE_INGREDIENT_DATA_MODAL:
      return {
        ...state,
        ingredientsDataModal: [],
        ingredientDetailsPopupOpen: false,
      };

    default:
      return state;
  }
};
