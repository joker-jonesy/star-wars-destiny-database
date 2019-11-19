function returnSets(){
    let sets=[];

    fetch("https://swdestinydb.com/api/public/sets/")
        .then(response => {
            return response.json();
        })
        .then((data) => {
            data.map((itm)=>{
                return sets.push(itm.name);
            });
            return sets;

        }).catch(function () {
        console.log("error loading sets");
    });

    return sets;
}

export const Sort = [

    {
      name: "Affiliations",
      type: "affiliation_code",
        values:["hero", "villain", "neutral"]
    },
    {
        name: "Colors",
        type: "faction_code",
        values:["red", "blue", "yellow", "gray"]
    },
    {
        name: "Rarity",
        type: "rarity_name",
        values:["Starter", "Common", "Uncommon", "Rare", "Legendary"]
    },
    {
        name:"Health",
        type:"health",
        values:[4,5,6,7,8,9,10,11,12,13,15]
    },
    {
        name:"Cost",
        type:"cost",
        values:[0,1,2,3,4,5,6]
    },
    {
        name:"Set",
        type:"set_name",
        values:returnSets()},
    {
        name:"Points",
        type:"points",
        values:["4","5","6","7","8","9","10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
    },
    {
        name:"Type",
        type:"type_code",
        values:["character", "upgrade", "support", "event", "downgrade", "plot"]
    }

];