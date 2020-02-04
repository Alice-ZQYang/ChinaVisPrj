var myChart4;

var bar_stacking;
(function(){
    bar_stacking = {
        show_barstack: function(site_id){
            Papa.parse('data/site/' + site_id + '_prov.csv', {
                download: true,
                complete: function(results) {
                    $("#view4").empty();
                    var tmpdata = results.data;
        
                    var prov = [];
                    var mannum = [];
                    var womannum = [];
                    for(var i = 1, _l = tmpdata.length - 1; i < _l; i++){
                        var item = tmpdata[i];
                        prov.push(item[0])
                        mannum.push(item[1]);
                        womannum.push(item[2]);
                    }
        
                    option = {
                        backgroundColor: '#323c48',
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {
                                type: 'shadow'
                            },
                            textStyle: {
                                fontFamily: '华文楷体',
                                color: '#fff'
                            }
                        },
                        legend: {
                            itemWidth:10,
                            //itemHeight:15,
                            orient: 'vertical',
                            x : 'left',
                            y : 'center',
                            borderColor: '#fff',
                            borderWidth: 1,
                            textStyle:{
                                fontFamily: '华文楷体',
                                fontSize:15,
                                color:'#fff'
                            },
                            data:['男性','女性'],
                            itemGap: 10
                        },
                        toolbox: {
                            show : true,
                            orient : 'vertical',
                            y : 'center',
                            feature : {
                                mark : {show: true},
                                magicType : {show: true, 
                                    type: ['line', 'bar', 'stack', 'tiled'],
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
                            }
                        },
                        calculable : true,
                        dataZoom : {
                            show : true,
                            realtime : true,
                            start : 0,
                            end : 40,
                            height: 10,
                            bottom: 2,
                            //fillerColor: "#191970",
                            fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{  
                                offset: 0,  
                                color: '#1eb5e5'  
                            }, {  
                                offset: 1,  
                                color: '#5ccbb1'  
                            }]),  
                            handleStyle: {  
                                borderColor: "#cacaca",  
                                borderWidth: "1",  
                                shadowBlur: 2,  
                                background: "#ddd",  
                                shadowColor: "#ddd",  
                            },  
                            backgroundColor: "#ddd"
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : prov,
                                axisLine: {
                                    lineStyle: {
                                        type: 'solid',
                                        color: '#fff',
                                        width:'2'
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '华文楷体',
                                        color: '#fff',
                                    }
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                splitArea : {show : true},
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
                            x: 100,
                            x2:40,
                            y2:35,
                            y: 10
                        },
                        series : [
                            {
                                name:'男性',
                                type:'bar',
                                stack: '总量',
                                itemStyle:{
                                    normal:{
                                        color:'#036564'
                                    }
                                },
                                data: mannum
                            },
                            {
                                name:'女性',
                                type:'bar',
                                stack: '总量',
                                itemStyle:{
                                    normal:{
                                        color:'#033649'
                                    }
                                },
                                data: womannum
                            }
                        ]
                    };
                    
                    if (myChart4 != null && myChart4 != "" && myChart4 != undefined) {
                        myChart4.dispose();
                    }
                    if (myChart != null && myChart != "" && myChart != undefined) {
                        myChart.dispose();
                    }
                    if (myChart2 != null && myChart2 != "" && myChart2 != undefined) {
                        myChart2.dispose();
                    }
                    myChart4 = echarts.init(document.getElementById('view4'));
                    myChart4.setOption(option);
                    
                    window.onresize = function () {
                        myChart4.resize();
                    };

                    myChart4.on('click', function (params) {
                        var provname = params.name;
                        city.get_city(provname);
                        map3.show_map(3, provname);
                        polyline.show_polyline(2, site_id, provname, 0, 0, "view5");
                        drawpie.show_pie(3, site_id, provname, 0, "pie");
                        clock.show_clock(3, site_id, provname, "view2");
                    });
                }
            });
        }
    }
})()