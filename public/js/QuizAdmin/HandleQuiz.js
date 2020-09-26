function setGreen() {
    let trueElement = document.getElementById("true");
    let falselement = document.getElementById("false");

    trueElement.classList.remove('hover:text-green-600');
    trueElement.classList.remove('hover:bg-green-100');
    trueElement.classList.remove('bg-white');
    trueElement.classList.remove('text-grey-700');

    falselement.classList.remove('hover:bg-red-600');
    falselement.classList.remove('text-white');
    falselement.classList.remove('bg-red-500');


    falselement.classList.add('text-grey-700');
    falselement.classList.add('bg-white');
    falselement.classList.add('hover:text-red-600');
    falselement.classList.add('hover:bg-red-100');

    trueElement.classList.add('hover:bg-green-600');
    trueElement.classList.add('bg-green-500');
    trueElement.classList.add('text-white');
    
}

function setRed(){

    let trueElement = document.getElementById("true");
    let falselement = document.getElementById("false");

    trueElement.classList.remove('hover:bg-green-600');
    trueElement.classList.remove('bg-green-500');
    trueElement.classList.remove('text-white');
    
    trueElement.classList.add('hover:text-green-600');
    trueElement.classList.add('hover:bg-green-100');
    trueElement.classList.add('bg-white');
    trueElement.classList.add('text-grey-700');

    falselement.classList.remove('text-grey-700');
    falselement.classList.remove('bg-white');
    falselement.classList.remove('hover:text-red-600');
    falselement.classList.remove('hover:bg-red-100');

    falselement.classList.add('hover:bg-red-600');
    falselement.classList.add('text-white');
    falselement.classList.add('bg-red-500');


}

function checkedButton(){

    if(document.getElementById('Answer-A').checked){
        document.getElementById('A').classList.add('textGreen');
        document.getElementById('numberA').classList.add('green');

        document.getElementById('B').classList.remove('textGreen');
        document.getElementById('numberB').classList.remove('green');

        document.getElementById('C').classList.remove('textGreen');
        document.getElementById('numberC').classList.remove('green');
        
        document.getElementById('D').classList.remove('textGreen');
        document.getElementById('numberD').classList.remove('green');
    }

    if(document.getElementById('Answer-B').checked){
        document.getElementById('B').classList.add('textGreen');
        document.getElementById('numberB').classList.add('green');

        document.getElementById('A').classList.remove('textGreen');
        document.getElementById('numberA').classList.remove('green');

        document.getElementById('C').classList.remove('textGreen');
        document.getElementById('numberC').classList.remove('green');
        
        document.getElementById('D').classList.remove('textGreen');
        document.getElementById('numberD').classList.remove('green');
      
    }
    if(document.getElementById('Answer-C').checked){
        document.getElementById('C').classList.add('textGreen');
        document.getElementById('numberC').classList.add('green');

        document.getElementById('A').classList.remove('textGreen');
        document.getElementById('numberA').classList.remove('green');

        document.getElementById('B').classList.remove('textGreen');
        document.getElementById('numberB').classList.remove('green');
        
        document.getElementById('D').classList.remove('textGreen');
        document.getElementById('numberD').classList.remove('green');

        
    }
    if(document.getElementById('Answer-D').checked){
        document.getElementById('D').classList.add('textGreen');
        document.getElementById('numberD').classList.add('green');

        document.getElementById('A').classList.remove('textGreen');
        document.getElementById('numberA').classList.remove('green');

        document.getElementById('B').classList.remove('textGreen');
        document.getElementById('numberB').classList.remove('green');
        
        document.getElementById('C').classList.remove('textGreen');
        document.getElementById('numberC').classList.remove('green');
    
        
    }
    

}

function disabled(){ 
    
    let texteria = document.getElementById("bio"); 
    if (texteria.value.length != 0){
        
        texteria.disabled = true;  
        let flaseElement = document.getElementById("false");
        flaseElement.style.pointerEvents = 'none';

        let trueElement = document.getElementById("true");
        trueElement.style.pointerEvents = 'none';


        document.querySelector(".trueFalseQ").classList.remove('bg-grey-50');

        let green = document.getElementsByClassName('bg-green-500');
        let red = document.getElementsByClassName('bg-red-500');

        if(red.length == 1){
            trueElement.style.display = 'none'; 
        } else { flaseElement.style.display = 'none';  }

        // console.log(red.length)
        // console.log(green.length)
        
 

    

    }

}


// function deleteQ() {
    
//     document.querySelector('.trueFalseQ').style.display = 'none';

// }

// function deleteItem() {
//     let itemsToDelete = document.querySelectorAll('.selected');
  
//     for(let i = 0; i< itemsToDelete.length; i++)
//         itemsToDelete[i].style.display = 'none'; 

// }

function renderTrueFalse(){
   
    var x = document.getElementById("");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
      
}

function renderMultipleChoice(){


}

function renderFillBlanks(){


}