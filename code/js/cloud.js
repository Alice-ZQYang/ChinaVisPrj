var myChart8;

var chrac_cloud;
(function(){
    chrac_cloud={
        show_cloud:function(site_ID){
            if (myChart1 != null && myChart1 != "" && myChart1 != undefined) {
                myChart1.dispose();
            }
            if (myChart5 != null && myChart5 != "" && myChart5 != undefined) {
                myChart5.dispose();
            }
            if (myChart8 != null && myChart8 != "" && myChart8 != undefined) {
                myChart8.dispose();
            }
            myChart8 = echarts.init(document.getElementById('view5')); 

            var createRandomItemStyle1 = function (params) {　　　　//此方法与下方配置中的第一个textStle下的color等同
                var colors = ['#fda67e', '#81cacc', '#cca8ba', "#88cc81", "#82a0c5", '#fddb7e', '#735ba1', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
                return colors[parseInt(Math.random() * 10)];
                }
                d3.csv("data/Character_cloud.csv",function(data_cloud){
                    d3.csv("data/for_map.csv",function(data_out){
                        d3.csv("data/teen_statistics.csv",function(data_teen){
                            var index_cloud=0;
                            var index_out=-1;
                            var index_teen=-1;
                            for(var i=0;i<3578;i++){
                                if(data_cloud[i]["siteID"]==site_ID){
                                    index_cloud=i;
                                    break;
                                }
                            }
                            
                            for(var i=0;i<1896;i++){
                                if(data_teen[i]["siteID"]==site_ID){
                                    index_teen=i;
                                    break;
                                }
                            }
                            
                            if(index_teen==-1){
                                var teen_total=0;
                            }
                            else{
                                var teen_total=data_teen[index_teen]["total"];
                            }
                            
                            if(index_out==-1){
                                var out_total=0;
                            }
                            else{
                                var out_total=data_out[index_out]["TOTAL"];
                            }
                            
                            function createRandomItemStyle() {
                                return {
                                    normal: {
                                        color: 'rgb(' + [
                                            Math.round(Math.random() * 160),
                                            Math.round(Math.random() * 160),
                                            Math.round(Math.random() * 160)
                                        ].join(',') + ')'
                                    }
                                };
                            }
            
                            option = {
                                backgroundColor: '#323c48',
                                title: {
                                    textStyle: {
                                        fontFamily: '华文楷体',
                                        color: '#fff'
                                    },
                                    text: '网吧画像',
                                    link: 'http://www.google.com/trends/hottrends'
                                },
                                tooltip: {
                                    textStyle: {
                                        fontFamily: '华文楷体',
                                        color: '#fff'
                                    },
                                    show: true
                                },
                                series: [{
                                    /*shape: 'circle',
                                    name: '网吧画像',
                                    type: 'wordCloud',
                                    size: ['80%', '80%'],
                                    textRotation : [0, 45, 90, -45],
                                    textPadding: 0,
                                    autoSize: {
                                        enable: true,
                                        minSize: 14
                                    },*/
            
                                    type: 'wordCloud',
                                            gridSize: 1.5,
                                            sizeRange: [12, 20],
                                            rotationRange: [-90, 90], 
                                            width: 350,
                                            height: 100,
                                            drawOutOfBound: true,
                                            textStyle: {
                                                normal: {
                                                    
                                                    color: function () {
                                                        /*return 'rgb(' + [
                                                            Math.round(Math.random() * 160),
                                                            Math.round(Math.random() * 160),
                                                            Math.round(Math.random() * 160)
                                                        ].join(',') + ')';*/
                                                        var colors = ['#FFF0F5', '#E1FFFF', '#98FB98', "#FFFF00", "#FFE4E1", '#F5F5F5', '#87CEFA', '#FFC0CB', '#FAFAD2'];
                                                        return colors[parseInt(Math.random() * 10)];
                                                    }
                                                },
                                                emphasis: {
                                                    shadowBlur: 10,
                                                    shadowColor: '#333'
                                                }
                                            },
            
                                    data: [
                                        {
                                            name: "上网人数男性比例"+data_cloud[index_cloud]["Male percentage"],
                                            
                                            itemStyle: {
                                                normal: {
                                                    color:  function () {
                                                    var colors = ['#FFF0F5', '#E1FFFF', '#98FB98', "#FFFF00", "#FFE4E1", '#F5F5F5', '#87CEFA', '#FFC0CB', '#FAFAD2'];
                                                    return colors[parseInt(Math.random() * 10)];
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            name: "平均每天上网时长"+data_cloud[index_cloud]["dayAvgtime"]+"小时",
                                            itemStyle: {
                                                normal: {
                                                    color:  function () {
                                                    var colors = ['#FFF0F5', '#E1FFFF', '#98FB98', "#FFFF00", "#FFE4E1", '#F5F5F5', '#87CEFA', '#FFC0CB', '#FAFAD2'];
                                                    return colors[parseInt(Math.random() * 10)];
                                                    }
                                                }
                                            }
            
                                        },
                                        {
                                            name: "外来人口主要来自"+data_cloud[index_cloud]["mainProv"],
                                            itemStyle: {
                                                normal: {
                                                    color:  function () {
                                                    var colors = ['#FFF0F5', '#E1FFFF', '#98FB98', "#FFFF00", "#FFE4E1", '#F5F5F5', '#87CEFA', '#FFC0CB', '#FAFAD2'];
                                                    return colors[parseInt(Math.random() * 10)];
                                                    }
                                                }
                                            }
            
                                        },
                                        {
                                            name: "疑似未成年人身份证数"+teen_total+"个",
                                            itemStyle: {
                                                normal: {
                                                    color:  function () {
                                                    var colors = ['#FFF0F5', '#E1FFFF', '#98FB98', "#FFFF00", "#FFE4E1", '#F5F5F5', '#87CEFA', '#FFC0CB', '#FAFAD2'];
                                                    return colors[parseInt(Math.random() * 10)];
                                                    }
                                                }
                                            }
            
                                        },
                                        {
                                            name: "每天上网高峰段",
                                            value:data_cloud[index_cloud]["peakhour"]
             
                                        },
                                        {
                                            name: "外来人口总数"+out_total+"人",
                                            itemStyle: {
                                                normal: {
                                                    color:  function () {
                                                    var colors = ['#FFF0F5', '#E1FFFF', '#98FB98', "#FFFF00", "#FFE4E1", '#F5F5F5', '#87CEFA', '#FFC0CB', '#FAFAD2'];
                                                    return colors[parseInt(Math.random() * 10)];
                                                    }
                                                }
                                            }
             
                                        },
                                        {
                                            name: "上网记录总数"+data_cloud[index_cloud]["recordNum"]+"条",
                                            itemStyle: {
                                                normal: {
                                                    color:  function () {
                                                    var colors = ['#FFF0F5', '#E1FFFF', '#98FB98', "#FFFF00", "#FFE4E1", '#F5F5F5', '#87CEFA', '#FFC0CB', '#FAFAD2'];
                                                    return colors[parseInt(Math.random() * 10)];
                                                    }
                                                }
                                            }
            
                                        }
                                    ]
                                }]
                            };
                            myChart8.setOption(option); 
                        })
                        
                    });
                    
                    
                })
        }
    }
})();
