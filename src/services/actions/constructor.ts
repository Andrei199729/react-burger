import { TIngredient } from "../types/data";

export const BURGER_INGREDIENTS_CONSTRUCTOR: "BURGER_INGREDIENTS_CONSTRUCTOR" =
  "BURGER_INGREDIENTS_CONSTRUCTOR";
export const ADD_CONSTRUCTOR_ITEM: "ADD_CONSTRUCTOR_ITEM" =
  "ADD_CONSTRUCTOR_ITEM";
export const DELETE_CONSTRUCTOR_ITEM: "DELETE_CONSTRUCTOR_ITEM" =
  "DELETE_CONSTRUCTOR_ITEM";
export const UPDATE_CONSTRUCTOR_ITEM: "UPDATE_CONSTRUCTOR_ITEM" =
  "UPDATE_CONSTRUCTOR_ITEM";

export interface IBurgerIngredientsConstructorAction {
  readonly type: typeof BURGER_INGREDIENTS_CONSTRUCTOR;
  readonly payload: TIngredient[];
}
export interface IAddConstructorItemAction {
  readonly type: typeof ADD_CONSTRUCTOR_ITEM;
  readonly ingredient: TIngredient;
}
export interface IDeleteConstructorItemAction {
  readonly type: typeof DELETE_CONSTRUCTOR_ITEM;
  readonly chosenIngredientsClone: TIngredient[];
}
export interface IUpdateConstructorItemAction {
  readonly type: typeof UPDATE_CONSTRUCTOR_ITEM;
  readonly item: any;
}

export const getBurgerIngredientsSuccessAction = (
  chosenIngredientsClone: TIngredient[]
): IDeleteConstructorItemAction => ({
  type: DELETE_CONSTRUCTOR_ITEM,
  chosenIngredientsClone,
});

export const addConstructorItemAction = (
  ingredient: TIngredient
): IAddConstructorItemAction => ({
  type: ADD_CONSTRUCTOR_ITEM,
  ingredient,
});

export type TBurgerIngredientsConstructorAction =
  | IBurgerIngredientsConstructorAction
  | IAddConstructorItemAction
  | IDeleteConstructorItemAction
  | IUpdateConstructorItemAction;
