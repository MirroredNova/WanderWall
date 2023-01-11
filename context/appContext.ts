import { createContext } from 'react';

interface AppContextInterface {
  selectedTab: 'home' | 'gyms' | 'travel' | 'about';
}

const initialAppContext: AppContextInterface = {
  selectedTab: 'home',
};

const AppCtx = createContext<AppContextInterface>(initialAppContext);

export { initialAppContext };
export default AppCtx;
