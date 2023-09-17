import { TBurgerIngredientsConstructorAction } from "../actions/constructor";
import { TBurgerIngredientsAction } from "../actions/ingredient";
import { TIngredientDataModalAction } from "../actions/popupIngredient";
import { TOrderAction } from "../actions/popupOrder";
import { TUserAction } from "../actions/user";
import { TWsConnectionAction } from "../actions/wsAction";
import { rootReducer } from "../reducers/rootReducer";
import { ThunkAction } from "redux-thunk";
import { TWsConnectionProfileAction } from "../actions/wsActionProfile";

type TApplicationActions =
  | TBurgerIngredientsConstructorAction
  | TBurgerIngredientsAction
  | TIngredientDataModalAction
  | TOrderAction
  | TUserAction
  | TWsConnectionAction
  | TWsConnectionProfileAction;

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  unknown,
  RootState,
  TApplicationActions
>;

export type AppDispatch<TReturnType = void> = (
  action: TApplicationActions | AppThunk<TReturnType>
) => TReturnType;
