// function Stats({ stats }) 
// {
//     const statsComp = () => 
//     {
//         return stats?.map((s) => 
//         {
//             const name = s.stat.name;
//             const value = s.base_stat;
//             // return <p key={name}>{name}: {value}</p>;

//             const str = `${name}: ${value}`;
//             return <p key={name}>{str}</p>;
//         });
//     };

//     return (
//         <>
//             {statsComp()}
//             {/* <p>{JSON.stringify(stats, null, 2)}</p> */}
//         </>
//     );
// }

// export default Stats;



import './Stats.css';

function Stats({ stats }) 
{
    const statsComp = () => 
    {
        const names = [], values = [];
        stats?.map((s) => 
        {
            const name = s.stat.name;
            const value = s.base_stat;

            /*const str = `${name}: ${value}`;
            return <p key={name}>{str}</p>;*/


            names.push(name);
            values.push(value);
        });

        const namesComp = () => 
        {
            return names.map((x) => 
            {
                return <p key={x}>{x}</p>;
            });
        };

        const valuesComp = () => 
        {
            // let i = 0;
            return values.map((x, i) => 
            {
                const key = `${names[i]}_value`;
                return <p key={key}>{x}</p>;
            });
        };

        return (
            <>
                <div id='stats_names'>
                    {namesComp()}
                </div>
                <div id='stats_values'>
                    {valuesComp()}
                </div>
            </>
        );
    };

    return (
        <>
            {statsComp()}
            {/* <p>{JSON.stringify(stats, null, 2)}</p> */}
        </>
    );
}

export default Stats;
