function submitForm(){

    let userInput = document.getElementById("artist").value;

    const params = {
        term: userInput,
        entity: 'song',
        limit: 10,
    }


    $.get(
        'https://itunes.apple.com/search' || 'https://itunes.apple.com/lookup',
        params,
        function (data){
            console.log('results', data);
            for(let item of data.results){
                // did to upper so that it's not case-sensitive and will display
                if(item.artistName.toUpperCase() === userInput.toUpperCase()){
                    $('#artistName').append(`
                    <h3>${'10 Songs By: &nbsp;&nbsp;' + userInput} </h3>
                    <hr>
                `)
                    break;
                }else {
                    $('#artistName').append(`
                        <h3>${'No artists with the name ' + userInput + ' found...'} </h3>
                        <h4>${'So, here are 10 songs with "' + userInput + '" somewhere in the results...'} </h4>
                        <hr>
                `)
                    break;
                }
            }

            // creating and adding collection names to array
            var itemList = [];
            for( item of data.results){
                itemList.push(item.collectionName);
            }

            // getting unique items
            var unique = itemList.filter((value, index, array) => array.indexOf(value) === index);

            // displaying array
            let count = 1;
            for (var i = 0; i < unique.length; i++) {
                $('#artistAlbums').append(`
                <p>${ count + '&nbsp;|&nbsp;&nbsp;&nbsp;' + unique[i] }</p>
            `)
                count++;
            }

        },
        'json'
    );
};