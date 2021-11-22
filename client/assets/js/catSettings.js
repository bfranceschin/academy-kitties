
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 10,
    "mouthColor" : 13,
    "eyesColor" : 96,
    "earsColor" : 10,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 13,
    "decorationSidescolor" : 13,
    "animation" :  1,
    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor)
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)
  defaultCat()
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}


function renderCat(dna){
    headColor(colors[dna.headcolor],dna.headcolor)
    mouthColor(colors[dna.mouthColor],dna.mouthColor)
    eyesColor(colors[dna.eyesColor],dna.eyesColor)
    earsColor(colors[dna.earsColor],dna.earsColor)
    eyeVariation(dna.eyesShape)
    decorationVariation(dna.decorationPattern)
    decorationMidColor(colors[dna.decorationMidcolor],dna.decorationMidcolor)
    decorationSidesColor(colors[dna.decorationSidescolor], dna.decorationSidescolor)
    animation(dna.animation)
    $('#bodycolor').val(dna.headcolor)
    $('#mouthcolor').val(dna.mouthColor)
    $('#eyescolor').val(dna.eyesColor)
    $('#earscolor').val(dna.earsColor)
    $('#eyeshape').val(dna.eyesShape)
    $('#decoration').val(dna.decorationPattern)
    $('#decorationMidColor').val(dna.decorationMidcolor)
    $('#decorationSidesColor').val(dna.decorationSidescolor)
    $('#animation').val(dna.animation)
    
}

function defaultCat (){
  renderCat(defaultDNA)
}

function randomCat () {
    let randomColorCode = () => Math.round(1 + Math.random()* 97)
    let randomDna = {
        "headcolor" : Math.round(10 + Math.random() * 87),
        "mouthColor" : randomColorCode(),
        "eyesColor" : randomColorCode(),
        "earsColor" : randomColorCode(),
        //Cattributes
        "eyesShape" : Math.round(1 + Math.random() * 2),
        "decorationPattern" : Math.round(1 + Math.random() * 2),
        "decorationMidcolor" : randomColorCode(),
        "decorationSidescolor" : randomColorCode(),
        "animation" :  Math.round(1 + Math.random() * 2),
        "lastNum" :  1 
    }
    renderCat(randomDna)
}

function createKitty () {

    // instance.once('Birth', {
    //     //filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    //     fromBlock: 0
    // }, function(error, event){ 
    //     console.log("No create Kitty")
    //     console.log(event); 
    // });

    instance.methods.createKittyGen0(getDna()).send({}, function (error, txHash){
        if (error)
            //alert(error)
            console.log(error)
        else {
            //alert("transaction hash: " + txHash)
            console.log("transaction hash: " + txHash)
        }
    })
    
}

// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    console.log("#bodycolor colorVal", colorVal)
    headColor(colors[colorVal],colorVal)
})

$('#mouthcolor').change(()=>{
    var colorVal = $('#mouthcolor').val()
    console.log("colorVal", colorVal)
    mouthColor(colors[colorVal],colorVal)
})

$('#eyescolor').change(()=>{
    var colorVal = $('#eyescolor').val()
    console.log("colorVal", colorVal)
    eyesColor(colors[colorVal],colorVal)
})

$('#earscolor').change(()=>{
    var colorVal = $('#earscolor').val()
    console.log("colorVal", colorVal)
    earsColor(colors[colorVal],colorVal)
})

$('#eyeshape').change(()=>{
    var code = $('#eyeshape').val()
    console.log("code", code)
    eyeVariation(parseInt(code))
})

$('#decoration').change(()=>{
    var code = $('#decoration').val()
    console.log("code", code)
    decorationVariation(parseInt(code))
})

$('#decorationMidColor').change(()=>{
    var colorVal = $('#decorationMidColor').val()
    console.log("colorVal", colorVal)
    decorationMidColor(colors[colorVal],colorVal)
})

$('#decorationSidesColor').change(()=>{
    var colorVal = $('#decorationSidesColor').val()
    console.log("colorVal", colorVal)
    decorationSidesColor(colors[colorVal],colorVal)
})

$('#animation').change(()=>{
    var code = $('#animation').val()
    console.log("code", code)
    animation(parseInt(code))
})