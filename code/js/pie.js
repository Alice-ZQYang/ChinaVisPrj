var myChart7;
var myChart9;

var drawpie;
(function(){
    drawpie = {
        show_pie: function(type, bar_ID, province, group_ID, pie_view){
            var num = new Array();
            var avgtime = new Array();
            var filename = "data/rose/rose_type";
            var key = province;
                
            if (type == 0){
                filename = filename + "2.csv";
                key = "all";
            }
            else if (type == 1){
                filename = filename + "1.csv";
                key = bar_ID;
            }
            else if (type == 2){
                filename = filename + "2.csv";
                key = province;
            }
            else if (type == 3){
                filename = filename + "3/" + bar_ID + ".csv";
                key = province;
            }
            else if (type == 4){//not completed
                key = group_ID;
            }
            
            Papa.parse(filename, {
        
                download: true,
        
                complete: function(results) {
                    var data = results.data;
                    
                    for (var i = 1; i < data.length ;i++){
                        prov = data[i]
                        if (prov[0] == key){
                            num[0] = parseInt(prov[1]);
                            num[1] = parseInt(prov[2]);
                            num[2] = parseInt(prov[3]);
                            num[3] = parseInt(prov[4]);
                            avgtime[0] = parseFloat(prov[5]);
                            avgtime[1] = parseFloat(prov[6]);
                            avgtime[2] = parseFloat(prov[7]);
                            avgtime[3] = parseFloat(prov[8]);
                            break;
                        };
                    };
                    
                    
                    option = {
                        backgroundColor: '#323c48',
                        
                        tooltip: {
                            textStyle:{
                                color:'#fff',
                                fontFamily: '华文楷体'
                            },
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: [
                            {
                                x : 'left',
                                top:'1%',
                                icon:'circle',
                                textStyle:{
                                    color:'#fff',
                                    fontFamily: '华文楷体'
                                },
                                data:['18-25岁','26-40岁']
                            },
                            {
                                x : 'left',
                                top:'9%',
                                icon:'circle',
                                textStyle:{
                                    color:'#fff',
                                    fontFamily: '华文楷体'
                                },
                                data:[,'41-60岁','>60岁'],
                            }],
                        series: [
                            {
                                name:'年龄分布',
                                type:'pie',
                                selectedMode: 'single',
                                center: ['50%', '60%'],
                                radius: [0, '30%'],
                                label: {
                                    normal: {
                                        textStyle:{
                                            color:'#fff',
                                            fontFamily: '华文楷体'
                                        },
                                        position: 'inner'
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data:[
                                    {value:num[0], name:'18-25', selected:true},
                                    {value:num[1], name:'26-40'},
                                    {value:num[2], name:'41-60'},
                                    {value:num[3], name:'61-'}
                                ]
                            },
                            {
                                name:'平均上网时间（小时）',
                                type:'pie',
                                radius: ['40%', '55%'],
                                center: ['50%', '60%'],
                                label: {
                                    normal: {
                                        textStyle:{
                                            color:'#fff',
                                            fontFamily: '华文楷体'
                                        },
                                    }
                                },
                                data:[
                                    {value:avgtime[0], name:'18-25岁'},
                                    {value:avgtime[1], name:'26-40岁'},
                                    {value:avgtime[2], name:'41-60岁'},
                                    {value:avgtime[3], name:'>60岁'}
                                ]
                            }
                        ]
                    };
                    
                    if (myChart7 != null && myChart7 != "" && myChart7 != undefined) {
                        myChart7.dispose();
                    }

                    myChart7 = echarts.init(document.getElementById(pie_view));
                    myChart7.setOption(option);
                    window.onresize = function(){
                        myChart7.resize();
                    };
                }
            });
        }
    }
})();

var drawpie2;
(function(){
    drawpie2 = {
        show_pie: function(type, bar_ID, province, group_ID, pie_view){
            var num = new Array();
            var avgtime = new Array();
            var filename = "data/rose/rose_type";
            var key = province;
                
            if (type == 0){
                filename = filename + "2.csv";
                key = "all";
            }
            else if (type == 1){
                filename = filename + "1.csv";
                key = bar_ID;
            }
            else if (type == 2){
                filename = filename + "2.csv";
                key = province;
            }
            else if (type == 3){
                filename = filename + "3/" + bar_ID + ".csv";
                key = province;
            }
            else if (type == 4){
                filename = filename + "4.csv";
                key = group_ID;
            }
            
            Papa.parse(filename, {
        
                download: true,
        
                complete: function(results) {
                    var data = results.data;
                    
                    for (var i = 1; i < data.length ;i++){
                        prov = data[i]
                        if (prov[0] == key){
                            num[0] = parseInt(prov[1]);
                            num[1] = parseInt(prov[2]);
                            num[2] = parseInt(prov[3]);
                            num[3] = parseInt(prov[4]);
                            avgtime[0] = parseFloat(prov[5]);
                            avgtime[1] = parseFloat(prov[6]);
                            avgtime[2] = parseFloat(prov[7]);
                            avgtime[3] = parseFloat(prov[8]);
                            break;
                        };
                    };
                    
                    legend_data = ['18-25岁','26-40岁','41-60岁','>60岁'];
                    
                    series_data1 = [
                                    {value:num[0], name:'18-25', selected:true},
                                    {value:num[1], name:'26-40'},
                                    {value:num[2], name:'41-60'},
                                    {value:num[3], name:'61-'}
                                ];
                    
                    series_data2 = [
                                    {value:avgtime[0], name:'18-25岁'},
                                    {value:avgtime[1], name:'26-40岁'},
                                    {value:avgtime[2], name:'41-60岁'},
                                    {value:avgtime[3], name:'>60岁'}
                                ];
                    
                    if (filename == "data/rose/rose_type4.csv"){
                        legend_data = ['18-25岁','26-40岁'];
                        series_data1 = [
                                    {value:num[0], name:'18-25', selected:true},
                                    {value:num[1], name:'26-40'}
                                ];
                    
                        series_data2 = [
                                    {value:avgtime[0], name:'18-25岁'},
                                    {value:avgtime[1], name:'26-40岁'}
                                ];
                    }
                    
                    option = {
                        backgroundColor: '#323c48',
                        
                        tooltip: {
                            textStyle:{
                                color:'#fff',
                                fontFamily: '华文楷体'
                            },
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            x: 'center',
                            icon:'circle',
                            data:legend_data,
                            textStyle: {
                                fontFamily: '华文楷体',
                                color: '#fff'
                            }
                        },      
                        series: [
                            {
                                name:'年龄分布',
                                type:'pie',
                                selectedMode: 'single',
                                center: ['50%', '60%'],
                                radius: [0, '30%'],
                                label: {
                                    normal: {
                                        textStyle:{
                                            color:'#fff',
                                            fontFamily: '华文楷体'
                                        },
                                        position: 'inner'
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data:series_data1
                            },
                            {
                                name:'平均上网时间（小时）',
                                type:'pie',
                                radius: ['40%', '55%'],
                                center: ['50%', '60%'],
                                label: {
                                    normal: {
                                        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                                        backgroundColor: '#eee',
                                        borderColor: '#aaa',
                                        borderWidth: 1,
                                        borderRadius: 4,
                                        rich: {
                                            a: {
                                                fontFamily: '华文楷体',
                                                color: '#999',
                                                lineHeight: 22,
                                                align: 'center'
                                            },
                                            hr: {
                                                borderColor: '#aaa',
                                                width: '100%',
                                                borderWidth: 0.5,
                                                height: 0
                                            },
                                            b: {
                                                fontFamily: '华文楷体',
                                                fontSize: 16,
                                                lineHeight: 33
                                            },
                                            per: {
                                                fontFamily: '华文楷体',
                                                color: '#eee',
                                                backgroundColor: '#334455',
                                                padding: [2, 4],
                                                borderRadius: 2
                                            }
                                        }
                                    }
                                },
                                data:series_data2
                            }
                        ]
                    };
                    
                    if (myChart9 != null && myChart9 != "" && myChart9 != undefined) {
                        myChart9.dispose();
                    }
                    if (myChart3 != null && myChart3 != "" && myChart3 != undefined) {
                        myChart3.dispose();
                    }

                    myChart9 = echarts.init(document.getElementById(pie_view));
                    myChart9.setOption(option);
                    window.onresize = function(){
                        myChart9.resize();
                    };
                }
            });
        }
    }
})();
