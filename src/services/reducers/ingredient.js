import {
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_FAILED,
  BURGER_INGREDIENTS_CONSTRUCTOR,
  INGREDIENT_DATA_MODAL,
  DELETE_INGREDIENT_DATA_MODAL,
  POST_ORDER_DETAILS_REQUEST,
  POST_ORDER_DETAILS_SUCCESS,
  POST_ORDER_DETAILS_FAILED,
  ADD_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
} from "../actions/ingredient";

const initialState = {
  ingredients: [],
  ingredientsConstructor: [],
  ingredientsDataModal: [],
  createdOrder: [],
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

    case BURGER_INGREDIENTS_CONSTRUCTOR:
      return {
        ...state,
        ingredientsConstructor: action,
      };

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

    case POST_ORDER_DETAILS_REQUEST:
      return {
        ...state,
      };

    case POST_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        createdOrder: action,
      };

    case POST_ORDER_DETAILS_FAILED:
      return {
        ...state,
      };
    case ADD_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        ingredientsConstructor: [
          ...state.ingredientsConstructor,
          action.ingredient,
        ],
      };
    }
    case DELETE_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        ingredientsConstructor: state.ingredientsConstructor.filter((item) => {
          console.log(item, action.id);
          return item._id !== action.id;
        }),
      };
    }
    default:
      return state;
  }
};
