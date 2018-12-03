var svg=d3.select("body")
        .select("svg");

        var height=400;
        var width=600;
var padding = {top: 20, right: 20, bottom: 20, left: 20};
var rectStep=50;
var rectWidth=40;

var dataset=[10,50,30,15,40,20];
//比例尺
var xScale=d3.scale.ordinal()
             .domain(d3.range(dataset.length))
             .rangeRoundBands([0, width - padding.left - padding.right],0.2);

var yScale=d3.scale.linear()
             .domain([0,d3.max(dataset,function(d){
                 return d;
             })])
             .range([0,300]);



//排序
var change=function(obj){
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
var sortOrders=true;
var sortBars=function(){
    sortOrders=!sortOrders;
   change("rect");
   change("text");
   
};
var rect=svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
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
   })
   .on("click",function(){
       sortBars();
   });

var text=svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .attr("fill","white")
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

   