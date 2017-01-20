'use strict';
var cycleCount = 0;
var selectionNumbers = [];
var num1 = 0;
var num2 = 0;
var num3 = 0;
var imgEl1, imgEl2, imgEl3;
var showenImg1, showenImg2, showenImg3;
var selectEl = document.getElementById('setting-img');
var chartData = [];
// localStorage.storedData = [];
//image object constructor
function ProductImg(imgName, filePath, id){
  this.imgName = imgName;
  this.filePath = filePath;
  this.id = id;
  this.clickCount = 0;
  this.timeShown = 0;

}
//initializing the images into the constructor
var bag = new ProductImg('bag', 'img/bag.jpg', 'bag');
var banana = new ProductImg('banana', 'img/banana.jpg', 'banana');
var bathroom = new ProductImg('bathroom', 'img/bathroom.jpg', 'bathroom');
var boots = new ProductImg('boots', 'img/boots.jpg', 'boots');
var breakfast = new ProductImg('breakfast', 'img/breakfast.jpg', 'breakfast');
var bubblegum = new ProductImg('bubblegum', 'img/bubblegum.jpg', 'bubblegum');
var chair = new ProductImg('chair', 'img/chair.jpg', 'chair');
var cthulhu = new ProductImg ('cthulhu', 'img/cthulhu.jpg', 'cthulhu');
var dogDuck = new ProductImg ('dog-duck', 'img/dog-duck.jpg', 'dogDuck');
var dragon = new ProductImg ('dragon', 'img/dragon.jpg', 'dragon');
var pen = new ProductImg ('pen', 'img/pen.jpg', 'pen');
var petSweep = new ProductImg ('pet-sweep', 'img/pet-sweep.jpg', 'petSweep');
var scissors = new ProductImg ('scissors', 'img/scissors.jpg', 'scissors');
var shark = new ProductImg ('shark', 'img/shark.jpg', 'shark');
var sweep = new ProductImg ('sweep', 'img/sweep.png', 'sweep');
var tauntaun = new ProductImg ('tauntaun', 'img/tauntaun.jpg', 'tauntaun');
var unicorn = new ProductImg ('unicorn', 'img/unicorn.jpg', 'unicorn');
var usb = new ProductImg ('usb', 'img/usb.gif', 'usb');
var waterCan = new ProductImg ('water-can', 'img/water-can.jpg', 'waterCan');
var wineGlass = new ProductImg ('wine-glass', 'img/wine-glass.jpg', 'wineGlass');
//pushing the image objects into an array
var imageArray = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, usb, waterCan, wineGlass];
//function to generate three non-repeating random numbers and store them
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
//function to remove the images from the page (currently not in use)
var imgRem = function(){
  var inputId = document.getElementById('setting-img');
  if (inputId !== null){
    inputId.remove();
  }
};
//function to create the html elements for the image render
var createRendItem = function(){
  var sectionEl = document.createElement('section');
  sectionEl.setAttribute('id', 'funk');
  imgEl1 = document.createElement('img');
  imgEl2 = document.createElement('img');
  imgEl3 = document.createElement('img');
  console.log(imgEl1, imgEl2, imgEl3);
  imgEl1.setAttribute('id', 'randImg');
  imgEl2.setAttribute('id', 'randImg');
  imgEl3.setAttribute('id', 'randImg');
  sectionEl.appendChild(imgEl1);
  sectionEl.appendChild(imgEl2);
  sectionEl.appendChild(imgEl3);
  selectEl.appendChild(sectionEl);
};
createRendItem();
//function to render the current set of randomized images to the page
var rendImg = function (){
  imgSrc();
  showenImg1 = imageArray[selectionNumbers[0]];
  showenImg2 = imageArray[selectionNumbers[1]];
  showenImg3 = imageArray[selectionNumbers[2]];
  imgEl1.setAttribute('src', imageArray[selectionNumbers[0]].filePath);
  imgEl2.setAttribute('src', imageArray[selectionNumbers[1]].filePath);
  imgEl3.setAttribute('src', imageArray[selectionNumbers[2]].filePath);
};
rendImg();
//event listeners for each of the three images on the page
imgEl1.addEventListener('click',imgOne, false);
function imgOne(){
  showenImg1.clickCount++;
  console.log(showenImg1.clickCount);
}
imgEl2.addEventListener('click',imgTwo, false);
function imgTwo(){
  showenImg2.clickCount++;
  console.log(showenImg2.clickCount);
}
imgEl3.addEventListener('click',imgThree, false);
function imgThree(){
  showenImg3.clickCount++;
  console.log(showenImg3.clickCount);
}
//listener for when an image is selected
var choices = document.getElementById('setting-img');
choices.addEventListener('click', function clickListener() {
  if (cycleCount < 25) {
    for (var i = 0; i < imageArray.length; i++) {
      if (imageArray[i].imgName == this.imgName) {
        imageArray[i].clickCount++;
      }
    }
    rendImg();
    cycleCount++;
  } else {
    //build the chart data
    for (var i = 0; i < imageArray.length; i++) {
      var clickedData = imageArray[i].clickCount;
      var storedTotal = 0;
      var storedData = JSON.parse(localStorage.getItem('storedData'));
      console.log(storedData);

      clickedData += storedTotal;
      chartData[i] = clickedData;
    }
    localStorage.setItem('storedData', JSON.stringify(chartData));

    console.log(chartData);
    buildChart();
    imgEl1.removeEventListener('click',imgOne);
    imgEl2.removeEventListener('click',imgTwo);
    imgEl3.removeEventListener('click',imgThree);
    choices.removeEventListener('click',clickListener);
  }
}, false);
var context = document.getElementById('charting').getContext('2d');
//variables and options for building the results chart on the page
var buildChart = function() {
  var renderChart = document.getElementById('charting');
  //build list of names for labels
  var chartLabels = [];
  for (var index = 0; index < imageArray.length; index++) {
    var labelsData = imageArray[index].imgName;
    chartLabels[index] = labelsData;
  }
  var chartColors = ['red', 'yellow', 'blue', 'green', 'purple', 'red', 'yellow', 'blue', 'green', 'purple', 'red', 'yellow', 'blue', 'green', 'purple', 'red', 'yellow', 'blue', 'green', 'purple'];
  var chartOptions = {
    responsive: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  var imageResultsChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: [{
        label: '# of votes for each color',
        data: chartData,
        backgroundColor: chartColors
      }]
    },
    options: chartOptions
  });
};
