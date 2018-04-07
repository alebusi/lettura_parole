var whatToRead=[["parole",0]];
var currentIndex = 0;
var isReading=false; 
var prevMills= 0;
var currentMills= 0;
var whaitFor= 0;
var timeUnit=300;


var coeffLetters=2;
var coeffPunctuation=2;
var coeffMinBrake=1.5;
var coeffWhite=0.05;


setInterval(function(){ 
  var d = new Date();
  currentMills = d.getTime();
  
  read() }, 500);



function isNumeric(num){
  if (num!=" ") {return !isNaN(num)}
  else{ return false}

  
}



var imput_text_form = document.getElementById("imput_text");
function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}



function read(){

  if(prevMills+whaitFor<currentMills && currentIndex < whatToRead.length){
   
  
      prevMills=currentMills;
    
      var textSample = whatToRead[currentIndex][0];
     

      if (isReading==true ){
        currentIndex  = currentIndex +1;
        whaitFor= whatToRead[currentIndex][1]*timeUnit;

      }
      else{whaitFor=0;}


    
      document.getElementById('reading_area').innerHTML =textSample;
    
      
     
     
     }
  
  
  
  
}



function timeMultiplier(el){
  var time= 0;
  if (el.length > 1){
    time= el.length*coeffLetters;
  }
  
  else if ( el==","||
          el==";"||
          el=="."||
          el==":"||
          el=="?"||
          el=="!"){
       time= coeffPunctuation;
  }
  else{
    time= coeffMinBrake;
  }
  
 return(time);
  
  
}


document.getElementById("firestarter").onclick = function() {readFrom()};

function readFrom() {
  
  var raw_text=imput_text_form.value;
  
  
  var i;
  
  var reading_complete_list=[];
  var current_string="";
  
  for (i = 0; i < raw_text.length; i++) { 
    console.log(raw_text[i],isNumeric(raw_text[i]))
    
    if (isLetter(raw_text[i]) || isNumeric(raw_text[i]) ){
      current_string = current_string.concat(raw_text[i]); 
    }
    
    else{
      if (current_string!=""){
        reading_complete_list.push([current_string, timeMultiplier(current_string)]);
         reading_complete_list.push(["",coeffWhite]);
          current_string=""; 
      }
      
      
      reading_complete_list.push( [raw_text[i], timeMultiplier( raw_text[i])]);
      reading_complete_list.push(["",coeffWhite]);
     
    }
    
    
    
    
    
}
  
  console.log(reading_complete_list)
  
  whatToRead=reading_complete_list;
  currentIndex = 0;
  prevMills= 0;
  whaitFor= 0;
  isReading=true; 
  
}


document.addEventListener('keydown', (event) => {
  const keyName = event.key;

switch(keyName) {
    case " ":
        if (isReading==true) {isReading=false;}
        else{isReading=true}
        break;
    case "ArrowUp":

        timeUnit=timeUnit+50;
        break;
    case "ArrowDown":
        if (timeUnit>50) {
        timeUnit=timeUnit-50;}
        break;
    case "ArrowLeft":
      currentIndex=currentIndex-3;
      if (currentIndex<0) {currentIndex=0}
      whaitFor= 0;
      break;

    case "ArrowRight":

        currentIndex=currentIndex+1;
        whaitFor= 0;
        break;
}




 
});