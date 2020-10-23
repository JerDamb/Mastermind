$(document).ready(function () { //wait until html and css is loaded

    let selectedColor = ''

    $('.choices').click(function () {
        // $('.selection-container').css('background-color', 'red')
        let peg = ($(this).parent())[0] //récupération de la div parent (le 0 c'est pour récupérer la div et non l'objet) 
        selectedColor = $(this).css('background-color')
        $(peg).css('background-color', selectedColor)
    })

    $('.active').click(function () {
        $(this).css('background-color', selectedColor)
    })

    

})