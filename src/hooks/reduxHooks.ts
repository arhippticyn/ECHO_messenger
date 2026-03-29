import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";

export const useTypificatedSelector: TypedUseSelectorHook<RootState> =
  useSelector;
export const useTypificatedDispatch = () => useDispatch<AppDispatch>();
