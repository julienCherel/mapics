// retourne les nombres de crime pour chaque catégorie
// entrée : lat et lng : les coordonnées géographique
//        : date : la date du crime en format YYYY-MM (2017-01)
// var : categories : tableau contenant toutes les catégories de crime
//     : crimeArray : tableau contenant les effectifs

function crimeArray(lat, lng, date){

    // récupère les différentes catégories pour une date donnée

    fetch('https://data.police.uk/api/crime-categories?date='+date).then(
        function(response){
            if(response.ok){
                response.json().then(function(data){
                    categories = [];
                    for(i=1;i<data.length;i++){
                        categories.push([data[i].url,data[i].name]);
                    }})}
            else{
                throw new Error("Données non disponible pour cette date");
            }
        })


    // récupère les valeurs de chaque catégorie de crime

    fetch('https://data.police.uk/api/crimes-street/all-crime?lat='+lat+'&lng='+lng+'&date='+date).then(
    function(response){
        if(response.ok){
            response.json().then(function(data){
                var crimeArray = [];
                var total = 0;
                for(c=0;c<categories.length-1;c++){
                    var count = 0;
                    for(i=0;i<data.length;i++){
                        if(data[i].category == categories[c][0]){
                            count++;
                            total++;
                        }
                    }
                    crimeArray.push([categories[c][1],count]);
                }
                crimeArray.push(["Total",total]);
                console.log(crimeArray);
            })
        } else {
            throw new Error("Données non disponible pour cette date et cordonnées");
        }
    })}