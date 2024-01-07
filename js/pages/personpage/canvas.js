var dataList = [3.053,3.062,3.047,3.047,3.045];
var preYAxisLst= ['3.045','3.05','3.055','3.06','3.065','3.07'];
var yAxisLst = preYAxisLst.reverse();
var xAxisList = ['Monday','Tuesday','Wenesday','Thursday','Friday']
var intervalLine = 25;
var lineWid = 270;
var intervalRow = (0.8 * lineWid) / (xAxisList.length - 1);
var xAxis = (preYAxisLst.length - 1) * intervalLine + 20;

var valToCoor = function(val){
    var deg = (preYAxisLst[preYAxisLst.length - 1] * 1000 - preYAxisLst[0] * 1000) / 1000;
    var dec = (preYAxisLst[preYAxisLst.length - 1] * 1000 - val * 1000) / 1000;
    var orgVal = intervalLine * (preYAxisLst.length - 1);
    var pec = orgVal / deg;
    var finalVal = orgVal - dec * pec + 20;
    return finalVal;
}

var cvs = document.getElementById('charts');
var ctx = cvs.getContext('2d');
cvs.height = preYAxisLst.length * intervalLine + 20
ctx.beginPath();
// ctx.font = '10px Arial';
ctx.fillStyle = 'white';
for(var i = 0; i < yAxisLst.length; i++){
    ctx.moveTo(0, 20 + i * intervalLine),
    ctx.lineTo(lineWid,  20 + i * intervalLine);
    ctx.fillText(yAxisLst[i], lineWid + 5, 24 + i * intervalLine)
}
ctx.lineWidth = 1;
ctx.strokeStyle = 'rgb(221,221,221)';
ctx.stroke();


ctx.beginPath();
ctx.font = '11px Arial'
ctx.fillStyle = 'white';
for(var j = 0; j < xAxisList.length; j++){
    ctx.moveTo(intervalRow * j, xAxis),
    ctx.lineTo(intervalRow * j, xAxis + 10);
    ctx.fillText(xAxisList[j], 0 + intervalRow * j, xAxis + 22)
}
ctx.lineWidth = 1.5;
ctx.strokeStyle = 'white';
ctx.stroke();


ctx.beginPath();
ctx.moveTo(2, valToCoor(dataList[0]));
for(var l = 1; l < dataList.length; l++){
    ctx.lineTo(intervalRow * l, valToCoor(dataList[l]));
}
ctx.strokeStyle = 'red';
ctx.stroke();

for(var k = 0; k < dataList.length; k++){
    var xVal = intervalRow * k;
    var yVal =  valToCoor(dataList[k])
    if(k == 0){
        xVal = 4;
    }
    ctx.beginPath();
    ctx.arc(xVal, yVal, 3, 0, 2*Math.PI)
    ctx.fillStyle = 'rgb(200,66,67)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(xVal, yVal, 2, 0, 2*Math.PI)
    ctx.fillStyle = 'white';
    ctx.fill();
}