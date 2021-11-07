
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

  renderCat(defaultDNA)
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
    decorationSidesColor(colors[dna.decorationSidescolor], dna.decorationSidescolor)
    $('#bodycolor').val(dna.headcolor)
    $('#mouthcolor').val(dna.mouthColor)
    $('#eyescolor').val(dna.eyesColor)
    $('#earscolor').val(dna.earsColor)
    $('#eyeshape').val(dna.eyesShape)
    $('#decoration').val(dna.decorationPattern)
    $('#decorationMidColor').val(dna.decorationMidcolor)
    $('#decorationSidesColor').val(dna.decorationSidescolor)
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
