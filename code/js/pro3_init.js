function pro3_display(){
    $("#view1").empty();
    $("#view2").empty();
    $("#view4").empty();
    $("#view5").empty();

    document.getElementById("slidebox").style.display="none";
    document.getElementById("return_button").style.display="none";

    if(document.getElementById("select_b")){
        var select_box = document.getElementById("select_b");  
        select_box.parentNode.removeChild(select_box);  
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

    if(!document.getElementById("activitydiv")){
        var parent1 = document.getElementById("bottom-div");
        var activitydiv = document.createElement("div");
        activitydiv.setAttribute("id","activitydiv");
        activitydiv.setAttribute("class","block-div");
        
        parent1.appendChild(activitydiv);
    }
    
    force.show_force();
    group_basicInfo.show_info("1");
    activity.show_activity("1");
    drawpie2.show_pie(4, 0, 0, "1", "view3");
}