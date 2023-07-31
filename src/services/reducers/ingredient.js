import {
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_FAILED,
} from "../actions/ingredient";

const initialState = {
  ingredients: [],
  preloader: false,
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BURGER_INGREDIENTS_REQUEST:
      return {
        ...state,
        preloader: true,
      };
    case GET_BURGER_INGREDIENTS_SUCCESS:
      console.log("success");
      return {
        ...state,
        ingredients: action.ingredients,
      };
    case GET_BURGER_INGREDIENTS_FAILED:
      console.log("failed");
      return {
        ...state,
        preloader: false,
      };

    default:
      return state;
  }
};
