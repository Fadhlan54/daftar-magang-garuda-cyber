import { useContext } from "react";
import {
  TotalPriceContext,
  TotalPriceDispatchContext,
} from "../context/TotalPriceContext";

export function useTotalPrice() {
  return useContext(TotalPriceContext);
}

export function useTotalPriceDispatch() {
  return useContext(TotalPriceDispatchContext);
}
