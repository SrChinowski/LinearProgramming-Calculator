var tipo_operacion = 1; //1 es maximizacion
var cont_eses = 0;
var total = 0;
var cantidad_variables;
var es2 = 0;
var is_minimo = 0;
var hacer_uno;
var array_problema = [];
var tabla_a = [];
var tabla_b = [];
var zeta = [];
var array_pos_artifi = [];
var array_borrar_pos_artifi = [];
var clic_generar = false;
var es_decimal = false;


var constNumber = 2; 
var varNumber = 2; 
var resNumber = 1;
var evalExpresion = "";
var evalEquiation = ''; 
var data; 
var flatcode;
var codeEq = "<input type='number' step=any class='form-control form-control-sm mr-1' id='valor_x0' placeholder='n' style='width: 60px;'>"+
"<p class=' m-0 mr-2' style='font-size: 15px;'>X <sub>1</sub> +</p>"+
"<input type='number' step=any class='form-control form-control-sm mr-1' id='valor_x1' placeholder='n' style='width: 60px;'>"+
"<p class=' m-0 mr-2' style='font-size: 15px;'>X <sub>2</sub></p>"+
"<select id='1Sym' class='form-control form-control-sm mr-2' style='width: 45px;'>"+
"<option>&le;</option>"+
"<option>&ge;</option>"+
"</select> "+
"<input type='number' step=any class='form-control form-control-sm mr-1' id='1ReN' placeholder='n' style='width: 60px;'>"+
"</div>"

function getCode(resNumber,varNumber){

    var res = "";
    for(let i =0; i<varNumber; i++){
        res += "<input type='number' step=any  class='form-control form-control-sm mr-1' id='r"+(resNumber-1)+"x"+(varNumber)+"' placeholder='n' style='width: 60px;'>"+
      "<p class=' m-0 mr-2' style='font-size: 15px;'>X <sub>1</sub> +</p>"
    }
    return res;
}

function addConstraint(){

    document.getElementById('add-var').disabled = true;
    resNumber++;
  
    if(varNumber==2)
    codeEq = "<div id='res-1' class='row align-items-center pl-3 my-2'>"+
    "<p class=' m-0 mr-2'>"+resNumber+". &nbsp;</p>"+
    "<input type='number' step=any class='form-control form-control-sm mr-1' id='valor_r"+(resNumber-1)+"x0' placeholder='n' style='width: 60px;'>"+
    "<p class=' m-0 mr-2' style='font-size: 15px;'>X <sub>1</sub> +</p>"+
    "<input type='number' step=any class='form-control form-control-sm mr-1' id='valor_r"+(resNumber-1)+"x1' placeholder='n' style='width: 60px;'>"+
    "<p class=' m-0 mr-2' style='font-size: 15px;'>X <sub>2</sub></p>"+
    "<select id='operador_r"+(resNumber-1)+"' class='form-control form-control-sm mr-2' style='width: 45px;'>"+
    "<option selected value='&#60;='>&#60;=</option>"+
        "<option value='>='> >= </option>"+
        "<option value='='> = </option>"+
    "</select> "+
    "<input type='number' step=any class='form-control form-control-sm mr-1' id='resultado_r"+(resNumber-1)+"' placeholder='n' style='width: 60px;'>"+
    "</div>";
    else
    codeEq = "<div id='res-1' class='row align-items-center pl-3 my-2'>"+
    "<p class=' m-0 mr-2'>"+resNumber+". &nbsp;</p>"+ getCode(resNumber,varNumber)+
    "<select id='operador_r"+(resNumber-1)+"' class='form-control form-control-sm mr-2' style='width: 45px;'>"+
    "<option selected value='&#60;='>&#60;=</option>"+
        "<option value='>='> >= </option>"+
        "<option value='='> = </option>"+
    "</select> "+
    "<input type='number' step=any class='form-control form-control-sm mr-1' id='resultado_r"+(resNumber-1)+"' placeholder='n' style='width: 60px;'>"+
    "</div>";
    
  
    if(constNumber < 10){
      document.getElementById('const').insertAdjacentHTML("beforeend",codeEq);
  
      constNumber++;
    }
    else if(constNumber == 10){
      // document.getElementById('const').insertAdjacentHTML("beforeend",
      //   "<div class='row align-items-center pl-3 my-2'>"+
      //   "<p class=' m-0 mr-0'>"+ constNumber + ". &nbsp; </p>"+ //Numero de Equ
      //   "<input type='number' step=any class='form-control form-control-sm mr-1' id='"+constNumber+"Xn' placeholder='n' style='width: 60px;'>"+ //Coef X
      //   "<p class=' m-0 mr-2' style='font-size: 15px;'>X <sub>1</sub> +</p>"+
      //   "<input type='number' step=any class='form-control form-control-sm mr-1' id='"+constNumber+"Yn' placeholder='n' style='width: 60px;'>"+ //Coef Y
      //   "<p class=' m-0 mr-2' style='font-size: 15px;'>X <sub>2</sub></p>"+
      //   "<select class='form-control form-control-sm mr-2' id='"+constNumber+"Sym' style='width: 45px;'>"+ //Simbol
      //   "<option>&le;</option>"+
      //   "<option>&ge;</option>"+
      //   "</select> "+
      //   "<input type='number' step=any class='form-control form-control-sm mr-1' id='"+constNumber+"ReN' placeholder='n' style='width: 60px;'></input>"+ //Resultado
        
      //   "</div>"
      //   );
      document.getElementById('const').insertAdjacentHTML("beforeend",codeEq);
  
      constNumber++;
    }
    else{
      $('#doggy').modal('show');
      document.getElementsByClassName('modal-backdrop')[0].style.zIndex = 998;
    }
  }
  
  function addVar(){
    if(varNumber<10){
      varNumber++;
      
      var code = "<p class='m-0 mr-2' style='font-size: 15px;'>Z =</p>"+
      "<input type='number' step=any  class='form-control form-control-sm mr-1' id='valor_x0' placeholder='n' style='width: 60px;'>"+
      "<p class=' m-0 mr-2' style='font-size: 15px;'>X <sub>1</sub> +</p>"+
      "<input type='number' step=any class='form-control form-control-sm mr-1' id='valor_x1' placeholder='n' style='width: 60px;'>"+
      "<p class=' m-0 mr-2' style='font-size: 15px;'>X <sub>2</sub> +</p>";
      codeEq = "";
      flatcode = "<input type='number' step=any  class='form-control form-control-sm mr-1' id='valor_r0x0' placeholder='n' style='width: 60px;'>"+
      "<p class=' m-0 mr-2' style='font-size: 15px;'>X <sub>1</sub> +</p>"+
      "<input type='number' step=any class='form-control form-control-sm mr-1' id='valor_r0x1' placeholder='n' style='width: 60px;'>"+
      "<p class=' m-0 mr-2' style='font-size: 15px;'>X <sub>2</sub> +</p>";
  
      for(let i=2; i<varNumber; i++){
        if(i!==varNumber-1)
        {
          code += "<input type='number' step=any class='form-control form-control-sm mr-1' id='valor_x"+ (i) +"' placeholder='n' style='width: 60px;'>"+
          "<p class=' m-0 mr-2' style='font-size: 15px;'>X <sub>"+ (i+1) +"</sub> +</p>";
          flatcode += "<input type='number' step=any class='form-control form-control-sm mr-1' id='valor_x"+ (i) +"' placeholder='n' style='width: 60px;'>"+
          "<p class=' m-0 mr-2' style='font-size: 15px;'>X <sub>"+ (i+1) +"</sub> +</p>";
  
        }
        else{
          code += " <input type='number' step=any class='form-control form-control-sm mr-1' id='valor_x"+ (i) +"' placeholder='n' style='width: 60px;'>"+
          "<p class=' m-0 mr-2' style='font-size: 15px;'>X <sub>"+ (i+1) +"</sub></p>";
          flatcode += " <input type='number' step=any class='form-control form-control-sm mr-1' id='valor_x"+ (i ) +"' placeholder='n' style='width: 60px;'>"+
          "<p class=' m-0 mr-2' style='font-size: 15px;'>X <sub>"+ (i+1) +"</sub></p>";
        }
      }
  
      document.getElementById('functionObjetive').innerHTML = code;
  
      for(let j=0; j<resNumber; j++){
        codeEq = "<div id='res-"+(j+1)+"' class='row align-items-center pl-3 my-2'>"+
        "<p class=' m-0 mr-2'>"+(j+1)+". &nbsp;</p>";
  
        codeEq +=flatcode;
  
        codeEq+= "<select id='operador_r"+(resNumber-1)+"' class='form-control form-control-sm mr-2' style='width: 45px;'>"+
        "<option selected value='&#60;='>&#60;=</option>"+
        "<option value='>='> >= </option>"+
        "<option value='='> = </option>"
        "</select> "+
        "<input type='number' step=any class='form-control form-control-sm mr-1' id='1ReN' placeholder='n' style='width: 60px;'>"+
        "</div>";
      }

      codeEq+= "<input type='number' step=any class='form-control form-control-sm mr-1' id='resultado_r0' placeholder='n' style='width: 60px;'>";
      document.getElementById('restriccs').innerHTML = codeEq;
    }
  }

  function solve(){
    var d = document.getElementById('minMax');

    if(d.value == 'Maximizar') tipo_operacion = 1;
    else tipo_operacion = 0; 

    console.log(tipo_operacion)

    resolverEjercicio(array_problema, resNumber, varNumber);
  }

function resolverEjercicio(array_problema,resNumber,varNumber){

    inicializarMatriz(
      array_problema,
      resNumber,
      varNumber + 1
    );

    for (let i = 0; i < varNumber; i++) {
      //si no ingresa un valor en la funcion objetivo lo rellenamos con 0
      document.getElementById("valor_x" + i).value === ""
        ? (zeta[i] = 0)
        : (zeta[i] = parseFloat(document.getElementById("valor_x" + i).value));
    }

    for (var i = 0; i < resNumber; i++) {
      for (var j = 0; j < varNumber; j++) {
        //si no ingresa un valor en alguna restriccion lo rellenamos con 0
        document.getElementById("valor_r" + i + "x" + j).value === ""
          ? (array_problema[i][j] = 0)
          : (array_problema[i][j] = parseFloat(
              document.getElementById("valor_r" + i + "x" + j).value
            ));
      }

      if (document.getElementById("resultado_r" + i).value === "")
        array_problema[i][varNumber] = 0;
      else
        array_problema[i][varNumber] = parseFloat(
          document.getElementById("resultado_r" + i).value
        );
      array_problema[i][varNumber + 1] = document.getElementById(
        "operador_r" + i
      ).value;
    }
    //fin for
    generarSolucion();
}

function inicializarMatriz(matriz, num_filas, num_col){
  for (var i = 0; i <= num_filas; i++) {
    matriz[i] = [];
    for (var j = 0; j <= num_col; j++) {
      matriz[i][j] = 0;
    }
  }
};

function estandarizarEcuaciones(matriz){
  cantidad_variables = varNumber;
  // inicializarMatriz(matriz, resNumber, total + 2); //
  for (var i = 1; i <= resNumber; i++) {
    for (var j = 0; j <= varNumber; j++) {
      if (j === varNumber)
        matriz[i][total + 1] = array_problema[i - 1][j];
      else matriz[i][j + 1] = array_problema[i - 1][j];
    }
  }

  array_pos_artifi.push(0);

  //Verificamos el operador y Añadimos variables de holgura,
  //exceso y artificiales en el orden de aparicion
  for (let i = 0; i < resNumber; i++) {
    if (array_problema[i][varNumber + 1] === "<=") {
      //vamos agregando la variable de holgura en cada fila para cada restriccion
      matriz[i + 1][++cantidad_variables] = 1;
    } else if (array_problema[i][varNumber + 1] === "=") {
      matriz[i + 1][++cantidad_variables] = 1;
      array_borrar_pos_artifi.push(cantidad_variables);
      matriz[0][cantidad_variables] = -1;
      array_pos_artifi.push(i + 1);
      //Caso contrario agregamos variables de exceso
    } else if (array_problema[i][varNumber + 1] === ">=") {
      matriz[i + 1][++cantidad_variables] = -1;
      matriz[i + 1][++cantidad_variables] = 1;
      array_borrar_pos_artifi.push(cantidad_variables);
      matriz[0][cantidad_variables] = -1;
      array_pos_artifi.push(i + 1);
    }
  }
  console.log("array_borrar_pos_artifi", array_borrar_pos_artifi);
  console.log("array_pos_artifi", array_pos_artifi);
  matriz[0][0] = 1.0;
};

function generarSolucion(){
  for (var i = 0; i < resNumber; i++)
    if (
      array_problema[i][varNumber + 1] === "<=" ||
      array_problema[i][varNumber + 1] === "="
    )
      cont_eses += 1;
    else cont_eses += 2;
  total = cont_eses + varNumber;

  validarEntrada(array_problema);

  //var str_table = "<div align='center'><br><h2>Restriciones</h2></div>"; //
  var str_table = "";
  document.getElementById("content").innerHTML += str_table;
  // imprimeTabla(array_problema, resNumber - 1, varNumber); //
  inicializarMatriz(tabla_a, resNumber, total + 2);
  // imprimeTabla(tabla_a, resNumber, total + 1); //
  estandarizarEcuaciones(tabla_a);
  if (cont_eses !== resNumber) {
    imprimeTabla(tabla_a, resNumber, total + 1);
    str_table =
      "<br><div align = 'left' class='ml-4'><br><h3>&#8226; Tabla W</h3></div>";
    document.getElementById("content").innerHTML += str_table;
    calcularWPrima(tabla_a);
    imprimeTabla(tabla_a, resNumber, total + 1);
    str_table = "<br><div align = 'left' class='ml-4'><br><h3>&#8226; Fase 1</h3></div>";
    document.getElementById("content").innerHTML += str_table;
    primeraFase(tabla_a);
  }
  es2++;
  //imprimeTabla(tabla_a, resNumber, total+1);
  str_table = "<br><div align = 'left' class='ml-4'><br><h3>&#8226; Fase 2</h3></div>";
  document.getElementById("content").innerHTML += str_table;
  iniciarSegundaFase(tabla_a);
  //imprimeTabla(tabla_b, resNumber, total - array_borrar_pos_artifi.length+1);
  segundaFase();
  //imprimeTabla(tabla_b, resNumber, total - array_borrar_pos_artifi.length+1);
};

//Calculamos la primera fase con el tabla
function primeraFase(matriz){
  var bandera = 1;
  var iteracion = 1;

  while (bandera !== 0) {
    var mayor = 0.0;
    var menor = 1000000000.0;
    var entra_max, sale_min, hacer_uno;
    bandera = 0;

    //Imprimimos el tabla actual
    var str_table =
      "<br><div align = 'left' class='ml-4'><br><h5 class='m-0'>Iteración " + iteracion++ + "</h5></div>";
    document.getElementById("content").innerHTML += str_table;
    imprimeTabla(matriz, resNumber, total + 1);
    //Seleccionamos la variable de entrada
    for (let j = 1; j <= total; j++) {
      if (matriz[0][j] > 0 && matriz[0][j] > mayor) {
        mayor = matriz[0][j];
        entra_max = j;
        bandera = 1;
      }
    }

    //Seleccion de la variable de salida
    for (let i = 1; i <= resNumber; i++) {
      if (entra_max > 0 && matriz[i][entra_max] > 0) {
        if (matriz[i][total + 1] / matriz[i][entra_max] < menor) {
          menor = parseFloat(matriz[i][total + 1] / matriz[i][entra_max]);
          sale_min = i;
        }
      }
    }

    // Calculamos las variables de la siguiente iteracion
    var hacer_uno_a = matriz[sale_min][entra_max];
    hacer_uno = parseFloat(hacer_uno_a);

    str_table = "<div class='d-flex flex-row w-50 ml-4 bd-highlight' align = 'left' ><br><p class='bd-highlight'>Entra X" + entra + "&nbsp;&nbsp;</p>";
    str_table += "<p>Sale R" + sale_min + "</p></div>";
    document.getElementById("content").innerHTML += str_table;

    for (let j = 1; j <= total + 1; j++) {
      matriz[sale_min][j] /= hacer_uno;
      //matriz[sale_min][j] = parseFloat(matriz[sale_min][j]);
    }

    //imprimeTabla(matriz, resNumber, total+1);
    for (var i = 0; i <= resNumber; i++) {
      var vector = [];
      if (matriz[i][entra_max] !== 0 && i !== sale_min) {
        var aux = matriz[i][entra_max];
        for (var j = 0; j <= total + 1; j++) {
          matriz[i][j] += matriz[sale_min][j] * aux * -1;
          if (
            matriz[i][j] <= 2.220446049250313e-8 &&
            matriz[i][j] >= -4.440892098500626e-8
          )
            matriz[i][j] = 0;
        }
      }
    }
  }
};

function iniciarSegundaFase(matriz){
  inicializarMatriz(
    tabla_b,
    resNumber + 1,
    total - array_borrar_pos_artifi.length + 2
  );
  for (var i = 0; i < resNumber; i++) {
    var aux = 0;
    var k = 0;
    for (var j = 0; j <= total + 1; j++) {
      if (array_borrar_pos_artifi[aux] !== j)
        tabla_b[i + 1][k++] = matriz[i + 1][j];
      else aux++;
    }
  }
  tabla_b[0][0] = 1; //valor de z

  for (let j = 0; j < varNumber; j++)
    if (is_minimo === resNumber * varNumber)
      tabla_b[0][j + 1] = -0.001 * zeta[j];
    else tabla_b[0][j + 1] = -1 * zeta[j];
};

function segundaFase(){
  //imprimeTabla(tabla_b, resNumber, total - array_borrar_pos_artifi.length+1);
  if (tipo_operacion === 0) {
    var str_table =
      "<br><div align = 'left'><br><h5>Z ajustada</h5></div>";
    document.getElementById("content").innerHTML += str_table;
    imprimeTabla(
      tabla_b,
      resNumber,
      total - array_borrar_pos_artifi.length + 1
    );
    ajuste(
      tabla_b,
      resNumber,
      zeta.length,
      total - array_borrar_pos_artifi.length + 1
    );
  }

  finalizarFase(tabla_b);
  //imprimeTabla(tabla_b, resNumber, total - array_borrar_pos_artifi.length+1);
};

function finalizarFase (matriz) {
  var bandera = 1,
    iteracion = 1;
  while (bandera !== 0) {
    var mayor = 0;
    var menor = 1000000000;
    var my_map = [];
    var entra = 0,
      sale,
      salda = 10000000000;
    bandera = 0;

    //console.log(entra);
    var str_table =
    "<br><div align = 'left' class='ml-4'><br><h5 class='m-0'>Iteración " + iteracion++ + "</h5></div>";
    document.getElementById("content").innerHTML += str_table;
    imprimeTabla(
      matriz,
      resNumber,
      total - array_borrar_pos_artifi.length + 1
    );
    if (tipo_operacion === 1) {
      for (let j = 1; j <= total - array_borrar_pos_artifi.length; j++) {
        if (matriz[0][j] < 0 && matriz[0][j] < menor) {
          menor = matriz[0][j];
          entra = j;
          bandera = 1;
        }
      }
    } else if (tipo_operacion === 0) {
      for (let j = 1; j <= total - array_borrar_pos_artifi.length; j++) {
        if (matriz[0][j] > 0 && matriz[0][j] > mayor) {
          mayor = matriz[0][j];
          entra = j;
          bandera = 1;
        }
      }
    }

    //Seleccion de la variable de salida Forma correcta
    for (let i = 1; i <= resNumber; i++) {
      if (entra > 0 && matriz[i][entra] > 0) {
        if (
          matriz[i][total - array_borrar_pos_artifi.length + 1] /
            matriz[i][entra] <
          salda
        ) {
          salda = parseFloat(
            matriz[i][total - array_borrar_pos_artifi.length + 1] /
              matriz[i][entra]
          );
          sale = i;
        }
      }
    }

    // Calculamos las variables de la siguiente iteracion
    var hacer_uno_a = matriz[sale][entra];
    hacer_uno = parseFloat(hacer_uno_a);

    str_table = "<div class='d-flex flex-row w-50 ml-4 bd-highlight' align = 'left' ><br><p class='bd-highlight'>Entra X" + entra + "&nbsp;&nbsp;</p>";
    str_table += "<p>Sale X" + sale + "</p></div>";
    document.getElementById("content").innerHTML += str_table;

    for (let j = 0; j <= total - array_borrar_pos_artifi.length + 1; j++) {
      matriz[sale][j] /= hacer_uno;
      matriz[sale][j] = parseFloat(matriz[sale][j]);
    }

    for (let i = 0; i <= resNumber; i++) {
      var vector = [];
      if (matriz[i][entra] !== 0 && i !== sale) {
        var aux = matriz[i][entra];
        for (let j = 0; j <= total + 1; j++) {
          vector.push(matriz[sale][j] * aux);
          matriz[i][j] -= vector[j];
          matriz[i][j] = parseFloat(matriz[i][j]);
        }
      }
    }
  }
};

function ajuste(matriz, num_filas, num_col, nc2){
  for (var j = 1; j <= num_col; j++)
    if (matriz[0][j] < 0) {
      var aux = matriz[0][j];
      for (var i = 1; i <= num_filas; i++)
        if (matriz[i][j] === 1)
          for (var k = 0; k <= nc2; k++) {
            matriz[0][k] += matriz[i][k] * -1 * aux;
          }
    }
};

//Grafica la tabla
function imprimeTabla(matriz, num_filas, num_col){
  var an = document.getElementById("content");
  var table = document.createElement("table");
  table.id = "my_table";
  table.align = "center"
  table.classList.add('table');
  table.classList.add('table-bordered');
  table.classList.add('w-50');
  
  var tr = document.createElement("tr");
  tr.style.background = "#5222D0";
  tr.style.color = "white";
  tr.style.fontWeight = "bold";

  var text;
  if (es2 > 0) text = document.createTextNode("Z");
  else text = document.createTextNode("W");
  var td = document.createElement("td");
  td.appendChild(text);
  tr.appendChild(td);
  table.appendChild(tr);

  for (let l = 1; l < num_col; l++) {
    text = "";
    td = document.createElement("td");
    text = document.createTextNode("X" + l);
    td.appendChild(text);
    tr.appendChild(td);
    table.appendChild(tr);
  }

  text = document.createTextNode("R");
  td = document.createElement("td");
  td.appendChild(text);
  tr.appendChild(td);
  table.appendChild(tr);

  for (var k = 0; k <= num_filas; k++) {
    tr = document.createElement("tr");
    for (var l = 0; l <= num_col; l++) {
      var text = "";
      var td = document.createElement("td");
      //
      verificarSiEsDecimal(matriz[k][l]);
      es_decimal
        ? (text = document.createTextNode(matriz[k][l].toFixed(2)))
        : (text = document.createTextNode(matriz[k][l]));
      //
      td.appendChild(text);
      tr.appendChild(td);
      table.appendChild(tr);
    }
    an.appendChild(table);
  }
};

function verificarSiEsDecimal(numero){
  numero % 1 === 0 ? (es_decimal = false) : (es_decimal = true);
};

function validarEntrada(matriz){
  for (let i = 0; i < resNumber; i++)
    for (let j = 0; j < varNumber; j++)
      if (array_problema[i][j] < 1) is_minimo++;

  if (is_minimo === varNumber * resNumber)
    for (let i = 0; i < resNumber; i++)
      for (let j = 0; j <= varNumber; j++) {
        array_problema[i][j] *= 10;
        zeta[j] *= 10;
      }
};

function calcularWPrima(matriz){
  var suma = 0;
  for (var i = 0; i <= total + 1; i++) {
    suma = 0;
    for (var j = 0; j < array_pos_artifi.length; j++) {
      suma += parseInt(matriz[array_pos_artifi[j]][i]);
    }
    matriz[0][i] = suma;
  }
};