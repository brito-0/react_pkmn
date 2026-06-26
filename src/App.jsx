import { createContext } from "react";

import BrowserRouter from "./router/BrowserRouter";
import Route from "./router/Route";
import NavBar from "./NavBar";
import Search from "./Search";
import List from "./List";
import Pokemon from "./pokemon/Pokemon";
import useFetch from "./useFetch";

import ForsenGif from './assets/forsen.gif';

const AppContext = createContext();
const AltContext = createContext();

function App()
{
  const { data, fetcher, dataAlt, fetcherAlt } = useFetch();

  return (
    <>
      <BrowserRouter>
        <NavBar paths={['/', '/search', '/list']} />
        <Route path={'/'}>
          {/* <h2>home</h2> */}
          <img src={ForsenGif} alt='forsen' style={{ margin: '50px' }} />
        </Route>
        <Route path={'/404'}>
          <h2>404</h2>
        </Route>
        <AppContext.Provider value={{ data, fetcher }}>
          <Route path={'/search'}>
            <Search />
          </Route>
          <Route path={'/list'}>
            <List />
          </Route>
          {/* <Route path={'/pokemon/'} > */}
          <AltContext.Provider value={{ dataAlt, fetcherAlt }}>
            <Route regex={/^\/pokemon\/?[a-zA-Z0-9]{0,9}$/g}>
              {/* <Route regex={'/pokemon'}> */}
              <Pokemon />
            </Route>
          </AltContext.Provider>
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
export { AppContext, AltContext };
