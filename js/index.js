//settaggi

var timeUnit=1500; 
//questa è l'unità in millisecondi che viene moltiplicata per i 
//coefficenti per determinare la durata a schermo delle scritte, 
//è il valore modificabile tramite le frecce.


var coeffLetters=0.8;//durata a schermo di una signola lettera 
var coeffMinLetter=1;//durata a schermo minima da aggiungere ad parola ad esempio per cane -> 4 lettere * coeffLetters + coeffMinLetter

var coeffPunctuation=3;//durata a schermo di un segno di punteggiatura
var coeffMinBrake=3;//durata a schermo dello spazio


var letterByLetter=true; //lettera per lettera o parola per parola





//variabili di sistema
var whatToRead=[["parole",0]]; //inizializzo la lista di testo 
var currentIndex = 0; //punto corrente della lettura nella lista
var isReading=false; //mette in play o pausa la lettura


var prevMills= 0;
var currentMills= 0;
//variabili per tenere traccia del tempo

var whaitFor= 0;
//tempo da attendere prima di proseguire nella lettura (fra una lettera e laltra o uan parola e laltra)




var imput_text_form = document.getElementById("imput_text");


setInterval(function(){ read() }, 50);
 //la funzione di disegno viene chiamata 20 volte al secondo


function isNumeric(num){
  //funzione che verifica se una variabile contiene un numero 
  if (num!=" ") {return !isNaN(num)}
  else{ return false}  
}

function isLetter(c) {
  //funzione che verifica se una variabile contiene una lettera
  return c.toLowerCase() != c.toUpperCase();
}


function textReplacer(textSample){
  if (textSample==" ") { textSample="<div class='circle red ' ></div>"}
  // else if (textSample==".") { textSample="<div class='circle black' ></div>"} //esempio di come altri caratteri possono essere sistituiti
  
  return textSample;


}



function read(){
  //controlla che ora è (in millisecondi)
  var d = new Date();
  currentMills = d.getTime();


  //se è passato whaitFor da l'ultima volta che la lettura è stata aggiornata e 
  // la letura non è finita 
  if(prevMills+whaitFor<currentMills && currentIndex < whatToRead.length){

      var textSample = whatToRead[currentIndex][0];

      textSample = textReplacer(textSample);
   
      if (document.getElementById('reading_area').innerHTML!=textSample){
         document.getElementById('reading_area').innerHTML =textSample;}

      //aggiorno il testo dentro al <p>

      if (isReading==true ){

        whaitFor= whatToRead[currentIndex][1]*timeUnit;
        //setto quanto aspettare prima di aggiornare di nuovo il <p>
        prevMills=currentMills;
        //segno quando lultimo aggiornamento è stato fatto
        currentIndex  = currentIndex +1;
        //proseguo nella lista di parole
      }
      else{ whaitFor= 0;}
       //aggiorno il contenuto del <p> senza aspettare
  } 
}



function timeMultiplier(el){
  //funzione che calcola il tempo di attesa in base ai coefficenti

  var includedPunctuation =[",",";",'.',":","?","!"]
    //simboli da considerare come punteggiatura

  var time= 0;
  if (el.length > 1){
    //se è una poarola o un numero 
    time= el.length*coeffLetters+coeffMinLetter;
  }
  
   
  else if ( includedPunctuation.indexOf(el) >= 0 ){
       time= coeffPunctuation;
     //se è un segno di punteggiatura
  }
  else{
    //se è uno spazio o altro
    time= coeffMinBrake;
  }
  
 return(time);
  
  
}


document.getElementById("firestarter").onclick = function() {readFrom()};
//seleziono il form


function readFrom() {
  //funzione che prepara il testo per la lettura
  
  var raw_text=imput_text_form.value;
  
  
  var i;
  
  var reading_complete_list=[];
  var current_string="";
  //inizializo variabili
  
  for (i = 0; i < raw_text.length; i++) { 
    //per ogni lettera nel testo in imput
    
    r_t = raw_text[i]

    var includedSymbols =['“','”','"',"'","_","-",raw_text[i+1],raw_text[i-1]]
    //simboli da considerare come lettere virgolette e puntini di sospensione


    if (isLetter(r_t) || 
      isNumeric(r_t)  ||
      includedSymbols.indexOf(r_t) >= 0)
     {
      //se è una lettera

      current_string = current_string.concat(r_t); 

      if (letterByLetter) { reading_complete_list.push([current_string, coeffLetters]) }

    }
    
    else{
      //se è uno sazio o un simbolo 

      if (current_string!=""){

        if (letterByLetter) { reading_complete_list.push([current_string, coeffMinLetter])}

        else{reading_complete_list.push([current_string, timeMultiplier(current_string)])}
          current_string=""; 
      }
      
      reading_complete_list.push( [r_t, timeMultiplier( r_t)]);



    }
    
    
    
    
    
}
  
  console.log(reading_complete_list)
  // inizializzo la lettura
  whatToRead=reading_complete_list;
  currentIndex = 0;
  prevMills= 100;
  whaitFor= 100;
  isReading=true; 
  
}


document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    // funzione di controllo con tastiera
    
    switch(keyName) {
        case " ":
            if (isReading==true) {isReading=false;}
            else{isReading=true}
            break;

        case "ArrowDown":
            timeUnit=timeUnit+50;
            break;

        case "ArrowUp":
            if (timeUnit>50) {timeUnit=timeUnit-50;}
            break;

        case "ArrowLeft":
          if (isReading==true) {currentIndex=currentIndex-3;}
          else {currentIndex=currentIndex-1;}

          if (currentIndex<0) {currentIndex=0}
          whaitFor= 0;
          console.log(currentIndex)
          break;
    
        case "ArrowRight":
            currentIndex=currentIndex+1;
            whaitFor= 0;
            console.log(currentIndex)
            break;
    }

});
