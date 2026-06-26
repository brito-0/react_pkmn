import { useContext, useState } from "react";
import { AppContext } from "../App";
import NavBar from "../NavBar";
import Route from "../router/Route";
import Failed from "../Failed";
import Stats from "./Stats";
import '../App.css';
import './Pokemon.css';
import Abilities from "./Abilities";
import Moves from "./Moves";
import Sprites from "./Sprites";
import Cries from "./Cries";


function Pokemon()
{

    const firstId = 1, lastId = 1025, firstAltId = 10001, lastAltId = 10325;



    const { data, fetcher } = useContext(AppContext);

    const [imgState, setImgState] = useState(true);

    // console.log(data, (typeof data));

    const getTypes = () => 
    {
        if (data.types.length == 2)
            return <p>types: {data?.types[0].type.name}, {data?.types[1].type.name}</p>;

        return <p>type: {data?.types[0].type.name}</p>;
    };

    const getTypesValues = () => 
    {
        if (data.types.length == 2)
            return <p>{data?.types[0].type.name}, {data?.types[1].type.name}</p>;

        return <p>{data?.types[0].type.name}</p>;
    };

    const handleFetch = (id) => 
    {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

        fetcher(url);
    };

    const handlePrevClick = () => 
    {
        // const id = data?.id - 1;
        // if (id === firstId - 1) return;


        // let id = data?.id - 1;
        // if (id === firstId - 1) id = lastId;

        let id = data?.id - 1;
        if (id === firstId - 1) id = lastAltId;
        else if (id === firstAltId - 1) id = lastId;

        // console.log(data?.id, id);
        handleFetch(id);
    };
    const handleNextClick = () =>
    {
        // const id = data?.id + 1;
        // if (id === lastId + 1) return;


        // let id = data?.id + 1;
        // if (id === lastId + 1) id = firstId;

        let id = data?.id + 1;
        if (id === lastId + 1) id = firstAltId;
        else if (id === lastAltId + 1) id = firstId;

        // console.log(data?.id, id);
        handleFetch(id);
    };

    const handleImageClick = () => 
    {
        setImgState((prev) => !prev);
    };

    const pokemonComp = () =>
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

        // return (
        //     <>
        //         <h2>pokemon</h2>
        //         <button type='button' onClick={handlePrevClick}>{'<'}</button>
        //         <>
        //             {imgState ?
        //                 <img src={data?.sprites.other['official-artwork'].front_default}
        //                     alt={data?.name} onClick={handleImageClick} /> :
        //                 <img src={data?.sprites.other['official-artwork'].front_shiny}
        //                     alt={data?.name} onClick={handleImageClick} />}
        //         </>
        //         <button type='button' onClick={handleNextClick}>{'>'}</button>
        //         <p>{data?.name}</p>
        //         <p>id: {data?.id}</p>
        //         {getTypes()}
        //         <p>height: {data?.height}</p>
        //         <p>weight: {data?.weight}</p>
        //         {/* <p>{JSON.stringify(data, null, 2)}</p> */}
        //         <NavBar
        //             paths={['/pokemon/stats', '/pokemon/abilities', '/pokemon/moves',
        //                 '/pokemon/sprites', '/pokemon/cries']}
        //         />
        //     </>
        // );


        return (
            <>
                <h2>pokemon</h2>
                <button type='button' onClick={handlePrevClick}>{'<'}</button>
                {/* <button type='button' onClick={handlePrevClick} style={{ visibility: data?.id === firstId ? 'hidden' : 'visible' }}>{'<'}</button> */}
                <>
                    {imgState ?
                        <img src={data?.sprites.other['official-artwork'].front_default}
                            alt={data?.name} onClick={handleImageClick} /> :
                        <img src={data?.sprites.other['official-artwork'].front_shiny}
                            alt={data?.name} onClick={handleImageClick} />}
                </>
                <button type='button' onClick={handleNextClick}>{'>'}</button>
                <div>
                    <p>{data?.name}</p>
                    <div id='base_names'>
                        <p>id</p>
                        <p>type</p>
                        <p>height</p>
                        <p>weight</p>
                    </div>
                    <div id='base_values'>
                        <p>{data?.id}</p>
                        {getTypesValues()}
                        <p>{data?.height}</p>
                        <p>{data?.weight}</p>
                    </div>
                </div>
                {/* <p>{JSON.stringify(data, null, 2)}</p> */}
                <NavBar
                    paths={['/pokemon/stats', '/pokemon/abilities', '/pokemon/moves',
                        '/pokemon/sprites', '/pokemon/cries']}
                />
            </>
        );
    };

    return (
        <>
            {pokemonComp()}
            <Route path={'/pokemon/stats'}>
                {/* <h4>stats</h4> */}
                <Stats stats={data?.stats} />
            </Route>
            <Route path={'/pokemon/abilities'}>
                {/* <h4>abilities</h4> */}
                <Abilities abilities={data?.abilities} />
            </Route>
            <Route path={'/pokemon/moves'}>
                {/* <h4>moves</h4> */}
                <Moves moves={data?.moves} />
            </Route>
            <Route path={'/pokemon/sprites'}>
                {/* <h4>sprites</h4> */}
                <Sprites sprites={data?.sprites} />
            </Route>
            <Route path={'/pokemon/cries'}>
                {/* <h4>cries</h4> */}
                <Cries cries={data?.cries} name={data?.name} />
            </Route>
        </>
    );
}

export default Pokemon;

// display current data and have 2 buttons to go to previous and next
// different tabs with different data being displayed - abilities,sprites,.....
