import { useContext, useRef } from "react";
import { AppContext } from "./App";
import { BrowserContext } from "./router/BrowserRouter";

function Search()
{
    const { fetcher } = useContext(AppContext);
    const { setCurrURL } = useContext(BrowserContext);
    const inputRef = useRef(null);

    const handleClick = () => 
    {
        const name = inputRef.current.value.toLowerCase();
        if (name == '' || !(/[a-zA-z0-9]+$/i.test(name))) return;

        const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

        fetcher(url);

        inputRef.current.value = '';

        window.history.pushState({}, '', '/pokemon');
        setCurrURL(new URL(window.location.origin + '/pokemon'));
    };

    const handleKeyDown = (e) =>
    {
        if (e.key !== 'Enter') return;

        handleClick();
    };

    return (
        <>
            {/* <h2>search</h2> */}
            <div>
                <input type='text' ref={inputRef} placeholder="name/id" autoFocus onKeyDown={handleKeyDown} />
            </div>
            <button type='button' onClick={handleClick}>search</button>
        </>
    );
}

export default Search;
