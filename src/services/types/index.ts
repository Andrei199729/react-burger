import { Action, ActionCreator } from "redux";
import { TBurgerIngredientsConstructorAction } from "../actions/constructor";
import { TBurgerIngredientsAction } from "../actions/ingredient";
import { TIngredientDataModalAction } from "../actions/popupIngredient";
import { TOrderAction } from "../actions/popupOrder";
import { TUserAction } from "../actions/user";
import { TWsConnectionAction } from "../actions/wsAction";
import { TWsConnectionProfileAction } from "../actions/wsActionProfile";
import { rootReducer } from "../reducers/rootReducer";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

type TApplicationActions =
  | TBurgerIngredientsConstructorAction
  | TBurgerIngredientsAction
  | TIngredientDataModalAction
  | TOrderAction
  | TUserAction
  | TWsConnectionAction
  | TWsConnectionProfileAction;

export type RootState = ReturnType<typeof rootReducer>;
// export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
