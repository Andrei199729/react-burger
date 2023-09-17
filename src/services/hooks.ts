import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from "react-redux";
import { AppDispatch, RootState } from "./types/index";
import type {} from "redux-thunk/extend-redux";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch: () => AppDispatch = dispatchHook;
