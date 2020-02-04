function org_table(id){
    var rootdiv = document.getElementById('view2');
    var title1 = document.createElement("div");
    var content = document.createElement("div");
    title1.setAttribute("id","title1");
    rootdiv.appendChild(title1);  
    content.setAttribute("id","content");
    rootdiv.appendChild(content);  

    var bordered1 = "<table id = 'bordered1'>"
        + "<thead><tr>"
        + "<th style = 'width: 8%'>序号</th>"
        + "<th style = 'width: 35%'>PersonID</th>"
        + "<th style = 'width: 8%'>性别</th>"
        + "<th style = 'width: 15%'>姓名</th>"
        + "<th style = 'width: 15%'>生日</th>"
        + "<th style = 'width: 15%'>籍贯</th>"
        + "</tr></thead></table>"
    title1.innerHTML = bordered1;

    var bordered2 = "<table id = 'bordered2' class='table table-bordered'>"
        + "<thead>"
        + "<tbody id = 'blockbody'></tbody>"
        + "</thead></table>";
    content.innerHTML = bordered2;
    
    Papa.parse('data/teen/' + id + '.csv', {
        download: true,
        complete: function(results) {
            var data = results.data;
            var allinfo = new Array();
            for(var i = 1, _l = data.length - 1; i < _l; i++){
                var item = data[i];
                if(i % 2 == 1){
                    var newRow = "<tr onclick = 'Projection(" + i + ")' class = 'odd'><td style = 'width: 8%'>" + i
                    + "</td><td style = 'width: 39%'>" + item[1]
                    + "</td><td style = 'width: 8%'>" + item[3]
                    + "</td><td style = 'width: 15%'>" + item[4]
                    + "</td><td style = 'width: 15%'>" + item[8]
                    + "</td><td style = 'width: 15%'>" + item[9]
                    + "</td></tr>";
                }
                else{
                    var newRow = "<tr onclick = 'Projection(" + i + ")' class = 'even'><td style = 'width: 8%'>" + i
                    + "</td><td style = 'width: 39%'>" + item[1]
                    + "</td><td style = 'width: 8%'>" + item[3]
                    + "</td><td style = 'width: 15%'>" + item[4]
                    + "</td><td style = 'width: 15%'>" + item[8]
                    + "</td><td style = 'width: 15%'>" + item[9]
                    + "</td></tr>";
                }
                $("#blockbody").append(newRow);
            }
        }
    });
}

var site_table;
(function(){
    site_table = {
        show_table: function(site_id){
            $("#blockbody").empty(); 

            Papa.parse('data/teen/' + site_id + '.csv', {
                download: true,
                complete: function(results) {
                    var data = results.data;
                    var allinfo = new Array();
                    for(var i = 1, _l = data.length - 1; i < _l; i++){
                        var item = data[i];
                        if(i % 2 == 1){
                            var newRow = "<tr onclick = 'Projection(" + i + ")' class = 'odd'><td style = 'width: 8%'>" + i
                            + "</td><td style = 'width: 39%'>" + item[1]
                            + "</td><td style = 'width: 8%'>" + item[3]
                            + "</td><td style = 'width: 15%'>" + item[4]
                            + "</td><td style = 'width: 15%'>" + item[8]
                            + "</td><td style = 'width: 15%'>" + item[9]
                            + "</td></tr>";
                        }
                        else{
                            var newRow = "<tr onclick = 'Projection(" + i + ")' class = 'even'><td style = 'width: 8%'>" + i
                            + "</td><td style = 'width: 39%'>" + item[1]
                            + "</td><td style = 'width: 8%'>" + item[3]
                            + "</td><td style = 'width: 15%'>" + item[4]
                            + "</td><td style = 'width: 15%'>" + item[8]
                            + "</td><td style = 'width: 15%'>" + item[9]
                            + "</td></tr>";
                        }
                        $("#blockbody").append(newRow);
                    }
                }
            });
        }
    }
})()

function Projection(index){
    //var tab=document.getElementById("blockbody");
    //alert(tab.rows[index - 1].cells[5].innerHTML)
}