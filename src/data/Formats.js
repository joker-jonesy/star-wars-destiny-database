function returnFormats(){
    let formats=[];

    fetch("https://swdestinydb.com/api/public/formats/")
        .then(response => {
            return response.json();
        })
        .then((data) => {
            data.map((itm)=>{
                return formats.push(itm);
            });
            return formats;

        }).catch(function () {
        console.log("error loading sets");
    });

    return formats;
}

export const formats =  returnFormats();