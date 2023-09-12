import api from "../../utils/api";
import { AppDispatch } from "../types";
import { TIngredient } from "../types/data";

export const GET_BURGER_INGREDIENTS_SUCCESS: "GET_BURGER_INGREDIENTS_SUCCESS" =
  "GET_BURGER_INGREDIENTS_SUCCESS";
export const GET_BURGER_INGREDIENTS_REQUEST: "GET_BURGER_INGREDIENTS_REQUEST" =
  "GET_BURGER_INGREDIENTS_REQUEST";
export const GET_BURGER_INGREDIENTS_FAILED: "GET_BURGER_INGREDIENTS_FAILED" =
  "GET_BURGER_INGREDIENTS_FAILED";

export interface IGetBurgerIngredientsSuccessAction {
  readonly type: typeof GET_BURGER_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
  readonly preloader: boolean;
}

export interface IGetBurgerIngredientsRequestAction {
  readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST;
  readonly preloader: boolean;
}

export interface IGetBurgerIngredientsFailedAction {
  readonly type: typeof GET_BURGER_INGREDIENTS_FAILED;
  readonly preloader: boolean;
}

export type TBurgerIngredientsAction =
  | IGetBurgerIngredientsSuccessAction
  | IGetBurgerIngredientsRequestAction
  | IGetBurgerIngredientsFailedAction;

export const getBurgerIngredientsSuccessAction = (
  ingredients: TIngredient[],
  preloader: boolean
): IGetBurgerIngredientsSuccessAction => ({
  type: GET_BURGER_INGREDIENTS_SUCCESS,
  ingredients,
  preloader,
});

export const getBurgerIngredientsRequestAction = (
  preloader: boolean
): IGetBurgerIngredientsRequestAction => ({
  type: GET_BURGER_INGREDIENTS_REQUEST,
  preloader,
});

export const getBurgerIngredientsFailedAction = (
  preloader: boolean
): IGetBurgerIngredientsFailedAction => ({
  type: GET_BURGER_INGREDIENTS_FAILED,
  preloader,
});

export function getIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch(getBurgerIngredientsRequestAction(true));
    api
      .getInitialIngredients()
      .then((res) => {
        dispatch(getBurgerIngredientsSuccessAction(res.data, false));
      })
      .catch((err) => dispatch(getBurgerIngredientsFailedAction(false)));
  };
}
