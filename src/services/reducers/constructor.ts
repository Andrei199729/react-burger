import {
  BURGER_INGREDIENTS_CONSTRUCTOR,
  ADD_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  UPDATE_CONSTRUCTOR_ITEM,
  TBurgerIngredientsConstructorAction,
} from "../actions/constructor";
import { TIngredient } from "../types/data";

type TIngredientsConstructorState = {
  ingredientsConstructor: ReadonlyArray<TIngredient>;
  bun: TIngredient | null | undefined;
};

const initialState: TIngredientsConstructorState = {
  ingredientsConstructor: [],
  bun: null || undefined,
};
export const constructorReducer = (
  state = initialState,
  action: TBurgerIngredientsConstructorAction
): TIngredientsConstructorState => {
  switch (action.type) {
    case BURGER_INGREDIENTS_CONSTRUCTOR:
      return {
        ...state,
        ingredientsConstructor: action.payload,
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
        ingredientsConstructor: action.chosenIngredientsClone.filter(
          (item: any) => {
            return item._id;
          }
        ),
      };
    }
    default:
      return state;
  }
};
