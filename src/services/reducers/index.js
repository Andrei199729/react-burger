import { combineReducers } from "redux";
import { ingredientReducer } from "./ingredient";
export const rootReducer = combineReducers({ ingredients: ingredientReducer });
