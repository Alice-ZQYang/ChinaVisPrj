var m;
var provin;
provin="四川";
function map_1(type=1,province="四川",value=0){
    if(type==1){
        document.getElementById("slider").max=200;
        m = L.map('view1').setView([30.07,106.55], 8);
        L.tileLayer('https://api.mapbox.com/styles/v1/andreadyx/cji3vw8yj1oly2so28h98p3z2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5kcmVhZHl4IiwiYSI6ImNqaTN2Z2Z3MDAxY2sza3M0cGpqNDhndHQifQ.Bl4HHEo4Y9pctkJ9d_EOOw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '  +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(m);

        //var svg = d3.select(m.getPanes().overlayPane).append("svg"),  
        //g = svg.append("g").attr("class", "leaflet-zoom-hide"); 


        //var school = L.featureGroup().addTo(m).on("click", schoolClick);
        var teen_bar = L.featureGroup().addTo(m).on("click", barClick);

        var marker_school, test;
        var marker_teen;
        /*
        function schoolClick(event) {
              console.log("Clicked on marker " + event.layer.test);
        }*/
        
        function barClick(event){
            var site_id = parseInt(event.layer.test);
            
            console.log(parseInt(event.layer.test));
            site_table.show_table(site_id);
            clock.show_clock(1, site_id, 0, "view3");
            polyline.show_polyline(1,0,0,0,0,"view4");
            calendar.show_calendar(site_id);
        }

        d3.csv("data/学校经纬度.csv",function(data_school){
            d3.csv("data/teen_statistics.csv",function(data_teen){
                    //console.log(data_school[1]["学校"])

                var addressPoints=[];




                for(var i=0;i<296;i++){
                    addressPoints.push([data_school[i]["纬度"],data_school[i]["经度"],3])
                    /*
                    marker_school = L.circle([data_school[i]["纬度"],data_school[i]["经度"]], 500, {
                        color: '#F3E740',
                        fillColor: '#F3E740',
                        fillOpacity: 1
                    }).addTo(school).bindPopup(data_school[i]["学校"]);
                    marker_school.test = data_school[i]["学校"];
                    */
                }
                addressPoints = addressPoints.map(function (p) { return [p[0], p[1]]; });

                var heat = L.heatLayer(addressPoints).addTo(m);
                for(var i=0;i<1897;i++){ 
                    if(data_teen[i]["total"]>value){
                        marker_teen = L.circle([data_teen[i]["lat"],data_teen[i]["lng"]], 200+data_teen[i]["total"]*1, {
                            color: '#BA2835',
                            fillColor: '#BA2835',
                            fillOpacity: 1
                        }).addTo(teen_bar).bindPopup(data_teen[i]["TITLE"]);
                        marker_teen.test = data_teen[i]["siteID"];
                    }
                }


            })
        })
    }
    else if(type==2){
        document.getElementById("slider").max=10000;
        m = L.map('view1').setView([30.07,106.55], 8);
        L.tileLayer('https://api.mapbox.com/styles/v1/andreadyx/cji3vw8yj1oly2so28h98p3z2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5kcmVhZHl4IiwiYSI6ImNqaTN2Z2Z3MDAxY2sza3M0cGpqNDhndHQifQ.Bl4HHEo4Y9pctkJ9d_EOOw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '  +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(m);

        //var svg = d3.select(m.getPanes().overlayPane).append("svg"),  
        //g = svg.append("g").attr("class", "leaflet-zoom-hide"); 


        //var school = L.featureGroup().addTo(m).on("click", schoolClick);
        var teen_bar = L.featureGroup().addTo(m).on("click", barClick);

        var marker_school, test;
        var marker_teen;
        /*
        function schoolClick(event) {
              console.log("Clicked on marker " + event.layer.test);
        }*/
        function barClick(event){
            console.log("Clicked on bar"+event.layer.test);
            clock.show_clock(1,event.layer.test,0,"view2");
            migration.show_migration(event.layer.test);
            drawpie.show_pie(1,event.layer.test,0,0,"pie");
            bar_stacking.show_barstack(event.layer.test);
            polyline.show_polyline(2,event.layer.test,0,0,0,"view5");
        }

        d3.csv("data/学校经纬度.csv",function(data_school){
            d3.csv("data/for_map.csv",function(data_out){
                    //console.log(data_school[1]["学校"])

                var addressPoints=[];




                for(var i=0;i<296;i++){
                    addressPoints.push([data_school[i]["纬度"],data_school[i]["经度"],3])
                    /*
                    marker_school = L.circle([data_school[i]["纬度"],data_school[i]["经度"]], 500, {
                        color: '#F3E740',
                        fillColor: '#F3E740',
                        fillOpacity: 1
                    }).addTo(school).bindPopup(data_school[i]["学校"]);
                    marker_school.test = data_school[i]["学校"];
                    */
                }
                addressPoints = addressPoints.map(function (p) { return [p[0], p[1]]; });

                var heat = L.heatLayer(addressPoints).addTo(m);
                for(var i=0;i<3578;i++){ 
                    if(data_out[i]["TOTAL"]>value){
                        marker_teen = L.circle([data_out[i]["lat"],data_out[i]["lng"]], 200+data_out[i]["TOTAL"]*0.1, {
                            color: '#BA2835',
                            fillColor: '#BA2835',
                            fillOpacity: 1
                        }).addTo(teen_bar).bindPopup(data_out[i]["TITLE"]);
                        marker_teen.test = data_out[i]["SITEID"];
                    }
                }


            })
        })
    }
    else if(type==3){
        document.getElementById("slider").max=1000;
        m = L.map('view1').setView([30.07,106.55], 8);
        L.tileLayer('https://api.mapbox.com/styles/v1/andreadyx/cji3vw8yj1oly2so28h98p3z2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5kcmVhZHl4IiwiYSI6ImNqaTN2Z2Z3MDAxY2sza3M0cGpqNDhndHQifQ.Bl4HHEo4Y9pctkJ9d_EOOw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '  +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(m);

        //var svg = d3.select(m.getPanes().overlayPane).append("svg"),  
        //g = svg.append("g").attr("class", "leaflet-zoom-hide"); 


        //var school = L.featureGroup().addTo(m).on("click", schoolClick);
        var teen_bar = L.featureGroup().addTo(m).on("click", barClick);

        var marker_school, test;
        var marker_teen;
        /*
        function schoolClick(event) {
              console.log("Clicked on marker " + event.layer.test);
        }*/
        function barClick(event){
            console.log("Clicked on bar"+event.layer.test);
        }

        d3.csv("data/学校经纬度.csv",function(data_school){
            d3.csv("data/for_map.csv",function(data_out){
                    //console.log(data_school[1]["学校"])

                var addressPoints=[];




                for(var i=0;i<296;i++){
                    addressPoints.push([data_school[i]["纬度"],data_school[i]["经度"],3])
                    /*
                    marker_school = L.circle([data_school[i]["纬度"],data_school[i]["经度"]], 500, {
                        color: '#F3E740',
                        fillColor: '#F3E740',
                        fillOpacity: 1
                    }).addTo(school).bindPopup(data_school[i]["学校"]);
                    marker_school.test = data_school[i]["学校"];
                    */
                }
                addressPoints = addressPoints.map(function (p) { return [p[0], p[1]]; });

                var heat = L.heatLayer(addressPoints).addTo(m);
                for(var i=0;i<3578;i++){ 
                    if(data_out[i][provin]!='0'&&data_out[i][provin]>value){
                        marker_teen = L.circle([data_out[i]["lat"],data_out[i]["lng"]],
                           200+data_out[i][provin]*0.1, {
                            color: '#BA2835',
                            fillColor: '#BA2835',
                            fillOpacity: 1
                        }).addTo(teen_bar).bindPopup(data_out[i]["TITLE"]);
                        marker_teen.test = data_out[i]["SITEID"];
                    }
                }


            })
        })
    }
    
    
}

function map(type=1,province="四川",value=0){
    if(type==1){
        document.getElementById("slider").max=200;
        m.remove();
        m = L.map('view1').setView([30.07,106.55], 8);
        L.tileLayer('https://api.mapbox.com/styles/v1/andreadyx/cji3vw8yj1oly2so28h98p3z2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5kcmVhZHl4IiwiYSI6ImNqaTN2Z2Z3MDAxY2sza3M0cGpqNDhndHQifQ.Bl4HHEo4Y9pctkJ9d_EOOw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '  +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(m);

        //var svg = d3.select(m.getPanes().overlayPane).append("svg"),  
        //g = svg.append("g").attr("class", "leaflet-zoom-hide"); 


        //var school = L.featureGroup().addTo(m).on("click", schoolClick);
        var teen_bar = L.featureGroup().addTo(m).on("click", barClick);

        var marker_school, test;
        var marker_teen;
        /*
        function schoolClick(event) {
              console.log("Clicked on marker " + event.layer.test);
        }*/
        function barClick(event){
            var site_id = parseInt(event.layer.test);
            
            console.log(parseInt(event.layer.test));
            site_table.show_table(site_id);
            clock.show_clock(1, site_id, 0, "view3");
            polyline.show_polyline(1,0,0,0,0,"view4");
            calendar.show_calendar(site_id);
        }

        d3.csv("data/学校经纬度.csv",function(data_school){
            d3.csv("data/teen_statistics.csv",function(data_teen){
                    //console.log(data_school[1]["学校"])

                var addressPoints=[];

                for(var i=0;i<296;i++){
                    addressPoints.push([data_school[i]["纬度"],data_school[i]["经度"],3])
                    /*
                    marker_school = L.circle([data_school[i]["纬度"],data_school[i]["经度"]], 500, {
                        color: '#F3E740',
                        fillColor: '#F3E740',
                        fillOpacity: 1
                    }).addTo(school).bindPopup(data_school[i]["学校"]);
                    marker_school.test = data_school[i]["学校"];
                    */
                }
                addressPoints = addressPoints.map(function (p) { return [p[0], p[1]]; });

                var heat = L.heatLayer(addressPoints).addTo(m);
                for(var i=0;i<1897;i++){ 
                    if(data_teen[i]["total"]>value){
                        marker_teen = L.circle([data_teen[i]["lat"],data_teen[i]["lng"]], 200+data_teen[i]["total"]*1, {
                            color: '#BA2835',
                            fillColor: '#BA2835',
                            fillOpacity: 0.7
                        }).addTo(teen_bar).bindPopup(data_teen[i]["TITLE"]);
                        marker_teen.test = data_teen[i]["siteID"];
                    }
                }


            })
        })
    }
    else if(type==2){
        document.getElementById("return_button").style.display="none";
        document.getElementById("slider").max=10000;
        m.remove();
        m = L.map('view1').setView([30.07,106.55], 8);
        L.tileLayer('https://api.mapbox.com/styles/v1/andreadyx/cji3vw8yj1oly2so28h98p3z2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5kcmVhZHl4IiwiYSI6ImNqaTN2Z2Z3MDAxY2sza3M0cGpqNDhndHQifQ.Bl4HHEo4Y9pctkJ9d_EOOw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '  +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(m);

        //var svg = d3.select(m.getPanes().overlayPane).append("svg"),  
        //g = svg.append("g").attr("class", "leaflet-zoom-hide"); 


        //var school = L.featureGroup().addTo(m).on("click", schoolClick);
        var teen_bar = L.featureGroup().addTo(m).on("click", barClick);

        var marker_school, test;
        var marker_teen;
        /*
        function schoolClick(event) {
              console.log("Clicked on marker " + event.layer.test);
        }*/
        function barClick(event){
            console.log("Clicked on bar"+event.layer.test);
            clock.show_clock(1,event.layer.test,0,"view2");
            migration.show_migration(event.layer.test);
            drawpie.show_pie(1,event.layer.test,0,0,"pie");
            bar_stacking.show_barstack(event.layer.test);
            polyline.show_polyline(2,event.layer.test,0,0,0,"view5");
        }

        d3.csv("data/学校经纬度.csv",function(data_school){
            d3.csv("data/for_map.csv",function(data_out){
                    //console.log(data_school[1]["学校"])

                var addressPoints=[];




                for(var i=0;i<296;i++){
                    addressPoints.push([data_school[i]["纬度"],data_school[i]["经度"],3])
                    /*
                    marker_school = L.circle([data_school[i]["纬度"],data_school[i]["经度"]], 500, {
                        color: '#F3E740',
                        fillColor: '#F3E740',
                        fillOpacity: 1
                    }).addTo(school).bindPopup(data_school[i]["学校"]);
                    marker_school.test = data_school[i]["学校"];
                    */
                }
                addressPoints = addressPoints.map(function (p) { return [p[0], p[1]]; });

                var heat = L.heatLayer(addressPoints).addTo(m);
                for(var i=0;i<3578;i++){ 
                    if(data_out[i]["TOTAL"]>value){
                        marker_teen = L.circle([data_out[i]["lat"],data_out[i]["lng"]], 200+data_out[i]["TOTAL"]*0.1, {
                            color: '#BA2835',
                            fillColor: '#BA2835',
                            fillOpacity: 1
                        }).addTo(teen_bar).bindPopup(data_out[i]["TITLE"]);
                        marker_teen.test = data_out[i]["SITEID"];
                    }
                }


            })
        })
    }
    else if(type==3){
        document.getElementById("slider").max=1000;
        m.remove();
        m = L.map('view1').setView([30.07,106.55], 8);
        L.tileLayer('https://api.mapbox.com/styles/v1/andreadyx/cji3vw8yj1oly2so28h98p3z2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5kcmVhZHl4IiwiYSI6ImNqaTN2Z2Z3MDAxY2sza3M0cGpqNDhndHQifQ.Bl4HHEo4Y9pctkJ9d_EOOw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '  +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(m);

        //var svg = d3.select(m.getPanes().overlayPane).append("svg"),  
        //g = svg.append("g").attr("class", "leaflet-zoom-hide"); 


        //var school = L.featureGroup().addTo(m).on("click", schoolClick);
        var teen_bar = L.featureGroup().addTo(m).on("click", barClick);

        var marker_school, test;
        var marker_teen;
        /*
        function schoolClick(event) {
              console.log("Clicked on marker " + event.layer.test);
        }*/
        function barClick(event){
            console.log("Clicked on bar"+event.layer.test);
        }

        d3.csv("data/学校经纬度.csv",function(data_school){
            d3.csv("data/for_map.csv",function(data_out){
                    //console.log(data_school[1]["学校"])

                var addressPoints=[];




                for(var i=0;i<296;i++){
                    addressPoints.push([data_school[i]["纬度"],data_school[i]["经度"],3])
                    /*
                    marker_school = L.circle([data_school[i]["纬度"],data_school[i]["经度"]], 500, {
                        color: '#F3E740',
                        fillColor: '#F3E740',
                        fillOpacity: 1
                    }).addTo(school).bindPopup(data_school[i]["学校"]);
                    marker_school.test = data_school[i]["学校"];
                    */
                }
                addressPoints = addressPoints.map(function (p) { return [p[0], p[1]]; });

                var heat = L.heatLayer(addressPoints).addTo(m);
                for(var i=0;i<3578;i++){ 
                    if(data_out[i][provin]>value){
                        marker_teen = L.circle([data_out[i]["lat"],data_out[i]["lng"]],200+data_out[i][provin]*0.1
                                               , {
                            color: '#BA2835',
                            fillColor: '#BA2835',
                            fillOpacity: 1
                        }).addTo(teen_bar).bindPopup(data_out[i]["TITLE"]);
                        marker_teen.test = data_out[i]["SITEID"];
                    }
                }


            })
        })
        
        
        
        
    }
    
    
}

var map3;
(function(){
    map3={
        show_map:function(type=3,province,value=0){
            
            
            if(type==1){
                document.getElementById("slider").max=200;
                m.remove();
                m = L.map('view1').setView([30.07,106.55], 8);
                L.tileLayer('https://api.mapbox.com/styles/v1/andreadyx/cji3vw8yj1oly2so28h98p3z2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5kcmVhZHl4IiwiYSI6ImNqaTN2Z2Z3MDAxY2sza3M0cGpqNDhndHQifQ.Bl4HHEo4Y9pctkJ9d_EOOw', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '  +
                        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    id: 'mapbox.streets'
                }).addTo(m);

                //var svg = d3.select(m.getPanes().overlayPane).append("svg"),  
                //g = svg.append("g").attr("class", "leaflet-zoom-hide"); 


                //var school = L.featureGroup().addTo(m).on("click", schoolClick);
                var teen_bar = L.featureGroup().addTo(m).on("click", barClick);

                var marker_school, test;
                var marker_teen;
                /*
                function schoolClick(event) {
                      console.log("Clicked on marker " + event.layer.test);
                }*/
                function barClick(event){
                    console.log("Clicked on bar"+event.layer.test);
                    site_table.show_table(event.layer.test);
                    clock.show_clock(1,event.layer.test,0,"view3");
                    polyline.show_polyline(1,0,0,0,0,"view4");
                    calendar.show_calendar(event.layer.test);
                }

                d3.csv("data/学校经纬度.csv",function(data_school){
                    d3.csv("data/teen_statistics.csv",function(data_teen){
                            //console.log(data_school[1]["学校"])

                        var addressPoints=[];




                        for(var i=0;i<296;i++){
                            addressPoints.push([data_school[i]["纬度"],data_school[i]["经度"],3])
                            /*
                            marker_school = L.circle([data_school[i]["纬度"],data_school[i]["经度"]], 500, {
                                color: '#F3E740',
                                fillColor: '#F3E740',
                                fillOpacity: 1
                            }).addTo(school).bindPopup(data_school[i]["学校"]);
                            marker_school.test = data_school[i]["学校"];
                            */
                        }
                        addressPoints = addressPoints.map(function (p) { return [p[0], p[1]]; });

                        var heat = L.heatLayer(addressPoints).addTo(m);
                        for(var i=0;i<1897;i++){ 
                            if(data_teen[i]["total"]>value){
                                marker_teen = L.circle([data_teen[i]["lat"],data_teen[i]["lng"]], 200+data_teen[i]["total"]*1, {
                                    color: '#BA2835',
                                    fillColor: '#BA2835',
                                    fillOpacity: 0.7
                                }).addTo(teen_bar).bindPopup(data_teen[i]["TITLE"]);
                                marker_teen.test = data_teen[i]["siteID"];
                            }
                        }


                    })
                })
            }
            else if(type==2){
                document.getElementById("slider").max=10000;
                m.remove();
                m = L.map('view1').setView([30.07,106.55], 8);
                L.tileLayer('https://api.mapbox.com/styles/v1/andreadyx/cji3vw8yj1oly2so28h98p3z2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5kcmVhZHl4IiwiYSI6ImNqaTN2Z2Z3MDAxY2sza3M0cGpqNDhndHQifQ.Bl4HHEo4Y9pctkJ9d_EOOw', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '  +
                        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    id: 'mapbox.streets'
                }).addTo(m);

                //var svg = d3.select(m.getPanes().overlayPane).append("svg"),  
                //g = svg.append("g").attr("class", "leaflet-zoom-hide"); 


                //var school = L.featureGroup().addTo(m).on("click", schoolClick);
                var teen_bar = L.featureGroup().addTo(m).on("click", barClick);

                var marker_school, test;
                var marker_teen;
                /*
                function schoolClick(event) {
                      console.log("Clicked on marker " + event.layer.test);
                }*/
                function barClick(event){
                    console.log("Clicked on bar"+event.layer.test);
                    clock.show_clock(1,event.layer.test,0,"view2");
                    migration.show_migration(event.layer.test);
                    drawpie.show_pie(1,event.layer.test,0,0,"pie");
                    bar_stacking.show_barstack(event.layer.test);
                    polyline.show_polyline(2,event.layer.test,0,0,0,"view5");
                    
                }

                d3.csv("data/学校经纬度.csv",function(data_school){
                    d3.csv("data/for_map.csv",function(data_out){
                            //console.log(data_school[1]["学校"])

                        var addressPoints=[];

                        for(var i=0;i<296;i++){
                            addressPoints.push([data_school[i]["纬度"],data_school[i]["经度"],3])
                            /*
                            marker_school = L.circle([data_school[i]["纬度"],data_school[i]["经度"]], 500, {
                                color: '#F3E740',
                                fillColor: '#F3E740',
                                fillOpacity: 1
                            }).addTo(school).bindPopup(data_school[i]["学校"]);
                            marker_school.test = data_school[i]["学校"];
                            */
                        }
                        addressPoints = addressPoints.map(function (p) { return [p[0], p[1]]; });

                        var heat = L.heatLayer(addressPoints).addTo(m);
                        for(var i=0;i<3578;i++){ 
                            if(data_out[i]["TOTAL"]>value){
                                marker_teen = L.circle([data_out[i]["lat"],data_out[i]["lng"]], 200+data_out[i]["TOTAL"]*0.1, {
                                    color: '#BA2835',
                                    fillColor: '#BA2835',
                                    fillOpacity: 0.7
                                }).addTo(teen_bar).bindPopup(data_out[i]["TITLE"]);
                                marker_teen.test = data_out[i]["SITEID"];
                            }
                        }


                    })
                })
            }
            else if(type==3){
                document.getElementById("return_button").style.display="inline";
                document.getElementById("slider").max=1000;
                m.remove();
                m = L.map('view1').setView([30.07,106.55], 8);
                L.tileLayer('https://api.mapbox.com/styles/v1/andreadyx/cji3vw8yj1oly2so28h98p3z2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5kcmVhZHl4IiwiYSI6ImNqaTN2Z2Z3MDAxY2sza3M0cGpqNDhndHQifQ.Bl4HHEo4Y9pctkJ9d_EOOw', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '  +
                        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    id: 'mapbox.streets'
                }).addTo(m);

                //var svg = d3.select(m.getPanes().overlayPane).append("svg"),  
                //g = svg.append("g").attr("class", "leaflet-zoom-hide"); 


                //var school = L.featureGroup().addTo(m).on("click", schoolClick);
                var teen_bar = L.featureGroup().addTo(m).on("click", barClick);

                var marker_school, test;
                var marker_teen;
                /*
                function schoolClick(event) {
                      console.log("Clicked on marker " + event.layer.test);
                }*/
                function barClick(event){
                    console.log("Clicked on bar"+event.layer.test);
                }

                d3.csv("data/学校经纬度.csv",function(data_school){
                    d3.csv("data/for_map.csv",function(data_out){
                            //console.log(data_school[1]["学校"])

                        var addressPoints=[];




                        for(var i=0;i<296;i++){
                            addressPoints.push([data_school[i]["纬度"],data_school[i]["经度"],3])
                            /*
                            marker_school = L.circle([data_school[i]["纬度"],data_school[i]["经度"]], 500, {
                                color: '#F3E740',
                                fillColor: '#F3E740',
                                fillOpacity: 1
                            }).addTo(school).bindPopup(data_school[i]["学校"]);
                            marker_school.test = data_school[i]["学校"];
                            */
                        }
                        addressPoints = addressPoints.map(function (p) { return [p[0], p[1]]; });

                        var heat = L.heatLayer(addressPoints).addTo(m);
                        for(var i=0;i<3578;i++){ 
                            if(data_out[i][provin]>value){
                                marker_teen = L.circle([data_out[i]["lat"],data_out[i]["lng"]],200+data_out[i][provin]*0.1
                                                       , {
                                    color: '#BA2835',
                                    fillColor: '#BA2835',
                                    fillOpacity: 0.7
                                }).addTo(teen_bar).bindPopup(data_out[i]["TITLE"]);
                                marker_teen.test = data_out[i]["SITEID"];
                            }
                        }


                    })
                })
        
        
        
        
            }
                       
        }
    }
}
)();

var city;
(function(){
    city={
        get_city:function(city_name){
            provin=city_name;
        }
    }
})();

function map4(){
    m.remove();
    m = L.map('view1').setView([30.07,106.55], 8);
    L.tileLayer('https://api.mapbox.com/styles/v1/andreadyx/cji3vw8yj1oly2so28h98p3z2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5kcmVhZHl4IiwiYSI6ImNqaTN2Z2Z3MDAxY2sza3M0cGpqNDhndHQifQ.Bl4HHEo4Y9pctkJ9d_EOOw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '  +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(m);

    //var svg = d3.select(m.getPanes().overlayPane).append("svg"),  
    //g = svg.append("g").attr("class", "leaflet-zoom-hide"); 


    //var school = L.featureGroup().addTo(m).on("click", schoolClick);
    var teen_bar = L.featureGroup().addTo(m).on("click", barClick);

    var marker_school, test;
    var marker_teen;
    /*
    function schoolClick(event) {
          console.log("Clicked on marker " + event.layer.test);
    }*/

    function barClick(event){
        var site_id = parseInt(event.layer.test);
        clock.show_clock(1,event.layer.test,0,"view2");
        drawpie2.show_pie(1,event.layer.test,0,0,"view3");
        polyline.show_polyline(4,event.layer.test,0,0,0,"view4");
        chrac_cloud.show_cloud(event.layer.test);
    }

    d3.csv("data/学校经纬度.csv",function(data_school){
        d3.csv("data/for_map.csv",function(data_bar){
                //console.log(data_school[1]["学校"])

            var addressPoints=[];
            for(var i=0;i<296;i++){
                addressPoints.push([data_school[i]["纬度"],data_school[i]["经度"],3])
            }
            addressPoints = addressPoints.map(function (p) { return [p[0], p[1]]; });

            var heat = L.heatLayer(addressPoints).addTo(m);
            for(var i=0;i<1897;i++){ 
                marker_teen = L.circle([data_bar[i]["lat"],data_bar[i]["lng"]], 200, {
                    color: '#BA2835',
                    fillColor: '#BA2835',
                    fillOpacity: 0.7
                }).addTo(teen_bar).bindPopup(data_bar[i]["TITLE"]);
                marker_teen.test = data_bar[i]["SITEID"];
            }


        })
    })
}