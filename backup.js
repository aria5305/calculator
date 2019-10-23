//need to round numbers - 
// and maybe change size to fit screen?

const allKeys = document.querySelectorAll("button");
const calculator =document.querySelector(".container");
const displayNum = document.querySelector(".int");
const previousNumber = document.querySelector(".previous");
let previousKey;

const calculate = {
    total : null,
    num2 : null,
    operator : null
}

//listening to keys being pressed
window.addEventListener("keydown",event => keyboardInput(event));
// window.addEventListener("keyup", event => keyboardInput(event));

function keyboardInput(e){


    //number pad
    if(e.key >=0 && e.key<10){
        clickButton(".number--" + e.key);
    }
    else{
    switch(e.key){

        case "+": 
            clickButton("#add");
            break;

        case "-":
            clickButton("#sub");
            break;
        case "*":
            clickButton("#mul");
            break;
        case "/":
            clickButton("#dvd");
            break;
        case "Enter":
        case "=":
            clickButton("#equ");
            break;
        case "c":
        case "Escape":
            clickButton("#clear");
            break;
        case "%":
            clickButton("#divisible");
            break;
        case "Backspace":
            clickButton("#backspace");
            break;

        case ".":
            clickButton("#decimal");
            break;

    }

}
}
    

function clickButton (key){
    const button = document.querySelector(key);
    button.click();
}



//clicking and all that
allKeys.forEach(key =>{

    key.addEventListener("click", (e) =>{
      
        const action = key.dataset.action;
        
        //Number keys
        if(!action){
            if(displayNum.textContent === "0" || previousKey === "operator"||previousKey ==="equals"){
                    displayNum.textContent = e.target.textContent;
                    previousKey = 'number'; 

            }else{
                displayNum.textContent += e.target.textContent;
                previousKey = 'number'; 
                
            }
        }
        
    
        //clear
        if(action === "clear") {
            calculate.operator = null;
            calculate.total = null;
            calculate.num2 = null;
            calculate.operatorSymbol = null;
            previousNumber.textContent = ""; 
            displayNum.textContent = ""; 
            previousKey = "";
          
        }
        
    
        if(action ==="decimal") {
            //if pressed decimal after operator adds 0 in front of .
            if(previousKey === "operator" || previousKey === "" ||previousKey ==="clear"){
                displayNum.textContent = "0.";
            } //doesn't allow for 2 decimal
            else if(!displayNum.textContent.includes(".")){
                displayNum.textContent = displayNum.textContent + ".";
            }
            previousKey = "decimal"; 
        }

        if(action ==="backspace"){
           displayNum.textContent = displayNum.textContent.slice(0, displayNum.textContent.length-1);
           previousKey = 'backspace'; 
          
        }

    
        if(action === "add"||action==="subtract"
            ||action==="multiply"|| action ==="divide"||
            action ==="divisible"){

               
             //retriving first number 
            //pressed the operator key for the first time
             if(displayNum.textContent != "" && calculate.total ===null) {
                calculate.total = Number(displayNum.textContent);
                displayNum.textContent = "";
                calculate.operator  = e.target.dataset.action;
                calculate.operatorSymbol =  e.target.textContent;
                previousNumber.textContent = calculate.total + calculate.operatorSymbol;
                previousKey = "operator";
             }

                //got 1st number but not second number  
                // exercute after pressing the operator key
                // can't do operator keys continuously
            if(calculate.total != null && calculate.operator != null && previousKey!= "operator" && calculate.num2 === null ) {
                calculate.num2 = Number(displayNum.textContent);
                calculate.operatorSymbol =  e.target.textContent;
                previousNumber.textContent = calculate.total + calculate.operatorSymbol;
               
            }

            //this bit allows user to do calculations using the operators instead of the equals
           if(calculate.num2 !==null) {
              
    
            if(calculate.total != null && calculate.operator!= null){
                calculate.num2 = Number(displayNum.textContent);
                calculate.total = operate(calculate.total,calculate.operator,calculate.num2);
                displayNum.textContent = "";
                calculate.operatorSymbol =  e.target.textContent;

                calculate.num2 = null;
                calculate.operator = null;
                calculate.operatorSymbol = null;
                previousKey = "operator";
                
    
                }
            }
           
            //if no first number - doesn't allow user to start with the operator
           if (calculate.total === null) {
                calculate.operator = null;
            }
            
            else{
                calculate.operator = e.target.dataset.action;
                calculate.operatorSymbol = e.target.textContent;
                previousNumber.textContent =  calculate.total + calculate.operatorSymbol;
                previousKey = "operator";
            }

        
            
        }
    



        if(action ==="equals"){

            if(calculate.total != null && calculate.operator!= null){
            calculate.num2 = Number(displayNum.textContent);
            previousNumber.textContent = "";
            calculate.total = operate(calculate.total,calculate.operator,calculate.num2);
            displayNum.textContent = calculate.total;
            calculate.num2 = null;
            calculate.operator = null;
            calculate.operatorSymbol = null;
            calculate.total = null;

            }
  
          
            previousKey = "equals";
            //update to show the previous equations

        }
        
    });
});




       
function operate (int1, op, int2){

    if (op === "add") {
        return int1 + int2;
    }

    else if (op ==="subtract") {
        return int1- int2; }


    else if (op === "multiply") {
        return int1*int2;
    }
    else if (op ==="divide"){
        return int1/int2;
    }else {
        return int1 % int2;
    }

}
    