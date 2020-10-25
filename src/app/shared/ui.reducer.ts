import { createReducer, on } from "@ngrx/store";
import { isLoading, stopLoading } from "./ui.actions";

export interface State {
  isLoading: boolean;
}

export const initialState: State = {
  isLoading: false,
};

const _UIReducer = createReducer(
  initialState,

  on(isLoading, (state) => ({ ...state, isLoading: true })),
  on(stopLoading, (state) => ({ ...state, isLoading: false }))
);

export function UIReducer(state, action) {
  return _UIReducer(state, action);
}
