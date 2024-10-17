// import { User } from "auth/models";
import { createContext, useState } from "react";
import { User } from "src/auth/models";
import { getFromLocalStorage } from "src/utils/function";

interface IAppContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
}
const InittialValue: IAppContext = {
  isAuthenticated: Boolean(getFromLocalStorage("access_token")),
  setIsAuthenticated: () => null,
  profile: null,
  setProfile: () => null
};
export const AppContext = createContext<IAppContext>(InittialValue);

function AppProvide({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(InittialValue.isAuthenticated);
  const [profile, setProfile] = useState<User | null>(InittialValue.profile);

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvide;
