import { createContext, useState, useEffect } from "react";


const BrowserContext = createContext();
const routerState = {};

function BrowserRouter({ children }) 
{
    const [currURL, setCurrURL] = useState(new URL(window.location.href));

    useEffect(() => 
    {
        const handlePopStateEvent = (e) => 
        {
            // console.log(e);
            setCurrURL(new URL(window.location.href));
        };

        window.addEventListener('popstate', handlePopStateEvent);

        return () => window.removeEventListener('popstate', handlePopStateEvent);
    }, []);

    return (
        <BrowserContext.Provider value={{ routerState, currURL, setCurrURL }}>
            {children}
        </BrowserContext.Provider>
    );
}

export default BrowserRouter;
export { BrowserContext };


// change to useReducer
