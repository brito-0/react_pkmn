function Sprites({ sprites }) 
{
    const spritesComp = () => 
    {
        if (sprites === null || sprites === undefined) return null;

        // console.log(sprites);
        // console.log(Object.keys(sprites));
        return Object.keys(sprites).map((k) => 
        {
            if (typeof sprites[k] !== 'string') return;
            const source = sprites[k];
            // console.log(k, source);
            return <img src={source} alt={k} key={k} />;
        });
    };

    return (
        <>
            {spritesComp()}
            {/* <p>{JSON.stringify(sprites, null, 2)}</p> */}
        </>
    );
}

export default Sprites;
