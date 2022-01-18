
var colors = Object.values(allColors())

function getHeadColorCode (catDna) {
  return parseInt(catDna[0] + catDna[1])
}

function getMouthColorCode (catDna) {
  return parseInt(catDna[2] + catDna[3])
}

function getEyesColorCode (catDna) {
  return parseInt(catDna[4] + catDna[5])
}

function getEarsColorCode (catDna) {
  return parseInt(catDna[6] + catDna[7])
}

function getDecorationMidColorCode (catDna) {
  return parseInt(catDna[10] + catDna[11])
}

function getDecorationSidesColorCode (catDna) {
  return parseInt(catDna[12] + catDna[13])
}

function getDecorationCode (catDna) {
  return parseInt(catDna[9])
}

function getAnimationCode (catDna) {
  return parseInt(catDna[14])
}

function getEyeShapeCode (catDna) {
  return parseInt(catDna[8])
}

function decoratrionConfig (catDna) {
  let midAngle
  let leftAngle
  let rightAngle
  let code = getDecorationCode(catDna)
  switch (code) {
    case 1:
      midAngle = 0
      leftAngle = 0
      rightAngle = 0
      break
    case 2:
      midAngle = 0
      leftAngle = 45
      rightAngle = -45
      break
    case 3:
      midAngle = 45
      leftAngle = 0
      rightAngle = 0
      break
  }

  let midRotation = "rotate("+midAngle+"deg)"
  let leftRotation = "rotate("+leftAngle+"deg)"
  let rightRotation = "rotate("+rightAngle+"deg)"
  $(`#${catDna}midDot`).css({ "transform": midRotation, "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
  $(`#${catDna}leftDot`).css({ "transform": leftRotation, "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
  $(`#${catDna}rightDot`).css({ "transform": rightRotation, "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

function animationConfig (catDna) {
  let code = getAnimationCode(catDna)
  let num = code - 1
  let items = [`#${catDna}headAndEars`, `#${catDna}tail`]
  let animationClass = "moving"
  if (num < items.length){
      $(items[num]).addClass(animationClass)
  }
}

function eyeShapeConfig (catDna) {
  //eyeShape
  let eyeCode = getEyeShapeCode(catDna)
  switch (eyeCode) {
    case 1:
      $(`#${catDna}cat__eye`).find('span').css('border', 'none')
      break
    case 2:
      $(`#${catDna}cat__eye`).find('span').css('border-top', '15px solid')
      break
    case 3:
      $(`#${catDna}cat__eye`).find('span').css('border-bottom', '15px solid')
      break
  }
}

function colorConfig (catDna) {
  //head color
  $(`#${catDna}head`).css('background', '#' + colors[getHeadColorCode(catDna)])
  $(`#${catDna}cat__chest`).css('background', '#' + colors[getHeadColorCode(catDna)])

  //mouthColor
  $(`#${catDna}cat__mouth-contour`).css('background', '#' + colors[getMouthColorCode(catDna)])
  $(`#${catDna}cat__chest_inner`).css('background', '#' + colors[getMouthColorCode(catDna)])

  //eyesColor
  $(`#${catDna}cat__eye`).find('span').css('background', '#' + colors[getEyesColorCode(catDna)])

  //earsColor
  $(`#${catDna}leftEar`).css('background', '#' + colors[getEarsColorCode(catDna)])
  $(`#${catDna}rightEar`).css('background', '#' + colors[getEarsColorCode(catDna)])
  $(`#${catDna}cat__paw-left`).css('background', '#' + colors[getEarsColorCode(catDna)])
  $(`#${catDna}cat__paw-right`).css('background', '#' + colors[getEarsColorCode(catDna)])
  $(`#${catDna}cat__tail`).css('background', '#' + colors[getEarsColorCode(catDna)])
  $(`#${catDna}cat__paw-left_inner`).css('background', '#' + colors[getEarsColorCode(catDna)])
  $(`#${catDna}cat__paw-right_inner`).css('background', '#' + colors[getEarsColorCode(catDna)])

  //decorationMidColor
  $(`#${catDna}midDot`).css('background', '#' + colors[getDecorationMidColorCode(catDna)])
  
  //decorationSidesColor
  $(`#${catDna}leftDot`).css('background', '#' + colors[getDecorationSidesColorCode(catDna)])
  $(`#${catDna}rightDot`).css('background', '#' + colors[getDecorationSidesColorCode(catDna)])
}

function appendCat (catDna) {
   //console.log(catHtml);
   //let newCatHtml = `<div id="${catDna}"> ` + catHtml + "<div>"
let catHtml = `
<div class="col-lg-4 catBox light-b-shadow">
<div class="cat">
    <div id="${catDna}headAndEars" class="cat__head_and_ears">
        <div class="cat__ear">
            <div id="${catDna}leftEar" class="cat__ear--left">
                <div class="cat__ear--left-inside"></div>
            </div>
            <div id="${catDna}rightEar" class="cat__ear--right">
                <div class="cat__ear--right-inside"></div>
            </div>
        </div>
        <div id="${catDna}head" class="cat__head">
            <div id="${catDna}midDot" class="cat__head-dots">
                <div id="${catDna}leftDot" class="cat__head-dots_first"></div>
                <div id="${catDna}rightDot" class="cat__head-dots_second"></div>
            </div>
            <div id="${catDna}cat__eye" class="cat__eye">
                <div class="cat__eye--left">
                    <span class="pupil-left"></span>
                </div>
                <div class="cat__eye--right">
                    <span class="pupil-right"></span>
                </div>
            </div>
            <div class="cat__nose"></div>
            <div id="${catDna}cat__mouth-contour" class="cat__mouth-contour"></div>
            <div class="cat__mouth-left"></div>
            <div class="cat__mouth-right"></div>
            <div class="cat__whiskers-left"></div>
            <div class="cat__whiskers-right"></div>
        </div>
    </div>
    <div class="cat__body">
        <div id="${catDna}cat__chest" class="cat__chest"></div>
        <div id="${catDna}cat__chest_inner" class="cat__chest_inner"></div>
        <div id="${catDna}cat__paw-left" class="cat__paw-left"></div>
        <div id="${catDna}cat__paw-left_inner" class="cat__paw-left_inner"></div>
        <div id="${catDna}cat__paw-right" class="cat__paw-right"></div>
        <div id="${catDna}cat__paw-right_inner" class="cat__paw-right_inner"></div>
        <div id="${catDna}tail">
            <div id="${catDna}cat__tail" class="cat__tail"></div>
        </div>
    </div>
</div>
<br>
<div class="dnaDiv" id="${catDna}catDNA">
    <b>
      DNA:
        <span id="dnabody">${getHeadColorCode(catDna)}</span>
        <span id="dnamouth">${getMouthColorCode(catDna)}</span>
        <span id="dnaeyes">${getEyesColorCode(catDna)}</span>
        <span id="dnaears">${getEarsColorCode(catDna)}</span>
      
        <span id="dnashape">${getEyeShapeCode(catDna)}</span>
        <span id="dnadecoration">${getDecorationCode(catDna)}</span>
        <span id="dnadecorationMid">${getDecorationMidColorCode(catDna)}</span>
        <span id="dnadecorationSides">${getDecorationSidesColorCode(catDna)}</span>
        <span id="dnaanimation">${getAnimationCode(catDna)}</span>
        <span id="dnaspecial">${1}</span>
    </b>
</div>
</div>
`;
  $('#userCatList').append(catHtml);

  colorConfig(catDna)
  eyeShapeConfig(catDna)
  decoratrionConfig(catDna)
  animationConfig(catDna)
}