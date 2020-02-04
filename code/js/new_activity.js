var myChart10;

var activity;
(function(){
    activity = {
        show_activity: function(GroupID){
            //设置窗口大小/位置
    //var $bmDiv=$("#top-right-bottom-div");

    var $bmDiv=$("#activitydiv");
    var svgwidth=$bmDiv.width();
    var svgheight=$bmDiv.height();
    var margin = {top: 10, right: 10, bottom: 10, left: 10};
    var width = svgwidth - margin.left - margin.right;
    var height = svgheight - margin.top - margin.bottom;

    var dom = document.getElementById("activitydiv");
    //var myChart10 = echarts.init(dom,'light',opts = {width:width, height:height});
    var app = {};
    option = null;
    app.title = '嵌套环形图';

    if (myChart10 != null && myChart10 != "" && myChart10 != undefined) {
        myChart10.dispose();
    }
    if (myChart3 != null && myChart3 != "" && myChart3 != undefined) {
        myChart3.dispose();
    }
    // 基于准备好的dom，初始化echarts实例
    myChart10 = echarts.init(dom,'dark');


    d3.csv("./data/group_info.csv",function (error, info) {
        group_info = [];
        members = [];
        console.log(info)
        var xMin = "2018/06/18 00:00:00";
        var xMax = "2000/01/01 00:00:00";
        for (var i=0; i<info.length; i++){
            if (info[i]["GroupID"] === GroupID){
                //转换时间字符串
                //console.log(info[i]["GroupID"])
                start_time = ConvertTime(String(info[i]["OnLineTime"]));
                end_time = ConvertTime(String(info[i]["OffLineTime"]));
                //console.log(start_time)
                info[i]["OnLineTime"] = start_time;
                info[i]["OffLineTime"] = end_time;
                group_info.push(info[i]);
                //判断坐标轴范围
                if (start_time < xMin){
                    xMin = start_time;
                }
                if (end_time > xMax){
                    xMax = end_time;
                }
                //更新团伙成员列表id
                if ($.inArray(info[i]["PersonID"], members) === -1){
                    members.push(info[i]["PersonID"]);
                }
            }
        }

        var count = 70;
        var intervalCount = 67;
        var baseTop = 15;
        member_num = members.length;
        var gridHeight = height/(member_num+4);



        //初始化数据
        var data = [];
        var color = d3.scaleOrdinal(d3.schemeCategory20);
        for (var i=0; i<members.length; i++){
            data.push({});
            data[i].name = members[i];
            data[i].type = "line";
            data[i].value = 0;
            data[i].symbol = "circle";
            data[i].symbolSize = 2;
            data[i].markArea = {
                itemStyle: {
                    normal: {
                        //color: 'yellow',
                        //borderColor: 'yellow',
                        borderWidth: 3,
                        height:gridHeight-6
                    }
                },
                data: []
            };
            //data[i].time = [];
            data[i].xAxisIndex =  i+1;
            data[i].yAxisIndex =  i+1;

        }

        for (var i=0; i<group_info.length; i++){
            idx = members.indexOf(group_info[i]["PersonID"]);
            data[idx].markArea.data.push([{xAxis: group_info[i]["OnLineTime"]}, {xAxis: group_info[i]["OffLineTime"]}]);
            //data[idx].value = group_info[i]["duration"]
        }


        //console.log(data);

        // 坐标轴设置
        yAx = [makeYAxis(0,{name: "在线人数"})];
        xAx = [makeXAxis(0)];
        for (var i=0; i<members.length; ++i){
            yAx.push(
                makeYAxis(i+1,{name:members[i]})
            );
            xAx.push(makeXAxis(i+1));
        }
        yAx.push(makeYAxis(members.length+1));
        xAx.push(makeXAxis(members.length+1, {
            position: 'bottom',
            axisLine: {show: false, onZero: false},
            splitLine: {show: false},
            axisLabel: {
                show: true,
                textStyle: {color: 'white'},
                },
            axisPointer: {
                show: true,
                lineStyle: {
                    color: '#478cf1',
                    width: 1
                }
            }

        }));

        //legend设置
        var legend = [];
        for (var i=0; i<members.length; i++){
            legend.push({});
            legend[i].name = members[i];
            legend[i].icon = 'circle';
            //legend[i].color = 'red'
        }

        //grid设置
        grid = [];
        //中间的grid
        for (var i=0; i<=members.length; i++){
            grid.push(
                makeGrid(baseTop + gridHeight * i)
            );

        }
        //边框
        grid.push(makeGrid(baseTop+gridHeight, {
            show: true,
            height: gridHeight * (members.length),
            borderColor: '#ddd',
            borderWidth: 0.5,
            z: 10
        }));

        function makeXAxis(gridIndex, opt) {
            return echarts.util.merge({
                type: 'time',
                gridIndex: gridIndex,
                axisLine: {onZero: true, lineStyle: {color: '#ddd'}},
                axisTick: {show: false},
                axisLabel: {show: false},
                splitLine: {show: false, lineStyle: {color: '#ddd'}},
                min: xMin,//data.xMin,
                max: xMax,//"data.xMax,
                axisPointer: {
                    lineStyle: {color: 'transparent'}
                }
            }, opt || {}, true);
        }

        function makeYAxis(gridIndex, opt) {
            return echarts.util.merge({
                type: 'value',
                gridIndex: gridIndex,
                nameLocation: 'left',
                nameTextStyle: {
                    color: '#323c48'
                },
                boundaryGap: ['30%', '30%'],
                axisTick: {show: false},
                axisLine: {lineStyle: {color: '#323c48'}},
                //axisLabel: {show: true,rotate:60},
                splitLine: {show: false}
            }, opt || {}, true);
        }

        function makeGrid(top, opt) {
            return echarts.util.merge({
                top: top,
                height: gridHeight
            }, opt || {}, true);
        }

        option = {
            backgroundColor: '#323c48',
            tooltip: {
                formatter: function (params) {
                    var d = 0;
                    for (var i=0; i<group_info.length; i++){

                        if (group_info[i]['PersonID'] === params.seriesName && group_info[i]['OnLineTime'] === params.data.coord[0][0]){

                            d = group_info[i]['duration'];
                            break;
                        }
                    }

                    return params.marker + params.seriesName + '<br/>'
                        + "上线时间: " + params.data.coord[0][0] + '<br/>'
                        + "下线时间: " + params.data.coord[1][0] + '<br/>'
                        + "上网时长: " + d
                        ;

                }
            },
            axisPointer: {
                link: [{xAxisIndex: 'all'}],
                snap: true,
            },
            legend: {
                data: legend,//members,
                type: 'scroll',
                x: 'center',
                top: 2,
                //bottom: 20,
            },
            grid: grid,
            xAxis: xAx,
            yAxis: yAx,
            dataZoom: [{
                height: 20,
                type: 'slider',
                top: baseTop + gridHeight * (member_num+2)+10,
                xAxisIndex: range(member_num+1),
            }, {
                type: 'inside',
                xAxisIndex: range(member_num+1)
    }],
            series: data
        };
        if (option && typeof option === "object") {
            myChart10.setOption(option, true);
        }
    })
        }
    }
})();

function ConvertTime(s) {
    var year = s.slice(0,4);
    var month = s.slice(4,6);
    var day = s.slice(6,8);
    var hour = s.slice(8,10);
    var min = s.slice(10,12);
    var sec = s.slice(12,14);
    var t = "";
    t =  t.concat(year, "/", month, "/", day, " ", hour, ":", min, ":", sec);
    return t;
}

function range(num) {
    var a = []
    for (var i=0; i<num; i++){
        a.push(i)
    }
    return a;
}
