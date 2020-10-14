
var constNumber = 2; 
var evalExpresion = "";
var evalEquiation = ''; 
var data; 

function openNav() {
  document.getElementById('myNav').style.height = '100%';
}

function closeNav() {
document.getElementById('myNav').style.height = '0%';
}

function validateConstraints(n){
  if(document.getElementById(n+'Xn').value == null) return false; 
  if(document.getElementById(n+'Yn').value == null) return false; 
  if(document.getElementById(n+'ReN').value == null) return false; 
  return true;
}


function addConstraint(){

  if(constNumber < 10){
    document.getElementById('const').insertAdjacentHTML("beforeend",
      "<div class='row align-items-center pl-3 my-2'>"+
      "<p class=' m-0 mr-2'>"+ constNumber + ". &nbsp; </p>"+ //Numero de Equ
      "<input type='number' class='form-control form-control-sm mr-1' id='"+constNumber+"Xn' placeholder='n' style='width: 60px;'>"+ //Coef X
      "<p class=' m-0 mr-2' style='font-size: 23px;'>X +</p>"+
      "<input type='number' class='form-control form-control-sm mr-1' id='"+constNumber+"Yn' placeholder='n' style='width: 60px;'>"+ //Coef Y
      "<p class=' m-0 mr-2' style='font-size: 23px;'>Y</p>"+
      "<select class='form-control form-control-sm mr-2' id='"+constNumber+"Sym' style='width: 45px;'>"+ //Simbol
      "<option>&le;</option>"+
      "<option>&ge;</option>"+
      "</select> "+
      "<input type='number' class='form-control form-control-sm mr-1' id='"+constNumber+"ReN' placeholder='n' style='width: 60px;'></input>"+ //Resultado
      
      "</div>"
      );

    constNumber++;
  }
  else if(constNumber == 10){
    document.getElementById('const').insertAdjacentHTML("beforeend",
      "<div class='row align-items-center pl-3 my-2'>"+
      "<p class=' m-0 mr-0'>"+ constNumber + ". &nbsp; </p>"+ //Numero de Equ
      "<input type='number' class='form-control form-control-sm mr-1' id='"+constNumber+"Xn' placeholder='n' style='width: 60px;'>"+ //Coef X
      "<p class=' m-0 mr-2' style='font-size: 23px;'>X +</p>"+
      "<input type='number' class='form-control form-control-sm mr-1' id='"+constNumber+"Yn' placeholder='n' style='width: 60px;'>"+ //Coef Y
      "<p class=' m-0 mr-2' style='font-size: 23px;'>Y</p>"+
      "<select class='form-control form-control-sm mr-2' id='"+constNumber+"Sym' style='width: 45px;'>"+ //Simbol
      "<option>&le;</option>"+
      "<option>&ge;</option>"+
      "</select> "+
      "<input type='number' class='form-control form-control-sm mr-1' id='"+constNumber+"ReN' placeholder='n' style='width: 60px;'></input>"+ //Resultado
      
      "</div>"
      );

    constNumber++;
  }
  else{
    $('#doggy').modal('show');
    document.getElementsByClassName('modal-backdrop')[0].style.zIndex = 998;
  }
}

// function getData(){
//   try{
//      data = {
//       "objective" : {
//           "x": null,
//           "y": null
//       },
    
//       "goal" : null, 
    
//       "equations" : []
//     }

//     if(document.getElementById("minMax").value == "Maximizar") data.goal = 'max'; 
//     else data.goal = 'min'; 

//     data.objective.x = document.getElementById("FXn").value ; 
//     data.objective.y = document.getElementById("FYn").value ; 

//     for(var i = 1; i<constNumber; i++){

//       data.equations.push(
//         { "x": document.getElementById(i+'Xn').value,  "y": document.getElementById(i+'Yn').value,  "z": document.getElementById(i+'ReN').value,  "sign": document.getElementById(i+"Sym").value }
//       ); 
      
//   } 
//   return true; 
//   } catch{
//     return false; 
//   }
// }
