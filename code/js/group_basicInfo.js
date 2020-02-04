var myChart2;

var group_basicInfo;
(function(){
    group_basicInfo = {
        show_info: function(GroupID){
                //设置窗口大小/位置
    $("#view2").empty();
    var $bmDiv=$("#view2");
    var svgwidth=$bmDiv.width();
    var svgheight=$bmDiv.height();
    var margin = {top: 30, right: 10, bottom: 10, left: 10};
    var width = svgwidth - margin.left - margin.right;
    var height = svgheight - margin.top - margin.bottom;

    var dom = document.getElementById("view2");
    var app = {};
    option = null;
    app.title = '嵌套环形图';

    if (myChart2 != null && myChart2 != "" && myChart2 != undefined) {
        myChart2.dispose();
    }
    if (myChart3 != null && myChart3 != "" && myChart3 != undefined) {
        myChart3.dispose();
    }
    // 基于准备好的dom，初始化echarts实例
    myChart2 = echarts.init(dom,'dark');
    // 矢量图标定义
    var symb =  'path://M29.902,23.275c1.86,0,3.368-1.506,3.368-3.365c0-1.859-1.508-3.365-3.368-3.365 c-1.857,0-3.365,1.506-3.365,3.365C26.537,21.769,28.045,23.275,29.902,23.275z M36.867,30.74c-1.666-0.467-3.799-1.6-4.732-4.199 c-0.932-2.6-3.131-2.998-4.797-2.998s-7.098,3.894-7.098,3.894c-1.133,1.001-2.1,6.502-0.967,6.769 c1.133,0.269,1.266-1.533,1.934-3.599c0.666-2.065,3.797-3.466,3.797-3.466s0.201,2.467-0.398,3.866 c-0.599,1.399-1.133,2.866-1.467,6.198s-1.6,3.665-3.799,6.266c-2.199,2.598-0.6,3.797,0.398,3.664 c1.002-0.133,5.865-5.598,6.398-6.998c0.533-1.397,0.668-3.732,0.668-3.732s0,0,2.199,1.867c2.199,1.865,2.332,4.6,2.998,7.73 s2.332,0.934,2.332-0.467c0-1.401,0.269-5.465-1-7.064c-1.265-1.6-3.73-3.465-3.73-5.265s1.199-3.732,1.199-3.732 c0.332,1.667,3.335,3.065,5.599,3.399C38.668,33.206,38.533,31.207,36.867,30.74z';
    var labelSetting = {
        normal: {
            show: true,
            position: 'right',
            offset: [10, 0],
            textStyle: {
                fontSize: 16
            }
        }
    };
    var series =
        [
            {
                name: '女',
                type: 'pictorialBar',
                barGap: '1%',
                label: labelSetting,
                //yAxisIndex:1,
                symbolRepeat: true,
                symbolSize: ['80%', '60%'],
                data: [
                    {
                        value: 0,
                        symbol: symb
                    },
                    {
                        value: 0
                        //symbol: symb

                    }
                ]
            },
            {
                name: '男',
                type: 'pictorialBar',
                label: labelSetting,
                symbolRepeat: true,
                symbolSize: ['80%', '60%'],
                barCategoryGap: '10%',
                data: [{
                    value: 0,
                    symbol: symb

                },{
                    value: 0,
                    //symbol: symb

                }
                ]
            },
            {
                name: '<= 18岁',
                type: 'pictorialBar',
                barGap: '1%',
                label: labelSetting,
                //yAxisIndex:1,
                symbolRepeat: true,
                symbolSize: ['80%', '60%'],
                data: [
                    { value: 0,
                        symbol: symb},
                    {
                        value: 0,
                        symbol: symb
                    }
                ]
            },
            {
                name: '19~25岁',
                type: 'pictorialBar',
                barGap: '1%',
                label: labelSetting,
                //yAxisIndex:1,
                symbolRepeat: true,
                symbolSize: ['80%', '60%'],
                data: [
                    { value: 0,
                        symbol: symb},
                    {
                        value: 0,
                        symbol: symb
                    }
                ]
            },
            {
                name: '26~30岁',
                type: 'pictorialBar',
                barGap: '1%',
                label: labelSetting,
                //yAxisIndex:1,
                symbolRepeat: true,
                symbolSize: ['80%', '60%'],
                data: [
                    { value: 0,
                        symbol: symb},
                    {
                        value: 0,
                        symbol: symb
                    }
                ]
            },
            {
                name: '>30岁',
                type: 'pictorialBar',
                barGap: '1%',
                label: labelSetting,
                //yAxisIndex:1,
                symbolRepeat: true,
                symbolSize: ['80%', '60%'],
                data: [
                    { value: 0,
                        symbol: symb},
                    {
                        value: 0,
                        symbol: symb
                    }
                ]
            }

        ];
    
    
    
        d3.csv("./data/group_info.csv", function (error, info) {
            members = [];
            //group_info = [];
            for (var i=0; i<info.length; i++){
                //更新团伙成员信息
                if (info[i]["GroupID"] === GroupID){
                    //group_info.push(info[i]);
                    //更新团伙成员列表id
                    if ($.inArray(info[i]["PersonID"], members) === -1){
                        members.push(info[i]["PersonID"]);
                        //更新年龄
                        age = 2017 - Number(info[i]["Birthday"].slice(0,4));
                        if (age <= 18){
                            series[2].data[1].value += 1;
                        }
                        else if (age<=25){
                            series[3].data[1].value += 1;
                        }
                        else if (age<=30){
                            series[4].data[1].value += 1;
                        }
                        else{
                            series[5].data[1].value += 1;
                        }
                        //更新性别
                        if (info[i]["Gender"] === '女'){
                            series[0].data[0].value += 1;
                        }
                        else{
                            series[1].data[0].value += 1;
                        }
                    }
    
    
    
                }
    
            }
    
    
            option = {
                backgroundColor: '#323c48',
                legend: {
                    textStyle:{
                        color:'#fff',
                        fontFamily: '华文楷体'
                    },
                    data: ['男', '女','<= 18岁','19~25岁','26~30岁','>30岁'],
                    x: 'center'
                },
                tooltip: {
                    textStyle:{
                        color:'#fff',
                        fontFamily: '华文楷体'
                    },
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    containLabel: true,
                    left: 20
                },
                yAxis: {
                    data: ['性别组成','年龄组成'],
                    inverse: true,
                    axisLine: {show: false},
                    axisTick: {show: false},
                    axisLabel: {
                        margin: 30,
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    axisPointer: {
                        label: {
                            show: true,
                            margin: 30
                        }
                    }
                },
                xAxis: {
                    splitLine: {show: false},
                    axisLabel: {show: false},
                    axisTick: {show: false},
                    axisLine: {show: false}
                },
                series: series
            };
            if (option && typeof option === "object") {
                myChart2.setOption(option, true);
            }
        });
        }
    }
})();