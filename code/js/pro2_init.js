function pro2_display(){
    $("#view1").empty();
    $("#view2").empty();
    var poly_view = "view5";

    document.getElementById("return_button").style.display="none";
    
    if(document.getElementById("select_b")){
        var select_box = document.getElementById("select_b");  
        select_box.parentNode.removeChild(select_box);  
    }

    if(document.getElementById("view3")){
        var view3 = document.getElementById("view3");  
        view3.parentNode.removeChild(view3);  
    
        var parent = document.getElementById("top-right-bottom-div");
        var box1 = document.createElement("div");
        box1.setAttribute("id","box1");
        box1.setAttribute("class","outer-div");
        parent.appendChild(box1);
        var box2 = document.createElement("div");
        box2.setAttribute("id","box2");
        box2.setAttribute("class","outer-div");
        parent.appendChild(box2);
    
        var migra = document.createElement("div");
        migra.setAttribute("id","migra");
        migra.setAttribute("class","block-div");
    
        var pie = document.createElement("div");
        pie.setAttribute("id","pie");
        pie.setAttribute("class","block-div");
        
        box1.appendChild(migra);
        box2.appendChild(pie);
    }
    
    map(2);
    drawpie.show_pie(0, 0, 0, 0, "pie");
    clock.show_clock(0, 0, 0, "view2");
    migration.show_migration(50010110000001);
    bar_stacking.show_barstack(50010110000001);
    polyline.show_polyline(2, 50010110000001, 0, 0, 0, poly_view);
}