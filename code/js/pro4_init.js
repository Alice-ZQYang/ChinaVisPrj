function pro4_display(){
    $("#view1").empty();
    $("#view2").empty();
    $("#view5").empty();

    document.getElementById("slidebox").style.display="none";
    document.getElementById("return_button").style.display="none";

    if(document.getElementById("select_b")){
        var select_box = document.getElementById("select_b");  
        select_box.parentNode.removeChild(select_box);  
    }

    if(document.getElementById("activitydiv")){
        var activitydiv = document.getElementById("activitydiv");  
        activitydiv.parentNode.removeChild(activitydiv);  
    }
    
    if(!document.getElementById("view3")){
        var box1 = document.getElementById("box1");  
        box1.parentNode.removeChild(box1);  
        var box2 = document.getElementById("box2");  
        box2.parentNode.removeChild(box2);  

        var parent = document.getElementById("top-right-bottom-div");
        var view3 = document.createElement("div");
        view3.setAttribute("id","view3");
        view3.setAttribute("class","block-div");
        
        parent.appendChild(view3);
    } 
    else{
        $("#view3").empty();
    }
    
    var poly_view = "view4";

    map4();
    clock.show_clock(0, 0, 0, "view2");
    drawpie2.show_pie(0, 0, 0, 0, "view3");
    polyline.show_polyline(4, 50010110000001, 0, 0, 0, poly_view);
    chrac_cloud.show_cloud(50010110000001);
}