var myChart;
var myChart1;
var myChart2;

year = 2016
var date = +echarts.number.parseDate(year + '-10-01');
var end = +echarts.number.parseDate((+year + 1) + '-01-01');
var dayTime = 3600 * 24 * 1000;
var data = [];
for (var time = date; time < end; time += dayTime) {
    data.push([
        echarts.format.formatTime('yyyy-MM-dd', time),
    ]);     
}

var alldate = [];
for(var i = 0; i < data.length; i++){
    alldate.push(data[i][0].slice(5,));
}   

var polyline;
(function(){
    polyline={
        show_polyline:function(type, site_id, prov, group_id, day, view){
            switch(type){
                //问题一中点击日历的某一天显示未成年人和总人数的在线人数
                case 1:
                    if(site_id == 0){
                        $("#view4").empty();
                    }
                    else{
                        Papa.parse('data/teen/' + site_id + '_duration.csv', {
                            download: true,
                            complete: function(results) {
                                var tmpdata = results.data;
                
                                var teendata = new Array();
                                for(var i = 1, _l = tmpdata.length - 1; i < _l; i++){
                                    var item = tmpdata[i];
                                    var tmp1 = [];
                                    for(var j = 0; j < 24; j++){
                                        tmp1.push(Number(item[j + 2]));
                                    }
                                    teendata.push(tmp1);
                                }
                                
                                Papa.parse('data/site_time/' + site_id + '_time.csv', {
                                    download: true,
                                    complete: function(results) {
                                        var tmp2data = results.data;
    
                                        var alldata = new Array();
                                        for(var i = 1, _l = tmp2data.length - 1; i < _l; i++){
                                            var item = tmp2data[i];
                                            var tmp = [];
                                            for(var j = 0; j < 24; j++){
                                                tmp.push(Number(item[j + 2]) + teendata[i - 1][j]);
                                            }
                                            alldata.push(tmp);
                                        }
                                        
                                        var thisdate = alldate[day];
                                        var datestring = thisdate.split('-')[0] + "." + thisdate.split('-')[1];
                                        
                                        if (myChart != null && myChart != "" && myChart != undefined) {
                                            myChart.dispose();
                                        }
                                        if (myChart4 != null && myChart4 != "" && myChart4 != undefined) {
                                            myChart4.dispose();
                                        }
                                        myChart = echarts.init(document.getElementById(view));
            
                                        option = {
                                            backgroundColor: '#323c48',
                                            title: {
                                                text: datestring + '实时在线人数',
                                                left: 'center',
                                                textStyle: {
                                                    fontFamily: '华文楷体',
                                                    color: '#fff'
                                                }
                                            },
                                            tooltip : {
                                                trigger: 'axis',
                                                textStyle: {
                                                    fontFamily: '华文楷体',
                                                    color: '#fff'
                                                }
                                            },
                                            legend: {
                                                left: 'left',
                                                data:[
                                                    {
                                                        name:'所有人',
                                                        textStyle:{
                                                            fontFamily: '华文楷体',
                                                            fontWeight:'bolder',
                                                            color:'#fff'
                                                        },
                                                        icon:'circle'
                                                    },
                                                    {
                                                        name:'未成年人',
                                                        textStyle:{
                                                            fontFamily: '华文楷体',
                                                            fontWeight:'bolder',
                                                            color:'#fff'
                                                        },
                                                        icon:'circle'
                                                    }
                                                ]
                                            },
                                            toolbox: {
                                                show : true,
                                                feature : {
                                                    mark : {show: true},
                                                    magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled'],
                                                        iconStyle: {
                                                            borderColor: '#FFB6C1'
                                                        },
                                                        emphasis:{
                                                            iconStyle: {
                                                                borderColor: '#FFB6C1'
                                                            },
                                                        }
                                                    },
                                                    restore : {show: true,
                                                        iconStyle: {
                                                            borderColor: '#00BFFF'
                                                        },
                                                        emphasis:{
                                                            iconStyle: {
                                                                borderColor: '#00BFFF'
                                                            },
                                                        }
                                                    },
                                                    saveAsImage : {show: true,
                                                        iconStyle: {
                                                            borderColor: '#7CFC00'
                                                        },
                                                        emphasis:{
                                                            iconStyle: {
                                                                borderColor: '#7CFC00'
                                                            },
                                                        }
                                                    }
                                                },
                                            },
                                            calculable : true,
                                            xAxis : [
                                                {
                                                    type : 'category',
                                                    boundaryGap : false,
                                                    data : ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
                                                    axisLine: {
                                                        lineStyle: {
                                                            type: 'solid',
                                                            color: '#fff',
                                                            width:'2'
                                                        }
                                                    },
                                                    axisLabel: {
                                                        textStyle: {
                                                            color: '#fff',
                                                        }
                                                    }
                                                }
                                            ],
                                            yAxis : [
                                                {
                                                    type : 'value',
                                                    axisLine: {
                                                        lineStyle: {
                                                            type: 'solid',
                                                            color: '#fff',
                                                            width:'2'
                                                        }
                                                    },
                                                    axisLabel: {
                                                        textStyle: {
                                                            color: '#fff',
                                                        }
                                                    }
                                                }
                                            ],
                                            grid: {
                                                x2:10,
                                                y2:20,
                                                y:30,
                                                x:40
                                            },
                                            series : [
                                                {
                                                    name:'所有人',
                                                    type:'line',
                                                    itemStyle: {
                                                        normal: {
                                                            areaStyle: {
                                                                type: 'default'
                                                            },
                                                            color:'#995054'
                                                        }
                                                    },
                                                    data: alldata[day]
                                                },
                                                {
                                                    name:'未成年人',
                                                    type:'line',
                                                    itemStyle: {
                                                        normal: {
                                                            areaStyle: {
                                                                type: 'default'
                                                            },
                                                            color:'#D96831'
                                                        }
                                                    },
                                                    data: teendata[day]
                                                }
                                            ]
                                        };
                        
                                        myChart.setOption(option);
                                    
                                        window.onresize = function () {
                                            myChart.resize();
                                        };  
                                    }
                                });
                            }
                        });  
                    }      
                    break;
                
                //问题二中点击相应省份显示对应的所有人和男性一天24小时的在线情况
                case 2:
                    Papa.parse('data/site/' + site_id + '_prov.csv', {
                        download: true,
                        complete: function(results) {
                            var tmpdata = results.data;
                            
                            var allprov = new Array();
                            var allpeople = new Array();
                            var manonly = new Array();
                            
                            for(var i = 1, _l = tmpdata.length - 1; i < _l; i++){
                                var item = tmpdata[i];
                                var tmp1 = [];
                                var tmp2 = [];
                                for(var j = 0; j < 24; j++){
                                    tmp1.push(Number(item[j + 11]));
                                    tmp2.push(Number(item[j + 35])); 
                                }
                                allprov.push(item[0]);
                                allpeople.push(tmp1);
                                manonly.push(tmp2);
                            }

                            var index;
                            if(prov == 0){
                                index = 0;
                            }
                            else{
                                index = allprov.indexOf(prov);
                            }

                            if (myChart1 != null && myChart1 != "" && myChart1 != undefined) {
                                myChart1.dispose();
                            }
                            if (myChart5 != null && myChart5 != "" && myChart5 != undefined) {
                                myChart5.dispose();
                            }
                            if (myChart8 != null && myChart8 != "" && myChart8 != undefined) {
                                myChart8.dispose();
                            }
                            myChart1 = echarts.init(document.getElementById(view));

                            option = {
                                backgroundColor: '#323c48',
                                title: {
                                    text: allprov[index] + ': 各时间段在线人数',
                                    left: 'center',
                                    textStyle: {
                                        fontFamily: '华文楷体',
                                        color: '#fff'
                                    }
                                },
                                tooltip : {
                                    trigger: 'axis',
                                    textStyle: {
                                        fontFamily: '华文楷体',
                                        color: '#fff'
                                    }
                                },
                                legend: {
                                    left: 'left',
                                    data:[
                                        {
                                            name:'所有人',
                                            textStyle:{
                                                fontFamily: '华文楷体',
                                                fontWeight:'bolder',
                                                color:'#fff'
                                            },
                                            icon:'circle'
                                        },
                                        {
                                            name:'男性',
                                            textStyle:{
                                                fontFamily: '华文楷体',
                                                fontWeight:'bolder',
                                                color:'#fff'
                                            },
                                            icon:'circle'
                                        }
                                    ]
                                },
                                toolbox: {
                                    show : true,
                                    feature : {
                                        mark : {show: true},
                                        magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled'],
                                            iconStyle: {
                                                borderColor: '#FFB6C1'
                                            },
                                            emphasis:{
                                                iconStyle: {
                                                    borderColor: '#FFB6C1'
                                                },
                                            }
                                        },
                                        restore : {show: true,
                                            iconStyle: {
                                                borderColor: '#00BFFF'
                                            },
                                            emphasis:{
                                                iconStyle: {
                                                    borderColor: '#00BFFF'
                                                },
                                            }
                                        },
                                        saveAsImage : {show: true,
                                            iconStyle: {
                                                borderColor: '#7CFC00'
                                            },
                                            emphasis:{
                                                iconStyle: {
                                                    borderColor: '#7CFC00'
                                                },
                                            }
                                        }
                                    },
                                },
                                calculable : true,
                                xAxis : [
                                    {
                                        type : 'category',
                                        boundaryGap : false,
                                        data : ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
                                        axisLine: {
                                            lineStyle: {
                                                type: 'solid',
                                                color: '#fff',
                                                width:'2'
                                            }
                                        },
                                        axisLabel: {
                                            textStyle: {
                                                color: '#fff',
                                            }
                                        }
                                    }
                                ],
                                yAxis : [
                                    {
                                        type : 'value',
                                        axisLine: {
                                            lineStyle: {
                                                type: 'solid',
                                                color: '#fff',
                                                width:'2'
                                            }
                                        },
                                        axisLabel: {
                                            textStyle: {
                                                color: '#fff',
                                            }
                                        }
                                    }
                                ],
                                grid: {
                                    x2:10,
                                    y2:20,
                                    y:30,
                                    x:40
                                },
                                series : [
                                    {
                                        name:'所有人',
                                        type:'line',
                                        itemStyle: {
                                            normal: {
                                                areaStyle: {
                                                    type: 'default'
                                                },
                                                color:'#995054'
                                            }
                                        },
                                        data: allpeople[index]
                                    },
                                    {
                                        name:'男性',
                                        type:'line',
                                        itemStyle: {
                                            normal: {
                                                areaStyle: {
                                                    type: 'default'
                                                },
                                                color:'#D96831'
                                            }
                                        },
                                        data: manonly[index]
                                    }
                                ]
                            };
            
                            myChart1.setOption(option);
                        
                            window.onresize = function () {
                                myChart1.resize();
                            };  
                        }
                    });
                    break;
                
                //问题三中团伙信息的分析
                case 3:
            
                    break;
                
                //问题四中网吧画像，显示每个网吧24小时的在线人数
                case 4:
                    Papa.parse('data/site_general.csv', {
                        download: true,
                        complete: function(results) {
                            var tmpdata = results.data;
                            
                            var row;
                            for(var i = 1, _l = tmpdata.length - 1; i < _l; i++){
                                var item = tmpdata[i];
                                if(Number(item[0]) == site_id){
                                    row = i;
                                    break;
                                }
                            }
                            console.log(slidebox);
                            console.log(row);

                            var thisrow = tmpdata[row];

                            var teeninfo = new Array();
                            var allinfo = new Array();
                            for(var i = 0; i < 24; i++){
                                teeninfo.push(Number(thisrow[i + 27]));
                                allinfo.push(Number(thisrow[i + 2]) + teeninfo[i]);
                            }
                            
                            if (myChart2 != null && myChart2 != "" && myChart2 != undefined) {
                                myChart2.dispose();
                            }
                            if (myChart4 != null && myChart4 != "" && myChart4 != undefined) {
                                myChart4.dispose();
                            }

                            myChart2 = echarts.init(document.getElementById(view));

                            option = {
                                backgroundColor: '#323c48',
                                title: {
                                    text: '各时间段在线人数',
                                    left: 'center',
                                    textStyle: {
                                        fontFamily: '华文楷体',
                                        color: '#fff'
                                    }
                                },
                                tooltip : {
                                    trigger: 'axis',
                                    textStyle: {
                                        fontFamily: '华文楷体',
                                        color: '#fff'
                                    }
                                },
                                legend: {
                                    left: 'left',
                                    data:[
                                        {
                                            name:'所有人',
                                            textStyle:{
                                                fontFamily: '华文楷体',
                                                fontWeight:'bolder',
                                                color:'#fff'
                                            },
                                            icon:'circle'
                                        },
                                        {
                                            name:'男性',
                                            textStyle:{
                                                fontFamily: '华文楷体',
                                                fontWeight:'bolder',
                                                color:'#fff'
                                            },
                                            icon:'circle'
                                        }
                                    ]
                                },
                                toolbox: {
                                    show : true,
                                    feature : {
                                        mark : {show: true},
                                        magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled'],
                                            iconStyle: {
                                                borderColor: '#FFB6C1'
                                            },
                                            emphasis:{
                                                iconStyle: {
                                                    borderColor: '#FFB6C1'
                                                },
                                            }
                                        },
                                        restore : {show: true,
                                            iconStyle: {
                                                borderColor: '#00BFFF'
                                            },
                                            emphasis:{
                                                iconStyle: {
                                                    borderColor: '#00BFFF'
                                                },
                                            }
                                        },
                                        saveAsImage : {show: true,
                                            iconStyle: {
                                                borderColor: '#7CFC00'
                                            },
                                            emphasis:{
                                                iconStyle: {
                                                    borderColor: '#7CFC00'
                                                },
                                            }
                                        }
                                    },
                                },
                                calculable : true,
                                xAxis : [
                                    {
                                        type : 'category',
                                        boundaryGap : false,
                                        data : ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
                                        axisLine: {
                                            lineStyle: {
                                                type: 'solid',
                                                color: '#fff',
                                                width:'2'
                                            }
                                        },
                                        axisLabel: {
                                            textStyle: {
                                                color: '#fff',
                                            }
                                        }
                                    }
                                ],
                                yAxis : [
                                    {
                                        type : 'value',
                                        axisLine: {
                                            lineStyle: {
                                                type: 'solid',
                                                color: '#fff',
                                                width:'2'
                                            }
                                        },
                                        axisLabel: {
                                            textStyle: {
                                                color: '#fff',
                                            }
                                        }
                                    }
                                ],
                                grid: {
                                    x2:10,
                                    y2:20,
                                    y:30,
                                    x:40
                                },
                                series : [
                                    {
                                        name:'所有人',
                                        type:'line',
                                        itemStyle: {
                                            normal: {
                                                areaStyle: {
                                                    type: 'default'
                                                },
                                                color:'#995054'
                                            }
                                        },
                                        data: allinfo
                                    },
                                    {
                                        name:'男性',
                                        type:'line',
                                        itemStyle: {
                                            normal: {
                                                areaStyle: {
                                                    type: 'default'
                                                },
                                                color:'#D96831'
                                            }
                                        },
                                        data: teeninfo
                                    }
                                ]
                            };
            
                            myChart2.setOption(option);
                        
                            window.onresize = function () {
                                myChart2.resize();
                            };  
                            
                            
                        }
                    });
                    break;
            }
        }
    }
})()