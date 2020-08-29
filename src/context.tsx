import React, { useReducer } from "react";

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "login"; displayName?: string }
  | { type: "logout" }
  | { type: "mounted" }
  | { type: "showSnackbar"; successMessage?: string }
  | { type: "hideSnackbar" }
  | { type: "updateProfile"; displayName?: string; phoneNumber?: string };
type Dispatch = (action: Action) => void;
type State = {
  count: number;
  loggedIn: boolean;
  mounted: boolean;
  showSnackbar: boolean;
  successMessage: string;
  displayName: string;
};
type CountProviderProps = { children: React.ReactNode };

const StateContext = React.createContext<State | undefined>(undefined);
const DispatchContext = React.createContext<Dispatch | undefined>(undefined);

function contextReducer(state, action) {
  switch (action.type) {
    case "increment": {
      return { ...state, count: state.count + 1 };
    }
    case "decrement": {
      return { ...state, count: state.count - 1 };
    }
    case "login": {
      return { ...state, loggedIn: true, displayName: action.displayName };
    }
    case "logout": {
      return { ...state, loggedIn: false, displayName: "" };
    }
    case "mounted": {
      return { ...state, mounted: true };
    }
    case "showSnackbar": {
      return {
        ...state,
        showSnackbar: true,
        successMessage: action.successMessage || "Success",
      };
    }
    case "hideSnackbar": {
      return { ...state, showSnackbar: false, successMessage: "" };
    }
    case "updateProfile": {
      return { ...state, displayName: action.displayName || state.displayName };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useContextState() {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error("useContextState must be used within a ContextProvider");
  }
  return context;
}

function useContextDispatch() {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("useContextDispatch must be used within a ContextProvider");
  }
  return context;
}

export default function Context({ children }) {
  const [state, dispatch] = useReducer(contextReducer, {
    count: 0,
    loggedIn: false,
    mounted: false,
    showSnackbar: false,
    successMessage: "",
    displayName: "",
  });
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export { useContextState, useContextDispatch };
