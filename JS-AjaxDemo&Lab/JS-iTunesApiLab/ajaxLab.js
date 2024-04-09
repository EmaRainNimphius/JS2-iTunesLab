function submitForm(){

    let userInput = document.getElementById("artist").value;

    const params = {
        term: userInput,
        entity: 'song',
        limit: 10,
    }

    const params2 = {
        id: '',
        entity: album,
        limit: 10,
    }


    $.get(
        'https://itunes.apple.com/search' || 'https://itunes.apple.com/lookup',
        params || params2,
        function (data){
            console.log('results', data);
            let savedId = 0;
            for(let item of data.results){
                // did to upper so that it's not case-sensitive and will display
                if(item.artistName.toUpperCase() === userInput.toUpperCase()){
                    $('#artistName').append(`
                    <h3>${'10 Songs By: &nbsp;&nbsp;' + userInput} </h3>
                    <hr>
                `)
                    savedId = item.artistId
                    console.log('Artist Id: ', savedId);
                    break;
                }
            }




            // // creating and adding collection names to array
            // var itemList = [];
            // for( item of data.results){
            //     if( item.artistName.toUpperCase() === userInput.toUpperCase()){
            //         itemList.push(item.collectionName);
            //     }
            // }
            //
            // // getting unique items
            // var unique = itemList.filter((value, index, array) => array.indexOf(value) === index);
            // console.log('unique display', unique)
            // // displaying array
            // let count = 1;
            // for (var i = 0; i < unique.length; i++) {
            //     $('#artistAlbums').append(`
            //     <p>${ count + '&nbsp;|&nbsp;&nbsp;&nbsp;' + unique[i] }</p>
            // `)
            //     count++;
            // }

        },
        'json'
    );
};