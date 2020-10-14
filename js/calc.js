
var n = 6;
var constNumber = 2; 
var combinations; 
var points= [];
var data = null;

// var data = {
//     "objective" : {
//         "x": 3,
//         "y": 8
//     },

//     "goal" : "min", 

//     "equations" : [
//         {  "x": 1,  "y": 1,  "z": 8,  "sign": ">=" },
//         {  "x": 2,  "y": -3,  "z": 0,  "sign": "<=" }, 
//         {  "x": 1,  "y": 2,  "z": 30,  "sign": "<=" },
//         {  "x": 3,  "y": -1,  "z": 0,  "sign": ">=" },
//         {  "x": 1,  "y": 0,  "z": 10,  "sign": "<=" },
//         {  "x": 0,  "y": 1,  "z": 9,  "sign": ">=" },
//         {  "x": 1,  "y": 0,  "z": 0,  "sign": ">=" },
//         {  "x": 0,  "y": 1,  "z": 0,  "sign": ">=" }
//         ]
// }

var data2 = {
    "objective" : {
        "x": 5,
        "y": 4
    },

    "goal" : "max", 

    "equations" : [
        {  "x": -1,  "y": 1,  "z": 1,  "sign": "<=" },
        {  "x": 6,  "y": 4,  "z": 24,  "sign": "<=" },
        // {  "x": 1,  "y": 2,  "z": 6,  "sign": "<=" }, 
        // {  "x": 0,  "y": 1,  "z": 2,  "sign": "<=" },
        // {  "x": 1,  "y": 0,  "z": 0,  "sign": ">=" },
        // {  "x": 0,  "y": 1,  "z": 0,  "sign": ">=" }
        ]
}

//Set init value N 

var myGraph = new Graph({
    canvasId: 'myCanvas',
    minX: -n, maxX: n,
    minY: -n, maxY: n,
    unitsPerTick: Math.round((n-1)*.16666667)
  });


// getDots(); console.log("getdots")
// //drawAllDots();
// evaluteIntersections();
// orderDots();
// myGraph.fillArea(points);
// solveProblem();
// drawAreaDots();


//graf all lines in data


//evaluteIntersections();

//myGraph.drawDot();

function solve(){
    if(checkBlank()) {

        getData();
        getZoom();
        drawLines();
        getDots();
        evaluteIntersections();
        //drawAllDots();
        orderDots();
        myGraph.fillArea(points);
        solveProblem();
        drawAreaDots();
    }
}

function getZoom(){
    var max  = 0 ;
    data.equations.forEach(eq => {
        if(max < eq.x) max = eq.x;
        if(max < eq.y) max = eq.y;
    })
    n = max*1.5; 

    myGraph = new Graph({
        canvasId: 'myCanvas',
        minX: -n, maxX: n,
        minY: -n, maxY: n,
        unitsPerTick: Math.round((n-1)*.16666667)
      });
      
    myGraph.clear();
}

function drawLines(){
    data.equations.forEach(eq => {
            if(eq.y != 0){
                myGraph.drawEquation(function(x, x1= eq.x, x2 =eq.y, z =eq.z ) {
                    return ((z + -x1*x)/x2 );
                }, '#5222D0', 2);
            }
        
            if(eq.y == 0){
                myGraph.drawVerticalLine((eq.z/eq.x)*myGraph.unitY+myGraph.centerX);
            }
        });
}

function evaluteIntersections(){
    combinations.forEach(eq =>{
        eq.isArea = evalDot(eq.dot.x,eq.dot.y)
    })

    combinations.forEach(eq =>{
        if(eq.isArea) console.log(eq);
    })
    
}

function getInterseccion(x1,y1,x2,y2){

    var x = (x1 - x2) / (y2 - y1); 

    // console.log(((x * -10)/10).toFixed(1) + " " + (x1 + y1*x).toFixed(1) );
    // console.log(Math.round(x * -10) / 10 + " " + Math.round((x1 + y1*x) * 10) / 10)

    return  {
        "x" : ((x * -10)/10),
        "y" : (x1 + y1*x)
    }

}

function evalDot(x,y){
    var val = true;


    data.equations.forEach(eq =>{

        var n = eq.x*x + eq.y*y; 
        
        switch(eq.sign){
            case ">=": 
                if(n < eq.z){
                    console.log(n +"<="+eq.z + "| DOT : "+ eq.x + " " + eq.y); 
                    val =false;

                }
                break; 

            case "<=": 
                if(n > eq.z){
                    console.log(n +">="+eq.z + "| DOT : "+ eq.x + " " + eq.y); 
                    val =false;
                }
            break; 
        }

    });

    return val; 
}

function initCalc(){
    myGraph.drawXAxis();
    myGraph.drawYAxis();
}

function getDots(){
    let array = data.equations;
    combinations = [];

    // Since you only want pairs, there's no reason
    // to iterate over the last element directly
    for (let i = 0; i < array.length - 1; i++) {
    // This is where you'll capture that last value
        for (let j = i + 1; j < array.length; j++) {
            combinations.push({
                "equations" : [ array[i] ,array[j]],
                "dot" : {"x" : null, "y" : null},
                "isArea": false
            });
        }
    }

    //console.log(combinations);


    combinations.forEach(inter => {
        if(inter.equations[0].y != 0){
            var ind =  getInterseccion(inter.equations[0].z / inter.equations[0].y, 
                            inter.equations[0].x / inter.equations[0].y,
                            inter.equations[1].z / inter.equations[1].y, 
                            inter.equations[1].x / inter.equations[1].y
                            )
            inter.dot.x = ind.x; 
            inter.dot.y = ind.y; 
            
        }

        if(inter.equations[1].y == 0){

            inter.dot.y = ((inter.equations[0].z-(inter.equations[1].z*inter.equations[0].x))/inter.equations[0].y) 
            inter.dot.x = inter.equations[1].z; 
            
        }

        if(inter.equations[0].y == 0 && inter.equations[1].x == 0){
            inter.dot.x = inter.equations[0].z;
            inter.dot.y = inter.equations[1].z;
        }

        if(inter.equations[0].x == 0 && inter.equations[1].y == 0){
            inter.dot.y = inter.equations[0].z;
            inter.dot.x = inter.equations[1].z;
        }


    }); 
}

function drawAllDots(){
    combinations.forEach(dot =>{
        myGraph.drawDot(dot.dot.x, dot.dot.y)
    })
}

function drawAreaDots(){
    combinations.forEach(dot =>{
        if(dot.isArea) myGraph.drawDot(dot.dot.x, dot.dot.y)
    })
}

function orderDots(){
    // Array of points;
// const points = [{x:?,y:?},{x:?,y:?},{x:?,y:?},...?];

combinations.forEach(eq => {
    if(eq.isArea)
        if((eq.dot.x != -Infinity && eq.dot.x != Infinity && eq.dot.y != -Infinity && eq.dot.y != Infinity))
        {
            points.push(
                {"x":eq.dot.x,"y":eq.dot.y}
            );
        }
})

// Find min max to get center
// Sort from top to bottom
points.sort((a,b)=>a.y - b.y);

// Get center y
const cy = (points[0].y + points[points.length -1].y) / 2;

// Sort from right to left
points.sort((a,b)=>b.x - a.x);

// Get center x
const cx = (points[0].x + points[points.length -1].x) / 2;

// Center point
const center = {x:cx,y:cy};

// Pre calculate the angles as it will be slow in the sort
// As the points are sorted from right to left the first point
// is the rightmost

// Starting angle used to reference other angles
var startAng;
points.forEach(point => {
    var ang = Math.atan2(point.y - center.y,point.x - center.x);
    if(!startAng){ startAng = ang }
    else {
         if(ang < startAng){  // ensure that all points are clockwise of the start point
             ang += Math.PI * 2;
         }
    }
    point.angle = ang; // add the angle to the point
 });


 // Sort clockwise;
 points.sort((a,b)=> a.angle - b.angle);

 //console.log(points);
}

function solveProblem(){
    var res = [];

    points.forEach(dot => {
        res.push(
            {
                "x":dot.x,
                "y":dot.y,
                "res": dot.x*data.objective.x + dot.y*data.objective.y
            }
        );
    })

    //console.log(res);

    if(data.goal == 'min'){
       var min = res[0].res;

       res.forEach(res => {
        if(res.res < min) min = res.res; 
       })

       //console.log(min)

       myGraph.drawEquation(function(x, x1= data.objective.x, x2 =data.objective.y, z =min ) {
        return ((z + -x1*x)/x2 );
        }, '#EC615B', 2);
    

       
    }

    else if(data.goal == 'max'){
        var max = res[0].res;
 
        res.forEach(res => {
         if(max < res.res) max = res.res; 
        })
 
        //console.log(max)

        myGraph.drawEquation(function(x, x1= data.objective.x, x2 =data.objective.y, z =max ) {
            return ((z + -x1*x)/x2 );
            }, '#EC615B', 2);
     }
}

function getData(){
    try{
       data = {
        "objective" : {
            "x": null,
            "y": null
        },
      
        "goal" : null, 
      
        "equations" : [
            ]
      }
  
      if(document.getElementById("minMax").value == "Maximizar") data.goal = 'max'; 
      else data.goal = 'min'; 
  
      data.objective.x = parseInt(document.getElementById("FXn").value) ; 
      data.objective.y = parseInt(document.getElementById("FYn").value) ; 
  
      for(var i = 1; i<constNumber; i++){
  
        data.equations.push(
          { "x": parseInt(document.getElementById(i+'Xn').value),  "y": parseInt(document.getElementById(i+'Yn').value),  "z": parseInt(document.getElementById(i+'ReN').value),  "sign": parseInt(document.getElementById(i+"Sym").value) }
        ); 
        
    } 
    return true; 
    } catch{
      return false; 
    }

}

function checkBlank(){
    if(document.getElementById("FXn").value != '' ||  document.getElementById("FYn").value != '') //Obj Vacio
    {
      for(var i = 1; i<constNumber; i++){
        if(document.getElementById(i+'Xn').value == '' || 
        document.getElementById(i+'Yn').value == '' ||
        document.getElementById(i+'ReN').value == '' ||
        document.getElementById(i+"Sym").value == '' )
        {$('#blank').modal('show');
        document.getElementsByClassName('modal-backdrop')[0].style.zIndex = 998;
        return false;}
      } 
    }else
    {
      $('#blank').modal('show');
      document.getElementsByClassName('modal-backdrop')[0].style.zIndex = 998;
      return false;
    }
    
    if(constNumber == 2){
        $('#constraints').modal('show');
        document.getElementsByClassName('modal-backdrop')[0].style.zIndex = 998;
        return false;
    }

    return true;
  }