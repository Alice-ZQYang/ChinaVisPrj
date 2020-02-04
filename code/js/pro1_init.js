function pro1_display(){
    $("#view2").empty();
    $("#view4").empty();
    $("#view5").empty();

    document.getElementById("return_button").style.display="none";

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

    map_1(1);
    org_table(50010110000001);
    polyline.show_polyline(1, 0, 0, 0, 0, poly_view);
    calendar.show_calendar(50010110000001);
    clock.show_clock(0,0,0, "view3");
}