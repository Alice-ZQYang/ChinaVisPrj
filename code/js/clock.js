var myChart3;

var clock;
(function(){
    clock = {
        show_clock: function(type,bar_ID,province, clock_view){
            var filename = "data/clock/adult/clock_type";
            
            if (type == 0){
                filename = filename + "2/all.csv";
            }
            else if (type == 1){
                filename = filename + "1/" + bar_ID + ".csv";
            }
            else if (type == 2){
                filename = filename + "2/" + province + ".csv";
            }
            else if (type == 3){
                filename = filename + "3/" + province + "/" + bar_ID + ".csv";
            }
        
            Papa.parse(filename, {
        
                download: true,
        
                complete: function(results) {
                    var data = results.data;
        
                    var week_hour_value = new Array();
        
                    var max_value = 0;
                    var zoom = 0.02;
        
                    for (i = 1; i <= 7 ; i++){
                        weekday = data[i];
                        for (j = 0; j < 24 ; j++){
                            week = i - 1;
                            hour = j;
                            value = parseInt(weekday[j]);
                            max_value = Math.max(value,max_value);
                            week_hour_value.push([week,hour,value]);
                        }
                    }
        
                    zoom = 20.0 / max_value ;
        
                    var hours = ['00', '01', '02', '03', '04', '05', '06',
                        '07', '08', '09','10','11',
                        '12', '13', '14', '15', '16', '17',
                        '18', '19', '20', '21', '22', '23'];
        
                    var days = ['周一', '周二', '周三',
                        '周四', '周五', '周六', '周日'];
        
        
                    var filename = "data/clock/teen/clock_type";
        
                    if (type == 0){
                        filename = filename + "2/all.csv";
                    }
                    else if (type == 1){
                        filename = filename + "1/" + bar_ID + ".csv";
                    }
                    else if (type == 2){
                        filename = filename + "2/" + province + ".csv";
                    }
                    else if (type == 3){
                        filename = filename + "3/" + province + "/" + bar_ID + ".csv";
                    }
        
                    Papa.parse(filename, {
                        download: true,
        
                        complete: function(results) {
                            var data2 = results.data;
        
                            var week_hour_value2 = new Array();
        
                            var max_value2 = 0;
                            var zoom2 = 0.02;
        
                            for (i = 1; i <= 7 ; i++){
                                weekday = data2[i];
                                for (j = 0; j < 24 ; j++){
                                    week = i - 1;
                                    hour = j;
                                    value = parseInt(weekday[j]);
                                    max_value2 = Math.max(value,max_value2);
                                    week_hour_value2.push([week,hour,value]);
                                }
                            }
        
                            zoom2 = 20.0 / max_value2 ;
        
        
                            option = {
                                backgroundColor: '#323c48',
        
                                legend: {
                                    textStyle:{
                                        color:'#999',
                                    },
                                    data: ['成年人','未成年人'],
                                    left: 'right',
                                    textStyle: {
                                        fontFamily: '华文楷体',
                                        color: '#fff'
                                    }
                                },
                                polar: {},
                                tooltip: {
                                    formatter: function (params) {
                                        return '在' + days[params.value[0]] + '的' + hours[params.value[1]] + '点有' + params.value[2] + '名网吧用户';
                                    },
                                    textStyle: {
                                        fontFamily: '华文楷体',
                                        color: '#fff'
                                    }
                                },
                                angleAxis: {
                                    type: 'category',
                                    data: hours,
                                    boundaryGap: false,
                                    splitLine: {
                                        show: true,
                                        lineStyle: {
                                            color: '#fff',
                                            type: 'dashed'
                                        }
                                    },
                                    axisLine: {
                                        show: false,
                                    },
                                    axisLabel: {
                                        textStyle: {
                                            fontFamily: '华文楷体',
                                            color: '#fff'
                                        }
                                    },
                                },
                                radiusAxis: {
                                    type: 'category',
                                    data: days,
                                    axisLine: {
                                        show: false
                                    },
                                    axisLabel: {
                                        textStyle: {
                                            fontFamily: '华文楷体',
                                            color: '#fff'
                                        },
                                        rotate: 45
                                    },
                                },
                                series: [{
                                    name: '成年人',
                                    type: 'scatter',
                                    coordinateSystem: 'polar',
                                    symbolSize: function (val) {
                                        return val[2] * zoom;
                                    },
                                    data: week_hour_value,
                                    animationDelay: function (idx) {
                                        return idx * 5;
                                    },
                                    itemStyle: {
                                        normal: {
                                            color:'#BA2835'
                                        }
                                    },
                                },
                                    {
                                        name: '未成年人',
                                        type: 'scatter',
                                        coordinateSystem: 'polar',
                                        symbolSize: function (val) {
                                            return val[2] * zoom2;
                                        },
                                        data: week_hour_value2,
                                        animationDelay: function (idx) {
                                            return idx * 5;
                                        },
                                        itemStyle: {
                                            normal: {
                                                color:'#FFFF00'
                                            }
                                        },
                                    }]
                            };

                            if (myChart3 != null && myChart3 != "" && myChart3 != undefined) {
                                myChart3.dispose();
                            }
                            if (myChart2 != null && myChart2 != "" && myChart2 != undefined) {
                                myChart2.dispose();
                            }
                            
                            myChart3 = echarts.init(document.getElementById(clock_view));
                            myChart3.setOption(option);
                            window.onresize = function(){
                                myChart3.resize();
                            };
                        }
                    });
        
                }
            });
        }
    }
})();