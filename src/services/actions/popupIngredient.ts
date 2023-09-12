import { TIngredient } from "../types/data";

export const INGREDIENT_DATA_MODAL: "INGREDIENT_DATA_MODAL" =
  "INGREDIENT_DATA_MODAL";
export const DELETE_INGREDIENT_DATA_MODAL: "DELETE_INGREDIENT_DATA_MODAL" =
  "DELETE_INGREDIENT_DATA_MODAL";

export interface IIngredientDataModalAction {
  readonly type: typeof INGREDIENT_DATA_MODAL;
  readonly ingredientsDataModal: TIngredient[];
}

export interface IDeleteIngredientDataModalAction {
  readonly type: typeof DELETE_INGREDIENT_DATA_MODAL;
}

export type TIngredientDataModalAction =
  | IIngredientDataModalAction
  | IDeleteIngredientDataModalAction;
