// function Cries({ cries, name }) 
// {
//     const criesComp = () => 
//     {
//         if (cries === null || cries === undefined) return null;

//         return Object.keys(cries).map((k) => 
//         {
//             if (typeof cries[k] !== 'string') return null;
//             const source = cries[k];
//             const audioKey = `${k}_${name}`;
//             // console.log(k, source);
//             return (
//                 <audio controls key={audioKey}>
//                     <source src={source} type='audio/ogg' />
//                     your browser does not support the audio element
//                 </audio>
//             );
//         });
//     };

//     return (
//         <>
//             {criesComp()}
//             {/* <p>{JSON.stringify(cries, null, 2)}</p> */}
//         </>
//     );
// }

// export default Cries;





function Cries({ cries, name }) 
{
    const criesComp = () => 
    {
        if (cries === null || cries === undefined) return null;

        return Object.keys(cries).map((k) => 
        {
            if (typeof cries[k] !== 'string') return null;
            const source = cries[k];
            const audioKey = `${k}_${name}`;
            const divKey = `${k}_div_${name}`;
            // console.log(k, source);
            return (
                <div key={divKey} style={{ float: 'left', marginLeft: '5px' }}>
                    <audio controls key={audioKey}>
                        <source src={source} type='audio/ogg' />
                        your browser does not support the audio element
                    </audio>
                    <p key={k} style={{ marginTop: '0px' }}>{k}</p>
                </div>
            );
        });
    };

    return (
        <>
            {criesComp()}
            {/* <p>{JSON.stringify(cries, null, 2)}</p> */}
        </>
    );
}

export default Cries;
