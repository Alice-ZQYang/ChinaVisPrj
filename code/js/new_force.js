
var force;

(function(){
    force = {
        show_force: function(){
            var view1 = {};
            var $bmDiv=$("#top-left-div");
            var svgwidth=$bmDiv.width();
            var svgheight=$bmDiv.height();
            var margin = {top: 10, right: 10, bottom: 10, left: 10};
            var width = svgwidth - margin.left - margin.right;
            var height = svgheight - margin.top - margin.bottom;
        
            svg=d3.select("#view1")
                .append("svg")
                .attr("width", "100%")
                .attr("height", "100%")
                .attr("preserveAspectRatio", "xMidYMid meet")
                .attr("viewBox", "80 -100 500 550")
                .style("background-color","#323c48")
        
            var g = svg.append('g');
        
            var color = d3.scaleOrdinal(d3.schemeCategory20);
        
            var simulation = d3.forceSimulation()
                .force("link", d3.forceLink().id(function(d) { return d.id; }))
                .force("charge", d3.forceManyBody().strength(-8))
                .force("center", d3.forceCenter(width / 3, height / 4))
        
            ;
            /*
            degree = d3.csv("./data/degree2.csv", function (error, degree) {
                return degree;
            });
            console.log(degree)
            */
        
            graph = d3.csv("./data/new_node.csv", function(error, nodes) {
                d3.csv("./data/wise_relation.csv", function (error, links) {
                    if (error) throw error;
        
                    var tooltip = d3.select("body")
                        .append("div")
                        .attr("class","tooltip")
                        .style("opacity",0.0);
        
                    var link = svg.append("g")
                        .attr("class", "links")
                        .selectAll("line")
                        .data(links)
                        .enter().append("line")
                        .attr("stroke-width", 2);
        
                    var node = svg.append("g")
                        .attr("class", "nodes")
                        .selectAll("circle")
                        .data(nodes)
                        .enter().append("circle")
                        .attr("r", function (d) {
                            return Number(d.wgt*1.5)
                        })
                        .attr("fill",function (d) {
                            //return color(Number(d['GroupNum']))
                            //console.log(Number(d.group))
        
                            return color(Math.round(d.group))
                        })
                        //attr("fill", function(d) { return color(d.group); })
                        .call(d3.drag()
                            .on("start", dragstarted)
                            .on("drag", dragged)
                            .on("end", dragended))
                        .on('dblclick', connectedNodes)
                        .on("mouseover",function (d, i) {
        
                            tooltip.html("<strong>"+d.id+"</strong>")
                                .style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY -50) + "px")
                                .style("opacity",1.0)
                                .style("color","white")
                            ;
                        })
                        .on('click', function (d) {
                            group = String(Math.round(d.group));
                            group_basicInfo.show_info(group);
                            activity.show_activity(group);
                            drawpie2.show_pie(4, 0, 0, group, "view3");
                        })
                        .on("mouseout",function (d,i) {
                            tooltip.style("opacity",0.0)
                        })
                    ; //Added code
        
                    node.append("title")
                        .text(function(d) { return d['PersonID']; });
        
                    simulation
                        .nodes(nodes)
                        .on("tick", ticked);
                        //.on("tick", tickActions);
        
                    simulation.force("link")
                        .links(links);
                    function ticked() {
                        link
                            .attr("x1", function(d) { return d.source.x; })
                            .attr("y1", function(d) { return d.source.y; })
                            .attr("x2", function(d) { return d.target.x; })
                            .attr("y2", function(d) { return d.target.y; });
        
                        node
                            .attr("cx", function(d) { return d.x; })
                            .attr("cy", function(d) { return d.y; });
                    }
                    function tickActions() {
                        var radius = 1;
                        //constrains the nodes to be within a box
                        node
                            .attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
                            .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });
        
                        link
                            .attr("x1", function(d) { return d.source.x; })
                            .attr("y1", function(d) { return d.source.y; })
                            .attr("x2", function(d) { return d.target.x; })
                            .attr("y2", function(d) { return d.target.y; });
                    }
                    // ----------------- doubleclick的时候其他的都faded----------------------------
                    // ----------------- start   ------------------------------------------------
        
                    //Toggle stores whether the highlighting is on
                    var toggle = 0;
                    //Create an array logging what is connected to what
                    var linkedByIndex = {};
                    for (i = 0; i < nodes.length; i++) {
                        linkedByIndex[i + "," + i] = 1;
                    };
                    links.forEach(function (d) {
                        linkedByIndex[d.source.index + "," + d.target.index] = 1;
                    });
                    //This function looks up whether a pair are neighbours
                    function neighboring(a, b) {
                        return linkedByIndex[a.index + "," + b.index];
                    }
                    function connectedNodes() {
                        if (toggle == 0) {
                            //Reduce the opacity of all but the neighbouring nodes
                            d = d3.select(this).node().__data__;
                            node.style("opacity", function (o) {
                                return neighboring(d, o) | neighboring(o, d) ? 1 : 0.1;
                            });
                            link.style("opacity", function (o) {
                                return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
                            });
                            //Reduce the op
                            toggle = 1;
                        } else {
                            //Put them back to opacity=1
                            node.style("opacity", 1);
                            link.style("opacity", 1);
                            toggle = 0;
                        }
                    }
                    // ----------------- end   ------------------------------------------------
        
                })
        
            });
        
            function dragstarted(d) {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }
        
            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }
        
            function dragended(d) {
                if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }
        
            return  graph;
        }
    }
})();
function force() {

}




