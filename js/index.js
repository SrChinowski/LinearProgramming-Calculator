
var constNumber = 2; 
var varNumber = 2; 
var resNumber = 1;
var evalExpresion = "";
var evalEquiation = ''; 
var data; 
var flatcode;
var codeEq = "<input type='number' step=any class='form-control form-control-sm mr-1' id='1Xn' placeholder='n' style='width: 60px;'>"+
"<p class=' m-0 mr-2' style='font-size: 15px;'>X <sub>1</sub> +</p>"+
"<input type='number' step=any class='form-control form-control-sm mr-1' id='1Yn' placeholder='n' style='width: 60px;'>"+
"<p class=' m-0 mr-2' style='font-size: 15px;'>X <sub>2</sub></p>"+
"<select id='1Sym' class='form-control form-control-sm mr-2' style='width: 45px;'>"+
"<option>&le;</option>"+
"<option>&ge;</option>"+
"</select> "+
"<input type='number' step=any class='form-control form-control-sm mr-1' id='1ReN' placeholder='n' style='width: 60px;'>"+
"</div>"

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

function initSimplex(){
  window.location.href = "https://srchinowski.github.io/LinearProgramming-Calculator/html/simplex.html";
}

function showOptions(){
  document.getElementById("options").style.display = "block";
  document.getElementById("options").classList.add('d-flex');
  document.getElementById("options").classList.add('fade-in');
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
