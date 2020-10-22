$(document).ready(function () { //wait until html and css is loaded

    let selectedColor = ''
    console.log($('.color' [4]));

    $('.choices').click(function () {
        // $('.selection-container').css('background-color', 'red')
        let peg = ($(this).parent())[0] //récupération de la div parent (le 0 c'est pour récupérer la div et non l'objet) 
        selectedColor = $(this).css('background-color')
        $(peg).css('background-color', selectedColor)
    })

    $('.active').click(function () {
        $(this).css('background-color', selectedColor)
    })






    // tests

    let colorArray = new Array()

    $('div.colors-container div.color').each(function () {
        colorArray['' + $(this).attr('id') + ''] = $(this).text();
        colorArray.push($(this).text());
    })

    for (let j = 0; j < $('.colors-container').length; j++) {
        // essayer d'afficher les X elements que je veux du tableau
        $.each(colorArray, function (i) {
            console.log(i);
        })
    }


    for (let i = 0; i < $('.color').length; i++) {
        if ($('.color').length === 4) {
            console.log(('coucou'));
        }
    }
})