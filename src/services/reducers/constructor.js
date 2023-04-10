import {
  BURGER_INGREDIENTS_CONSTRUCTOR,
  ADD_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  UPDATE_CONSTRUCTOR_ITEM,
} from "../actions/constructor";

const initialState = {
  ingredientsConstructor: [],
  bun: null || undefined,
};
export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case BURGER_INGREDIENTS_CONSTRUCTOR:
      return {
        ...state,
        ingredientsConstructor: action,
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
