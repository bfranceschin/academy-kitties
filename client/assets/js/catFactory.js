
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code) {
    $('.cat__head, .cat__chest').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function mouthColor (color, code) {
    $('.cat__mouth-contour').css('background', '#' + color)  //This changes the color of the cat
    $('.cat__chest_inner').css('background', '#' + color)  //This changes the color of the cat
    $('#mouthcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnamouth').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function eyesColor (color, code) {
    $('.cat__eye span').css('background', '#' + color)  //This changes the color of the cat
    $('#eyescode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaeyes').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function earsColor (color, code) {
    $('.cat__ear--left, .cat__ear--right').css('background', '#' + color)  //This changes the color of the cat
    $('.cat__paw-left, .cat__paw-right').css('background', '#' + color)  //This changes the color of the cat
    $('.cat__tail').css('background', '#' + color)  //This changes the color of the cat
    $('.cat__paw-right_inner').css('background', '#' + color)  //This changes the color of the cat
    $('.cat__paw-left_inner').css('background', '#' + color)  //This changes the color of the cat
    $('#earscode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnaears').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function decorationMidColor(color, code) {
    $('#decorationMidColorCode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnadecorationMid').html(code) //This updates the body color part of the DNA that is displayed below the cat
    $('.cat__head-dots').css('background', '#' + color)  //This changes the color of the cat
}

function decorationSidesColor(color, code) {
    $('#decorationSidesColorCode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnadecorationSides').html(code) //This updates the body color part of the DNA that is displayed below the cat
    $('.cat__head-dots_first').css('background', '#' + color)  //This changes the color of the cat
    $('.cat__head-dots_second').css('background', '#' + color)  //This changes the color of the cat
}

//###################################################
//Functions below will be used later on in the project
//###################################################
function eyeVariation(num) {

    $('#dnashape').html(num)
    $('#eyeShapeCode').html('code: '+num)
    switch (num) {
        case 1:
            eyes1()
            break
        case 2:
            eyes1()
            eyes2()
            break
        case 3:
            eyes1()
            eyes3()
            break
    }
}

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    $('#decorationcode').html('code: '+num)
    switch (num) {
        case 1:
            decoration(0, 0, 0)
            break
        case 2:
            decoration(0, 45, -45)
            break
        case 3:
            decoration(45, 0, 0)
            break
    }
}

async function eyes1 () {
    await $('.cat__eye').find('span').css('border', 'none')
}

async function eyes2 () {
    await $('.cat__eye').find('span').css('border-top', '15px solid')
}

async function eyes3 () {
    await $('.cat__eye').find('span').css('border-bottom', '15px solid')
}

async function decoration(mid, left, right) {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    let midRotation = "rotate("+mid+"deg)"
    let leftRotation = "rotate("+left+"deg)"
    let rightRotation = "rotate("+right+"deg)"
    $('.cat__head-dots').css({ "transform": midRotation, "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": leftRotation, "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": rightRotation, "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })

    // $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    // $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    // $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

function animation (num) {
    $('#dnaanimation').html(num)
    $('#animationCode').html('code: '+num)
    num = num - 1
    let items = ["#head", "#tail"]
    let animationClass = "moving"
    console.log("item", items[num], animationClass)
    items.forEach((i) => {$(i).removeClass(animationClass)})
    if (num < items.length){
        $(items[num]).addClass(animationClass)
    }
}
