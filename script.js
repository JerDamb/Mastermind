$(document).ready(function () { //se lance une fois que le document est "ready", après le CSS et le HTML

    //initialisation des variales
    let bGround = 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box'

    const colorsGuess = $('.colors-guess')
    let selectedColor = ''
    let colorsArray = []
    let guess = 0



    for (let i = 9; i >= 0; i--) {
        colorsArray.push(colorsGuess[i])
    }

    //lorsque l'on clique sur le bouton avec la classe .validate, toutes les classes .actives sur des éléments sont retirées
    $('.validate').click(function () {
        $('.active').removeClass('active')
        guess++
        for (let i = 0; i < 4; i++) {
            $(`#c-${guess}-${i}`).addClass('active')
        }
    })


    //**************************** RECUPERATION DES COULEURS DES CHOIX ****************************//
    $('.choices').click(function () {
        // $('.selection-container').css('background-color', 'red')
        let peg = ($(this).parent())[0] //récupération de la div parent (le 0 c'est pour récupérer la div et non l'objet) 
        selectedColor = $(this).css('background-color') //selectedColor récupère la valeur en background-color de choices
        $(peg).css('background-color', selectedColor) //on assigne le selectedColor au background de la div récupérée avec peg
    })

    //parcours les divs .colors-guess et les met dans un tableau colorsArray

    //on parcours l'ensemble des 10 lignes grace au colorsArray, on passe ensuite dans l'ensemble des class .color de ces 10 lignes, 4 par 4 et on leur attribut la valeur de i et de j pour chaque afin de générer des coordonnées de cellules
    for (let i = 0; i < 10; i++) {
        let guessColorsArray = colorsArray[i].getElementsByClassName('color') //en javascript pure sinon par défaut en jquery la class va être récupéré dans le "document"
        for (let j = 0; j < 4; j++) {
            $(guessColorsArray[j]).attr('id', `c-${i}-${j}`) //on donne un id c-[i]-[j] pour chaque élément j parcourus
        }
    }

    //tout les divs avec des classes .active vont récupérer le background-color de selectedColor
    $('.color').click(function () {
        if($(this).hasClass('active')){
            let number = parseInt($(this).css('border'))
            if (number === 0) {
                $(this).css('background', 'none')
                $(this).css('background-color', selectedColor)
                $(this).css('border', '2px solid white')
            } else {
                $(this).css('background', bGround)
                $(this).css('border', '0px solid white')
            }
        }
    })
})