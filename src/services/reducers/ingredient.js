import {
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_FAILED,
} from "../actions/ingredient";

const initialState = {
  ingredients: [],
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BURGER_INGREDIENTS_REQUEST:
      return {
        ...state,
      };
    case GET_BURGER_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.ingredients,
      };
    case GET_BURGER_INGREDIENTS_FAILED:
      return {
        ...state,
      };

    default:
      return state;
  }
};
