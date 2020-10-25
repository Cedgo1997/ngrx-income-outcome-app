import { createReducer, on } from "@ngrx/store";
import { Usuario } from "../models/usuario.model";
import { setUser, unsetUser } from "./auth.actions";

export interface State {
  usuario: Usuario;
}

export const initialState: State = {
  usuario: null,
};

const _authReducer = createReducer(
  initialState,

  on(setUser, (state, { usuario }) => ({ ...state, usuario: { ...usuario } })),
  on(unsetUser, (state) => ({ ...state, usuario: null }))
);

export function authReducer(state, action) {
  return _authReducer(state, action);
}
