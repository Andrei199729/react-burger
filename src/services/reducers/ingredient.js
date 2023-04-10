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
  UPDATE_CONSTRUCTOR_ITEM,
} from "../actions/ingredient";

const initialState = {
  ingredients: [],
  ingredientsConstructor: [],
  ingredientsDataModal: [],
  createdOrder: undefined || null,
  bun: null || undefined,
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
        createdOrder: action.order,
      };

    case POST_ORDER_DETAILS_FAILED:
      return {
        ...state,
      };
    case ADD_CONSTRUCTOR_ITEM: {
      if (action.ingredient.type === "bun") {
        return {
          ...state,
          bun: action.ingredient,
        };
      }
      return {
        ...state,
        ingredientsConstructor: [
          ...state.ingredientsConstructor,
          action.ingredient,
        ],
      };
    }

    case UPDATE_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        ingredientsConstructor: action.item,
      };
    }

    case DELETE_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        ingredientsConstructor: action.chosenIngredientsClone.filter((item) => {
          return item._id;
        }),
      };
    }
    default:
      return state;
  }
};
