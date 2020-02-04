var myChart5;

var calendar;
(function(){
    calendar = {
        show_calendar: function(site_id){
            if(document.getElementById("select_b")){
                var select_box = document.getElementById("select_b");  
                select_box.parentNode.removeChild(select_box);  
            }
            var parent = document.getElementById("bottom-right-div");
            var div = document.createElement("div");
            div.setAttribute("class","select_box");
            div.setAttribute("id","select_b");
            var mySelect = document.createElement("select");  
            mySelect.setAttribute("id", "mysel");
            mySelect.setAttribute("onchange", "display(" + site_id + ")");
            div.appendChild(mySelect);  
            parent.appendChild(div);
            
            var firstOption = document.createElement("option");  
            firstOption.value = "---select---";  
            firstOption.text = "---请选择---";  
            mySelect.appendChild(firstOption);  

            var id = new Array(1, 2, 3, 4);
            var value = new Array("1-3","4-6","7-9","10-12");

            for(var x = 0; x < id.length; x++){
                var option = document.createElement("option");
                option.setAttribute("value",id[x]);
                option.appendChild(document.createTextNode(value[x]));
                mySelect.appendChild(option);
            }

            year = 2016
            var date = +echarts.number.parseDate(year + '-10-01');
            var end = +echarts.number.parseDate((+year + 1) + '-01-01');
            var dayTime = 3600 * 24 * 1000;
            var data = [];
            var cnt = 0;
            for (var time = date; time < end; time += dayTime) {
                cnt += 1
                data.push([
                    echarts.format.formatTime('yyyy-MM-dd', time),
                    0
                ]);     
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
            myChart5 = echarts.init(document.getElementById('view5'));

            option = {
                backgroundColor: '#323c48',
            
                title: {
                    top: 5,
                    text: '上网时长分布',
                    left: 'center',
                    textStyle: {
                        fontFamily: '华文楷体',
                        color: '#fff'
                    }
                },
                tooltip : {
                    trigger: 'item'
                },
                legend: {
                    top: '7',
                    left: 'right',
                    data:['时长', 'Top 12'],
                    textStyle: {
                        fontFamily: '华文楷体',
                        color: '#fff'
                    }
                },
                calendar: [{
                    top: 65,
                    left: '40',
                    range: ['2016-10-01', '2016-10-31'],
                    orient: 'vertical',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#000',
                            width: 4,
                            type: 'solid'
                        }
                    },  
                    yearLabel: {show: false},
                    dayLabel: {
                        textStyle: {
                            fontFamily: 'Brush Script Std',
                            color: '#fff'
                        }
                    },
                    monthLabel: {
                        nameMap: 'cn',
                        textStyle: {
                            fontFamily: '邯郸串城体',
                            fontSize: 15,
                            color: '#fff'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#323c48',
                            borderWidth: 1,
                            borderColor: '#111'
                        }
                    }
                }, {
                    top: 65,
                    left: 'center',
                    range: ['2016-11-01', '2016-11-30'],
                    orient: 'vertical',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#000',
                            width: 4,
                            type: 'solid'
                        }
                    },
                    yearLabel: {show: false},
                    dayLabel: {
                        fontFamily: 'Brush Script Std',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    monthLabel: {
                        nameMap: 'cn',
                        textStyle: {
                            fontFamily: '邯郸串城体',
                            fontSize: 15,
                            color: '#fff'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#323c48',
                            borderWidth: 1,
                            borderColor: '#111'
                        }
                    }
                },{
                    top: 65,
                    right: '40',
                    range: ['2016-12-01', '2016-12-31'],
                    orient: 'vertical',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#000',
                            width: 4,
                            type: 'solid'
                        }
                    },
                    yearLabel: {show: false},
                    dayLabel: {
                        textStyle: {
                            fontFamily: 'Brush Script Std',
                            color: '#fff'
                        }
                    },
                    monthLabel: {
                        nameMap: 'cn',
                        textStyle: {
                            fontFamily: '邯郸串城体',
                            fontSize: 15,
                            color: '#fff'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#323c48',
                            borderWidth: 1,
                            borderColor: '#111'
                        }
                    }
                }],
                series : [
                    {
                        name: '时长',
                        type: 'scatter',
                        coordinateSystem: 'calendar',
                        data: data,
                        symbolSize: function (val) {
                            return val[1];
                        },
                        itemStyle: {
                            normal: {
                                color: '#ddb926'
                            }
                        }
                    },
                    {
                        name: '时长',
                        type: 'scatter',
                        coordinateSystem: 'calendar',
                        calendarIndex: 1,
                        data: data,
                        symbolSize: function (val) {
                            return val[1];
                        },
                        itemStyle: {
                            normal: {
                                color: '#ddb926'
                            }
                        }
                    },
                    {
                        name: '时长',
                        type: 'scatter',
                        coordinateSystem: 'calendar',
                        calendarIndex: 2,
                        data: data,
                        symbolSize: function (val) {
                            return val[1];
                        },
                        itemStyle: {
                            normal: {
                                color: '#ddb926'
                            }
                        }
                    },
                    {
                        name: 'Top 12',
                        type: 'effectScatter',
                        coordinateSystem: 'calendar',
                        data: data.sort(function (a, b) {
                            return b[1] - a[1];
                        }).slice(0, 12),
                        symbolSize: function (val) {
                            return val[1];
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        itemStyle: {
                            normal: {
                                color: '#f4e925',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        zlevel: 1
                    },
                    {
                        name: 'Top 12',
                        type: 'effectScatter',
                        coordinateSystem: 'calendar',
                        calendarIndex: 1,
                        data: data.sort(function (a, b) {
                            return b[1] - a[1];
                        }).slice(0, 12),
                        symbolSize: function (val) {
                            return val[1];
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        itemStyle: {
                            normal: {
                                color: '#f4e925',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        zlevel: 1
                    },
                    {
                        name: 'Top 12',
                        type: 'effectScatter',
                        coordinateSystem: 'calendar',
                        calendarIndex: 2,
                        data: data.sort(function (a, b) {
                            return b[1] - a[1];
                        }).slice(0, 12),
                        symbolSize: function (val) {
                            return val[1];
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        itemStyle: {
                            normal: {
                                color: '#f4e925',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        zlevel: 1
                    }
                ]
            };
        
            myChart5.setOption(option);
            window.onresize = function () {
                myChart5.resize();
            };

            myChart5.on('click', function (params) {
                var date = params.value[0];
                var target = date.slice(5, );
                var whichday = alldate.indexOf(target);

                polyline.show_polyline(1, 50010110000001, 0, 0, whichday, "view4");
            });
        }
    }
})()

function display(site_id){
    var type = document.getElementById("mysel");
    var grade = Number(type.options[type.selectedIndex].value);

    if(grade == 4){
        polyline.show_polyline(1, site_id, 0, 0, 0, "view4");
        Papa.parse('data/teen/' + site_id + '_duration.csv', {
            download: true,
            complete: function(results) {
                var tmpdata = results.data;
                
                var orgdata = [];
                var tmp = [];
                for(var i = 1, _l = tmpdata.length - 1; i < _l; i++){
                    var item = tmpdata[i];
                    orgdata.push(Number(item[1]));
                }
    
                var Max = Math.max.apply(null, orgdata)
                var Min = Math.min.apply(null, orgdata)
    
                var minus = Max - Min;
    
                year = 2016
                var date = +echarts.number.parseDate(year + '-10-01');
                var end = +echarts.number.parseDate((+year + 1) + '-01-01');
                var dayTime = 3600 * 24 * 1000;
                var data = [];
                var cnt = 0;
                for (var time = date; time < end; time += dayTime) {
                    cnt += 1
                    data.push([
                        echarts.format.formatTime('yyyy-MM-dd', time),
                        orgdata[cnt - 1]
                    ]);     
                }
    
                var alldate = [];
                for(var i = 0; i < data.length; i++){
                    alldate.push(data[i][0].slice(5,));
                }   
                
                if (myChart5 != null && myChart5 != "" && myChart5 != undefined) {
                    myChart5.dispose();
                }
                myChart5 = echarts.init(document.getElementById('view5'));
    
                option = {
                    backgroundColor: '#323c48',
                
                    title: {
                        top: 5,
                        text: '上网时长分布',
                        left: 'center',
                        textStyle: {
                            fontFamily: '华文楷体',
                            color: '#fff'
                        }
                    },
                    tooltip : {
                        textStyle: {
                            fontFamily: '华文楷体',
                            color: '#fff'
                        },
                        trigger: 'item'
                    },
                    legend: {
                        top: '7',
                        left: 'right',
                        data:['时长', 'Top 12'],
                        textStyle: {
                            fontFamily: '华文楷体',
                            color: '#fff'
                        }
                    },
                    calendar: [{
                        top: 65,
                        left: '40',
                        range: ['2016-10-01', '2016-10-31'],
                        orient: 'vertical',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#000',
                                width: 4,
                                type: 'solid'
                            }
                        },  
                        yearLabel: {show: false},
                        dayLabel: {
                            textStyle: {
                                fontFamily: 'Brush Script Std',
                                color: '#fff'
                            }
                        },
                        monthLabel: {
                            nameMap: 'cn',
                            textStyle: {
                                fontFamily: '邯郸串城体',
                                fontSize: 15,
                                color: '#fff'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#323c48',
                                borderWidth: 1,
                                borderColor: '#111'
                            }
                        }
                    }, {
                        top: 65,
                        left: 'center',
                        range: ['2016-11-01', '2016-11-30'],
                        orient: 'vertical',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#000',
                                width: 4,
                                type: 'solid'
                            }
                        },
                        yearLabel: {show: false},
                        dayLabel: {
                            fontFamily: 'Brush Script Std',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        monthLabel: {
                            nameMap: 'cn',
                            textStyle: {
                                fontFamily: '邯郸串城体',
                                fontSize: 15,
                                color: '#fff'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#323c48',
                                borderWidth: 1,
                                borderColor: '#111'
                            }
                        }
                    },{
                        top: 65,
                        right: '40',
                        range: ['2016-12-01', '2016-12-31'],
                        orient: 'vertical',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#000',
                                width: 4,
                                type: 'solid'
                            }
                        },
                        yearLabel: {show: false},
                        dayLabel: {
                            textStyle: {
                                fontFamily: 'Brush Script Std',
                                color: '#fff'
                            }
                        },
                        monthLabel: {
                            nameMap: 'cn',
                            textStyle: {
                                fontFamily: '邯郸串城体',
                                fontSize: 15,
                                color: '#fff'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#323c48',
                                borderWidth: 1,
                                borderColor: '#111'
                            }
                        }
                    }],
                    series : [
                        {
                            name: '时长',
                            type: 'scatter',
                            coordinateSystem: 'calendar',
                            data: data,
                            symbolSize: function (val) {
                                return (24 * (val[1] - Min) / minus);
                            },
                            itemStyle: {
                                normal: {
                                    color: '#ddb926'
                                }
                            }
                        },
                        {
                            name: '时长',
                            type: 'scatter',
                            coordinateSystem: 'calendar',
                            calendarIndex: 1,
                            data: data,
                            symbolSize: function (val) {
                                return (24 * (val[1] - Min) / minus);
                            },
                            itemStyle: {
                                normal: {
                                    color: '#ddb926'
                                }
                            }
                        },
                        {
                            name: '时长',
                            type: 'scatter',
                            coordinateSystem: 'calendar',
                            calendarIndex: 2,
                            data: data,
                            symbolSize: function (val) {
                                return (24 * (val[1] - Min) / minus);
                            },
                            itemStyle: {
                                normal: {
                                    color: '#ddb926'
                                }
                            }
                        },
                        {
                            name: 'Top 12',
                            type: 'effectScatter',
                            coordinateSystem: 'calendar',
                            data: data.sort(function (a, b) {
                                return b[1] - a[1];
                            }).slice(0, 12),
                            symbolSize: function (val) {
                                return (24 * (val[1] - Min) / minus);
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            itemStyle: {
                                normal: {
                                    color: '#f4e925',
                                    shadowBlur: 10,
                                    shadowColor: '#333'
                                }
                            },
                            zlevel: 1
                        },
                        {
                            name: 'Top 12',
                            type: 'effectScatter',
                            coordinateSystem: 'calendar',
                            calendarIndex: 1,
                            data: data.sort(function (a, b) {
                                return b[1] - a[1];
                            }).slice(0, 12),
                            symbolSize: function (val) {
                                return (24 * (val[1] - Min) / minus);
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            itemStyle: {
                                normal: {
                                    color: '#f4e925',
                                    shadowBlur: 10,
                                    shadowColor: '#333'
                                }
                            },
                            zlevel: 1
                        },
                        {
                            name: 'Top 12',
                            type: 'effectScatter',
                            coordinateSystem: 'calendar',
                            calendarIndex: 2,
                            data: data.sort(function (a, b) {
                                return b[1] - a[1];
                            }).slice(0, 12),
                            symbolSize: function (val) {
                                return (24 * (val[1] - Min) / minus);
                            },
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            itemStyle: {
                                normal: {
                                    color: '#f4e925',
                                    shadowBlur: 10,
                                    shadowColor: '#333'
                                }
                            },
                            zlevel: 1
                        }
                    ]
                };
            
                myChart5.setOption(option);
                window.onresize = function () {
                    myChart5.resize();
                };
    
                myChart5.on('click', function (params) {
                    var date = params.value[0];
                    var target = date.slice(5, );
                    var whichday = alldate.indexOf(target);
    
                    polyline.show_polyline(1, 50010110000001, 0, 0, whichday, "view4");
                });
            }
        }); 
    }
    else{
        $("#view4").empty();
        year = 2016
        var date = +echarts.number.parseDate(year + '-10-01');
        var end = +echarts.number.parseDate((+year + 1) + '-01-01');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        var cnt = 0;
        for (var time = date; time < end; time += dayTime) {
            cnt += 1
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                0
            ]);     
        }

        if (myChart5 != null && myChart5 != "" && myChart5 != undefined) {
            myChart5.dispose();
        }
        
        myChart5 = echarts.init(document.getElementById('view5'));

        option = {
            backgroundColor: '#323c48',
        
            title: {
                top: 5,
                text: '上网时长分布',
                left: 'center',
                textStyle: {
                    fontFamily: '华文楷体',
                    color: '#fff'
                }
            },
            tooltip : {
                trigger: 'item'
            },
            legend: {
                top: '7',
                left: 'right',
                data:['时长', 'Top 12'],
                textStyle: {
                    fontFamily: '华文楷体',
                    color: '#fff'
                }
            },
            calendar: [{
                top: 65,
                left: '40',
                range: ['2016-10-01', '2016-10-31'],
                orient: 'vertical',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#000',
                        width: 4,
                        type: 'solid'
                    }
                },  
                yearLabel: {show: false},
                dayLabel: {
                    textStyle: {
                        fontFamily: 'Brush Script Std',
                        color: '#fff'
                    }
                },
                monthLabel: {
                    nameMap: 'cn',
                    textStyle: {
                        fontFamily: '邯郸串城体',
                        fontSize: 15,
                        color: '#fff'
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#323c48',
                        borderWidth: 1,
                        borderColor: '#111'
                    }
                }
            }, {
                top: 65,
                left: 'center',
                range: ['2016-11-01', '2016-11-30'],
                orient: 'vertical',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#000',
                        width: 4,
                        type: 'solid'
                    }
                },
                yearLabel: {show: false},
                dayLabel: {
                    fontFamily: 'Brush Script Std',
                    textStyle: {
                        color: '#fff'
                    }
                },
                monthLabel: {
                    nameMap: 'cn',
                    textStyle: {
                        fontFamily: '邯郸串城体',
                        fontSize: 15,
                        color: '#fff'
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#323c48',
                        borderWidth: 1,
                        borderColor: '#111'
                    }
                }
            },{
                top: 65,
                right: '40',
                range: ['2016-12-01', '2016-12-31'],
                orient: 'vertical',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#000',
                        width: 4,
                        type: 'solid'
                    }
                },
                yearLabel: {show: false},
                dayLabel: {
                    textStyle: {
                        fontFamily: 'Brush Script Std',
                        color: '#fff'
                    }
                },
                monthLabel: {
                    nameMap: 'cn',
                    textStyle: {
                        fontFamily: '邯郸串城体',
                        fontSize: 15,
                        color: '#fff'
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#323c48',
                        borderWidth: 1,
                        borderColor: '#111'
                    }
                }
            }],
            series : [
                {
                    name: '时长',
                    type: 'scatter',
                    coordinateSystem: 'calendar',
                    data: data,
                    symbolSize: function (val) {
                        return val[1];
                    },
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    }
                },
                {
                    name: '时长',
                    type: 'scatter',
                    coordinateSystem: 'calendar',
                    calendarIndex: 1,
                    data: data,
                    symbolSize: function (val) {
                        return val[1];
                    },
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    }
                },
                {
                    name: '时长',
                    type: 'scatter',
                    coordinateSystem: 'calendar',
                    calendarIndex: 2,
                    data: data,
                    symbolSize: function (val) {
                        return val[1];
                    },
                    itemStyle: {
                        normal: {
                            color: '#ddb926'
                        }
                    }
                },
                {
                    name: 'Top 12',
                    type: 'effectScatter',
                    coordinateSystem: 'calendar',
                    data: data.sort(function (a, b) {
                        return b[1] - a[1];
                    }).slice(0, 12),
                    symbolSize: function (val) {
                        return val[1];
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                },
                {
                    name: 'Top 12',
                    type: 'effectScatter',
                    coordinateSystem: 'calendar',
                    calendarIndex: 1,
                    data: data.sort(function (a, b) {
                        return b[1] - a[1];
                    }).slice(0, 12),
                    symbolSize: function (val) {
                        return val[1];
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                },
                {
                    name: 'Top 12',
                    type: 'effectScatter',
                    coordinateSystem: 'calendar',
                    calendarIndex: 2,
                    data: data.sort(function (a, b) {
                        return b[1] - a[1];
                    }).slice(0, 12),
                    symbolSize: function (val) {
                        return val[1];
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    itemStyle: {
                        normal: {
                            color: '#f4e925',
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    zlevel: 1
                }
            ]
        };
    
        myChart5.setOption(option);
        window.onresize = function () {
            myChart5.resize();
        };

        myChart5.on('click', function (params) {
            var date = params.value[0];
            var target = date.slice(5, );
            var whichday = alldate.indexOf(target);

            polyline.show_polyline(1, 50010110000001, 0, 0, whichday, "view4");
        });
    }
}
