'use strict';
var cycleCount = 0;
var selectionNumbers = [];
var num1 = 0;
var num2 = 0;
var num3 = 0;

var selectEl = document.getElementById('setting-img');

function ProductImg(imgName, filePath){
  this.imgName = imgName;
  this.filePath = filePath;

  var clickCount = 0;
  this.clickCount = clickCount;
  var timeShown = 0;
  this.timeShown = timeShown;
}

var bag = new ProductImg('bag', 'img/bag.jpg');

var banana = new ProductImg('banana', 'img/banana.jpg');

var bathroom = new ProductImg('bathroom', 'img/bathroom.jpg');

var boots = new ProductImg('boots', 'img/boots.jpg');

var breakfast = new ProductImg('breakfast', 'img/breakfast.jpg');

var bubblegum = new ProductImg('bubblegum', 'img/bubblegum.jpg');

var chair = new ProductImg('chair', 'img/chair.jpg');

var cthulhu = new ProductImg ('cthulhu', 'img/cthulhu.jpg');

var dogDuck = new ProductImg ('dog-duck', 'img/dog-duck.jpg');

var dragon = new ProductImg ('dragon', 'img/dragon.jpg');

var pen = new ProductImg ('pen', 'img/pen.jpg');

var petSweep = new ProductImg ('pet-sweep', 'img/pet-sweep.jpg');

var scissors = new ProductImg ('scissors', 'img/scissors.jpg');

var shark = new ProductImg ('shark', 'img/shark.jpg');

var sweep = new ProductImg ('sweep', 'img/sweep.png');

var tauntaun = new ProductImg ('tauntaun', 'img/tauntaun.jpg');
var unicorn = new ProductImg ('unicorn', 'img/unicorn.jpg');
var usb = new ProductImg ('usb', 'img/usb.gif');
var waterCan = new ProductImg ('water-can', 'img/water-can.jpg');
var wineGlass = new ProductImg ('wine-glass', 'img/wine-glass.jpg');

var imageArray = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, usb, waterCan, wineGlass];

var imgSrc = function() {
  //chooses a random number, so long as that number was not in the selectionNumbers array and sets it to a given position in the array
  do {
    num1 = Math.floor(Math.random() * (imageArray.length + 1));
  } while (selectionNumbers.includes(num1) || num1 === num2 || num1 === num3 || num1 === 20);

  do {
    num2 = Math.floor(Math.random() * (imageArray.length + 1));
  } while (selectionNumbers.includes(num2) || num2 === num1 || num2 === num3 || num2 === 20);

  do {
    num3 = Math.floor(Math.random() * (imageArray.length + 1));
  } while (selectionNumbers.includes(num3) || num3 === num1 || num3 === num2 || num3 === 20);

  selectionNumbers[0] = num1;
  selectionNumbers[1] = num2;
  selectionNumbers[2] = num3;

  //log array to confirm non-repeating numbers are generated each time function is run
  console.log(selectionNumbers);
};

var imgRem = function(){
  var inputId = document.getElementById('randImg');

  if (inputId !== null){
    inputId.remove();
  }
};

var rendImg = function (){
  imgRem();
  imgSrc();
  var sectionEl = document.createElement('section');
  sectionEl.setAttribute('id', 'funk');
  selectEl.appendChild(sectionEl);

  for(var i = 0; i < selectionNumbers.length; i++){
    var imgEl = document.createElement('input');
    imgEl.setAttribute('type', 'image');
    imgEl.setAttribute('id', imageArray[selectionNumbers[i]].imgName);
    imgEl.setAttribute('src', imageArray[selectionNumbers[i]].filePath);
    sectionEl.appendChild(imgEl);
    imageArray[selectionNumbers[i]].timeShown++;
  }
};

rendImg();

var chosen = document.getElementById('setting-img');

chosen.onlick = function(){
  if (cycleCount < 25){
    for (var i = 0; i < imageArray.length; i++){
      if (imageArray[i].includes(this.id())){
        imageArray[i].timesClicked++;
      }
    }
    rendImg();
    cycleCount++;
  }
  else{
    imgRem();
    var completeImage = document.createElement('p');
    completeImage.textContent = 'This is the end';
    selectEl.appendChild(completeImage);
  }
};
