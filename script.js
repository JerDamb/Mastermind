$(document).ready(function () { //se lance une fois que le document est "ready", après le CSS et le HTML

    //initialisation des variales
    let bGround = 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box'

    const colorsGuess = $('.colors-guess')
    let selectedColor = ''
    let colorsArray = []
    let guess = 0
    let mAnswer = masterAnswer()
    $('.validate').hide()
    let clickCount = 0
    isSelected = false
    masterGuessArray = [[-1, -1, -1, -1],
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1],
                        [-1, -1, -1, -1]]


    for (let i = 9; i >= 0; i--) {
        colorsArray.push(colorsGuess[i])
    }

    //lorsque l'on clique sur le bouton avec la classe .validate, toutes les classes .actives sur des éléments sont retirées
    $('.validate').click(function () {
        $('.active').removeClass('active')
        let gradeArray = getGrade()
        console.log(gradeArray)
        console.log(mAnswer)
        guess++
        for (let i = 0; i < 4; i++) {
            $(`#c-${guess}-${i}`).addClass('active')
        }
        $(this).hide()
    })


    //**************************** RECUPERATION DES COULEURS DES CHOIX ****************************//
    $('.choices').click(function () {
        isSelected = true
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
        if (isSelected) {
            if ($(this).hasClass('active')) {
                let number = parseInt($(this).css('border'))
                if (number === 1) {
                    $(this).css('background', 'none')
                    $(this).css('background-color', selectedColor)
                    $(this).css('border', '2px solid white')
                    let coord = $(this).attr('id')
                    updateMasterArray(selectedColor, coord)
                    clickCount++
                    if (clickCount === 4) {
                        $('.validate').show()
                        clickCount = 0
                    }
                } else {
                    $(this).css('background', bGround)
                    $(this).css('border', '1px solid rgb(139, 139, 139)')
                    // updateMasterArray(selectedColor, coord)
                    clickCount--
                }
            }
        }
    })

    function masterAnswer(){
        let masterArray = []
            for(let i = 0; i < 4; i++){
                masterArray.push(Math.floor(Math.random() * 6))
            }
        return masterArray
    }

    function updateMasterArray(color, coor){
        let Array = coor.split('-')
        let x = Array[1]
        let y = Array[2]
        masterGuessArray[x][y] = makeColorANumber(color)
    }

    function makeColorANumber(color){
        if(color == 'rgb(0, 162, 255)'){ return 0 }
        if(color == 'rgb(255, 0, 0)'){ return 1 }
        if(color == 'rgb(238, 255, 0)'){ return 2 }
        if(color == 'rgb(0, 255, 21)'){ return 3 }
        if(color == 'rgb(255, 0, 170)'){ return 4 }
        if(color == 'rgb(0, 0, 0)'){ return 5 }
    }

    function getGrade(){
        let gradeArray = []
        let bArray = []
        for(let i = 0; i<4; i++){
            bArray.push(mAnswer[i])
        }

        // test des noirs
        for(let i = 0; i<4; i++){
            if(masterGuessArray[guess][i] === bArray[i]){
                gradeArray.push(1)
                bArray[i] = -1
                masterGuessArray[guess][i] = -2
            }
        }
        
        //test des blancs
        for (let i = 0; i<4; i++){
            for (let j = 0; j<4; j++){
                if(masterGuessArray[guess][i] === bArray[j]){
                    gradeArray.push(2)
                    bArray[j] = -1
                    masterGuessArray[guess][i] = -2
                }
            }
        }

        return gradeArray
    }
})