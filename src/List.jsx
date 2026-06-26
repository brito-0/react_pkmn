import { useContext, useEffect, useState } from "react";
import { AppContext } from "./App";
import Failed from "./Failed";
import Link from "./router/Link";

function List()
{
    const { data, fetcher } = useContext(AppContext);
    const [state, setState] = useState(false);

    useEffect(() => 
    {
        const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
        fetcher(url, true);

        setTimeout(() =>
        {
            setState(true);
        }, 300);
    }, []);

    const handleFetch = (url) => 
    {
        fetcher(url, true);
    };

    const listComp = () =>
    {
        if (!data) 
        {
            return (
                <>
                    <p>loading...</p>
                </>
            );
        }

        if ((typeof data) === 'number')
        {
            return Failed();
        }



        console.log(data?.previous, data?.next);



        return data?.results.map((p) =>
            <div key={p?.name}><Link key={p?.name} href={'/pokemon'} handleFetch={handleFetch} pURL={p?.url}>{p?.name}</Link></div>);
    };

    const replaceCharAt = (str, i, ch) => 
    {
        if (i >= str.length) return str;
        return str.substring(0, i) + ch + str.substring(i + 1);
    };

    const fixUrl = (url) => 
    {
        const n = url.length;
        if (n !== 54) return url;

        const p1 = n - 11, p2 = n - 2;
        return url.substring(0, p1) + (url[p1] - 1) + url.substring(p1 + 1, p2) + '2' + url.substring(p2 + 1);
    };

    const handlePrev = () => 
    {
        let url = data?.previous;

        // if (url.at(-2) === '1')
        //     url = replaceCharAt(url, url.length - 2, '2');

        if (url.at(-2) === '1')
            url = fixUrl(url);

        fetcher(url, true);

        // fetcher(data?.previous, true);
    };
    const handleNext = () => fetcher(data?.next, true);

    if (state)
    {
        return (
            <>
                {/* <h2>list</h2> */}
                {listComp()}
                {data?.previous && <button type='button' onClick={handlePrev}>prev</button>}
                {data?.next && <button type='button' onClick={handleNext}>next</button >}
            </>
        );
    }
}

export default List;
