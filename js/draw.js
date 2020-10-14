
//funcion mamalona para dibujar en html
function Graph(config) {

    this.canvas = document.getElementById(config.canvasId); //take canvas 
    this.minX = config.minX;
    this.minY = config.minY;
    this.maxX = config.maxX;
    this.maxY = config.maxY;
    this.unitsPerTick = config.unitsPerTick;

    // constants
    this.axisColor = '#d4d4d4';
    this.font = '8pt Calibri';
    this.tickSize = 10;

    // relationships
    this.context = this.canvas.getContext('2d');
    this.rangeX = this.maxX - this.minX;
    this.rangeY = this.maxY - this.minY;
    this.unitX = this.canvas.width / this.rangeX;
    this.unitY = this.canvas.height / this.rangeY;
    this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
    this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * this.canvas.width);
    this.iteration = (this.maxX - this.minX) / 1000;
    this.scaleX = this.canvas.width / this.rangeX;
    this.scaleY = this.canvas.height / this.rangeY;

    this.data = null;

    // draw x and y axis
    this.drawXAxis();
    this.drawYAxis();
  }

  Graph.prototype.drawXAxis = function() {
    var context = this.context;
    context.save();
    context.beginPath();
    context.moveTo(0, this.centerY);
    context.lineTo(this.canvas.width, this.centerY);
    context.strokeStyle = this.axisColor;
    context.lineWidth = 2;
    context.stroke();

    // draw tick marks
    var xPosIncrement = this.unitsPerTick * this.unitX;
    var xPos, unit;
    context.font = this.font;
    context.textAlign = 'center';
    context.textBaseline = 'top';

    // draw left tick marks
    xPos = this.centerX - xPosIncrement;
    unit = -1 * this.unitsPerTick;
    while(xPos > 0) {
      context.moveTo(xPos, this.centerY - this.tickSize / 2);
      context.lineTo(xPos, this.centerY + this.tickSize / 2);
      context.stroke();
      context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
      unit -= this.unitsPerTick;
      xPos = Math.round(xPos - xPosIncrement);
    }

    // draw right tick marks
    xPos = this.centerX + xPosIncrement;
    unit = this.unitsPerTick;
    while(xPos < this.canvas.width) {
      context.moveTo(xPos, this.centerY - this.tickSize / 2);
      context.lineTo(xPos, this.centerY + this.tickSize / 2);
      context.stroke();
      context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
      unit += this.unitsPerTick;
      xPos = Math.round(xPos + xPosIncrement);
    }
    context.restore();
  };

  Graph.prototype.drawVerticalLine = function(y){
    var context = this.context;
    context.save();
    context.beginPath();
    context.moveTo(y, 0);
    context.lineTo(y, this.canvas.height);
    context.strokeStyle = '#5222D0';
    context.lineWidth = 2;
    context.stroke();
  }

  Graph.prototype.drawYAxis = function() {
    var context = this.context;
    context.save();
    context.beginPath();
    context.moveTo(this.centerX, 0);
    context.lineTo(this.centerX, this.canvas.height);
    context.strokeStyle = this.axisColor;
    context.lineWidth = 2;
    context.stroke();

    // draw tick marks
    var yPosIncrement = this.unitsPerTick * this.unitY;
    var yPos, unit;
    context.font = this.font;
    context.textAlign = 'right';
    context.textBaseline = 'middle';

    // draw top tick marks
    yPos = this.centerY - yPosIncrement;
    unit = this.unitsPerTick;
    while(yPos > 0) {
      context.moveTo(this.centerX - this.tickSize / 2, yPos);
      context.lineTo(this.centerX + this.tickSize / 2, yPos);
      context.stroke();
      context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
      unit += this.unitsPerTick;
      yPos = Math.round(yPos - yPosIncrement);
    }

    // draw bottom tick marks
    yPos = this.centerY + yPosIncrement;
    unit = -1 * this.unitsPerTick;
    while(yPos < this.canvas.height) {
      context.moveTo(this.centerX - this.tickSize / 2, yPos);
      context.lineTo(this.centerX + this.tickSize / 2, yPos);
      context.stroke();
      context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
      unit -= this.unitsPerTick;
      yPos = Math.round(yPos + yPosIncrement);
    }
    context.restore();
  };

  Graph.prototype.drawDot = function(x,y){
    var context = this.context;
    context.beginPath();
    context.arc(x*this.unitX + this.centerX, this.centerY - y*this.unitY, 3, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#003300';


    // context.font = "15px Calibri";
    // context.textAlign = 'start';
    // context.textBaseline = 'bottom';
    // context.fillText('Min', 1.5*this.unitX + this.centerX+10, this.centerY - 4.5*this.unitY-5)

    context.stroke();

  }

  Graph.prototype.drawEquation = function(equation, color, thickness) {
    var context = this.context;
    context.save();
    context.save();
    this.transformContext();

    context.beginPath();
    context.moveTo(this.minX, equation(this.minX));

    for(var x = this.minX + this.iteration; x <= this.maxX; x += this.iteration) {
      context.lineTo(x, equation(x));
    }

    context.restore();
    context.lineJoin = 'round';
    context.lineWidth = thickness;
    context.strokeStyle = color;
    context.stroke();
    context.restore();
  };

  Graph.prototype.transformContext = function() {
    var context = this.context;

    // move context to center of canvas
    this.context.translate(this.centerX, this.centerY);

    /*
     * stretch grid to fit the canvas window, and
     * invert the y scale so that that increments
     * as you move upwards
     */
    context.scale(this.scaleX, -this.scaleY);
  };

  Graph.prototype.fillArea = function(points){

    var context = this.context;
    context.save();
    context.beginPath();
    context.fillStyle = '#5222D059';

    context.moveTo(points[0].x*this.unitX + this.centerX, this.centerY - points[0].y*this.unitY);
    for(var i = 1; i< points.length ; i++){
        context.lineTo(points[i].x*this.unitX + this.centerX, this.centerY - points[i].y*this.unitY);
    }

    // context.moveTo(1.5*this.unitX + this.centerX, this.centerY - 4.5*this.unitY);
    // context.lineTo(2*this.unitX + this.centerX, this.centerY - 6.5*this.unitY);
    // context.lineTo(6*this.unitX + this.centerX, this.centerY - 4.5*this.unitY);
    context.fill();
  }

  Graph.prototype.clear = function(){
    var context = this.context;
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawXAxis();
    this.drawYAxis();
  }