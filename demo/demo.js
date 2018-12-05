

var nums=document.getElementById("arrayInput");
var btnArray=document.getElementById("btnSubmit");
function getInputArray(){
    return nums.value;
}
var svg=d3.select("body")
        .select("svg");

        var height=400;
         var width=600;
var padding = {top: 20, right: 20, bottom: 20, left: 20};
var rectStep=50;
var rectWidth=40;
var xScale;
var yScale;
var rect;
var text;
var sortOrders=true;
//确定数据集
var dataset=[20,30,25,40];
function setArray(){
    var arrayNums=getInputArray();
    if(arrayNums===""){
        dataset=dataset;
    }else{
    var arr=arrayNums.split(",");
    var arr2=arr.map(element => {
        return parseInt(element);
    });
    console.log(arr2);
    dataset=arr2;
    }

    console.log(dataset);
    
}


btnArray.onclick=function(){
    setArray();

    //删除原来的矩形和数字
    rect.remove();
    text.remove();
    //重建
    setXScale();
setYScale();
    createRect();
createText();
}


//比例尺

setXScale();
setYScale();

console.log(dataset);
//创建矩形和文本内容
createRect();
createText();



function createRect(){
    rect=svg.selectAll("rect")
    .data(dataset)
       .enter()
       .append("rect");
    
       rect.data(dataset)
       .attr("fill","red")
       .attr("x",function(d,i){
           return padding.left+xScale(i);
       })
       .attr("y",function(d,i){
           return height-padding.bottom-yScale(d);
       })
       .attr("width",xScale.rangeBand())
       .attr("height",function(d){
           return yScale(d);
       });
       rect.data(dataset)
       .exit()
       .remove();
       
}

function createText(){
    text=svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text");

    text.attr("fill","white")
    .attr("font-size","14px")
    .attr("text-anchor","middle")
    .attr("x",function(d,i){
        return padding.left + xScale(i);
    })
    .attr("y",function(d){
        return height - padding.bottom - yScale(d);
    })
    .attr('dx', xScale.rangeBand()/2)   //x轴相对平移距离
    .attr('dy', "1em")  //em单位表示的是当前文字所占一行的高度
    .text(function(d){  //要显示的文字内容
        return d;
    });
}

   
//比例尺
            function setXScale(){
                xScale=d3.scale.ordinal()
                .domain(d3.range(dataset.length))
                .rangeRoundBands([0, width - padding.left - padding.right],0.2);
            
            
            
            }
            function setYScale(){
            
                yScale=d3.scale.linear()
                .domain([0,d3.max(dataset,function(d){
                    return d;
                })])
                .range([0,300]);
            }
            
            //排序
            function change(obj){
                svg.selectAll(obj)
                .sort(function(a,b){
                    if(sortOrders){
                        return d3.ascending(a,b);
                    }else{
                        return d3.descending(a,b);
                    }
                })
                .transition()
                .duration(1000)
                .attr("x",function(d,i){
                    return xScale(i);
                })
            };
            function sortBars(){
                sortOrders=!sortOrders;
               change("rect");
               change("text");
               
            };