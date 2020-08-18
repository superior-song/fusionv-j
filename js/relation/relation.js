(function($) {
    
    var centerWrap = document.getElementsByClassName('svg-wrap')[0];
    
    var wht_svg = d3.select("svg")
	   .call(d3.zoom()
        .scaleExtent([0.1, 4])
        .on("zoom", zoom_actions))
    .on("dblclick.zoom", null);

    var wht_width = +centerWrap.clientWidth
    var wht_height = +centerWrap.clientHeight
    var wht_radius = 15
    var wht_g, wht_node, wht_link
    var wht_root
    var nodes_data = []
    var links_data = []
    var params = [];
    var showInfoTxt;
    var dataNodeLen=0;

    //ROOT_NODE
    params.push({
        "distance": 180,
        "img1": "images/inner_img_n1.png",
        "x1": -100,
        "y1": -60,
        "w1": 188,
        "h1": 186,
        "img2": "images/outer_circle_n1.png",
        "x2": -85,
        "y2": -46,
        "w2": 160,
        "h2": 160,
        "tx": -45,
        "ty": -75,
        "ts": 12
    })

    //PERSON_NODE
    params.push({
        "distance": 130,
        "img1": "images/outer_circle_n3.png",
        "x1": -21,
        "y1": -21,
        "w1": 46,
        "h1": 46,
        "img2": "",
        "x2": -31,
        "y2": -31,
        "w2": 66,
        "h2": 66,
        "tx": -5,
        "ty": -40,
        "ts": 12
    })

    //RELATION_NODE
    params.push({
        "distance": 130,
        "img1": "",
        "x1": -64,
        "y1": -64,
        "w1": 117,
        "h1": 116,
        "img2": "",
        "x2": -48,
        "y2": -88,
        "w2": 117,
        "h2": 116,
        "tx": -40,
        "ty": 6,
        "ts": 12
    })

    //INFO_NODE
    params.push({
        "distance": 130,
        "img1": "",
        "x1": -40,
        "y1": -40,
        "w1": 66,
        "h1": 66,
        "img2": "",
        "x2": -44,
        "y2": -44,
        "w2": 66,
        "h2": 66,
        "tx": -12,
        "ty": 0,
        "ts": 12
    });


    //set up the simulation and add forces  
    var simulation = d3.forceSimulation()
        .force("y", d3.forceY(0.01))
        .force("x", d3.forceX(0.01));

    // Create the svg:defs element and the line gradient definition.
    var svgDefs = wht_svg.append('defs');
    var lineGradient = svgDefs
        .append('radialGradient')
        .attr('id', 'lineGradient')
        .attr("spreadMethod", "pad")
        .attr("gradientUnits", "objectBoundingBox")
    lineGradient.append('stop')
        .attr('stop-color', '#00FFF9')
        .attr('offset', '0')
        .attr("stop-opacity", 1)
    lineGradient.append('stop')
        .attr('stop-color', '#00FFF9')
        .attr('offset', '1')
        .attr("stop-opacity", 0)


    wht_g = wht_svg.append("g")
        .attr("class", "everything");

    // requestData()
    intitImageArry(result);

    
    var initNode=initDatas(result[personInfoTag].name,result,1,null);
    initFormRoot(initNode);
//    update();
     
    // 更新节点
    function update() {
        var hierarchy = d3.hierarchy(wht_root);
        nodes_data =hierarchy.descendants();

        for(var i=0;i<nodes_data.length;i++){
            nodes_data[i].id=i;
        }

        var tree = d3.tree();
        var links_data = tree(hierarchy).links();

        simulation.nodes(nodes_data);
        simulation
            .force("charge", d3.forceManyBody().strength(-1000))
            .force("center", d3.forceCenter(wht_width / 2, wht_height / 2))
            .force("links", d3.forceLink(links_data)
                .id(function (d) {
                    return d.id;
                })
                .distance(function (d) {
                    return params[Number(d.source.data.nodeType)].distance
                })
            );

        wht_node = wht_g.selectAll(".node").data(nodes_data);
        wht_node.exit().remove();

        wht_node = wht_node.enter()
            .append("g")
            .attr("id", function (d) {
                return d.id;
            })
            .attr("class", "node")
            .call(d3.drag()
                .on("start", drag_start)
                .on("drag", drag_drag)
                .on("end", drag_end))
            .merge(wht_node)
        
        wht_node
            .filter(function(d){
                return  d.id > dataNodeLen-1;
            })
            .append("image")
            .attr("xlink:href", function (d) {
                // 0
                if(d.data.nodeType == node_type.ROOT_NODE){
                    
                    return params[Number(d.data.nodeType > 5 ? 5 : d.data.nodeType)].img2
                }
                // 1
                
                if(d.data.nodeType == node_type.PERSON_NODE){
                    
                    return d.data.img;
                }
                
                // 2
                if(d.data.nodeType == node_type.RELATION_NODE){
                    return relationImg_index[d.data.relaIndex];
                }
                
                // 3
                if(d.data.nodeType == node_type.INFO_NODE){
                    return infoImageUrl;
                }
            })
            .attr("class", "circle")
            .attr("x", function (d) {
                return params[Number(d.data.nodeType > 5 ? 5 : d.data.nodeType)].x1
            })
            .attr("y", function (d) {
                return params[Number(d.data.nodeType > 5 ? 5 : d.data.nodeType)].y1
            })
            .attr("width", function (d) {
                return params[Number(d.data.nodeType > 5 ? 5 : d.data.nodeType)].w1
            })
            .attr("height", function (d) {
                return params[Number(d.data.nodeType > 5 ? 5 : d.data.nodeType)].h1
            })

        wht_node
            .filter(function(d){   return  d.id > dataNodeLen-1; })
            .append("image")
            .attr("xlink:href", function (d) {
                return params[Number(d.data.nodeType > 5 ? 5 : d.data.nodeType)].img1
            })
            .attr("x", function (d) {
                return params[Number(d.data.nodeType > 5 ? 5 : d.data.nodeType)].x2
            })
            .attr("y", function (d) {
                return params[Number(d.data.nodeType > 5 ? 5 : d.data.nodeType)].y2
            })
            .attr("width", function (d) {
                return params[Number(d.data.nodeType > 5 ? 5 : d.data.nodeType)].w2
            })
            .attr("height", function (d) {
                return params[Number(d.data.nodeType > 5 ? 5 : d.data.nodeType)].h2
            })
            .style("display",function (d) {
                if(d.data.nodeType == node_type.PERSON_NODE || d.data.nodeType == node_type.ROOT_NODE){
                    return "block";
                }else{
                    return "none";
                }
            })

        wht_node
            .filter(function(d){  return  d.id > dataNodeLen-1; })
            .append("svg:text")
            .style('font-family', function () {
                return "黑体";
            })
            .style('font-weight', function () {
                return "normal";
            })
            .style('font-size', function (d) {
                return 12;
                //return params[Number(d.data.nodeType > 5 ? 5 : d.data.nodeType)].ts;
            })
            .attr("class",function (d) {
                if(d.data.nodeType == node_type.RELATION_NODE){
                    return "relationNode";
                }else if(d.data.nodeType == node_type.INFO_NODE){
                    return "infoNode";
                } else if(d.data.nodeType == node_type.PERSON_NODE){
                    return "personNode";
                }
            })
            .style('fill', function (d) {
                if(d.data.nodeType ==node_type.INFO_NODE || d.data.nodeType ==node_type.RELATION_NODE ){
                    return "#fff"
                }else{
                    return "#00f6ff"
                }
                
            })
            .attr("dx", function (d) {
                if(d.data.nodeType ==node_type.INFO_NODE || d.data.nodeType ==node_type.RELATION_NODE ){
                    return -(strlen(String(d.data.name))*5) + 8;
                }else{
                    return -(strlen(String(d.data.name))*5) + 16;
                }
                
            })
            .attr("dy", function (d) {
                return params[Number(d.data.nodeType > 5 ? 5 : d.data.nodeType)].ty;
            })
            .text(function (d) {
                if(d.data.nodeType ==node_type.INFO_NODE || d.data.nodeType ==node_type.RELATION_NODE ){
                    return d.data.name;
                }else{
                    return d.data.name;
                }
            })
        
        // 节点点击事件
        wht_node.on('click', function (d) {
            console.log(d);
            d3.event.stopPropagation()
//            var lines = g.selectAll("line[source-name='" + d.id + "']")._groups[0]
//            if (lines.length > 0) { //有子节点
//                removeLinesRecursive(d.id)
//                removeNodesRecursive(d.id)
//                update();
//            } else { //无
//                console.log("id:", d.id)
////                requestData(d.data.id)
//            }
//
            // if(d.data._children ==null && d.data.children ==null){
            //     var child=initDatas(d.data.name,result2,d.data.group,d.data.relaIndex);
            //     if(child !=null && typeof (child)!="undefined"){
            //         d.data.children=child.children;
            //         update();
            //     }
            // }else{
            //     if(d.data._children !=null){
            //         d.data.children=d.data._children;
            //         d.data._children=null;
            //     }else{
            //         d.data._children=d.data.children;
            //         d.data.children=null;
            //     }
            //     update();
            // }
        });
        dataNodeLen=nodes_data.length;//作为过滤条件

        wht_link = wht_g.selectAll(".line").data(links_data);
        wht_link.exit().remove();
        wht_link = wht_link.enter().prepend("line")
            .attr("class", "line")
            .attr("id", function (d) {
                return d.target.id;
            })
            .attr("source-name", function (d) {
                return d.source.id;
            })
            .attr("target-name", function (d) {
                return d.target.id;
            })
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            }).merge(wht_link);


            showInfoTxt=wht_g.selectAll(".showInfoTxt").data(links_data);
            var textsG=showInfoTxt.enter().insert("g",".node").attr("class", "showInfoTxt");

            textsG
            .append("svg:text")
            .text(function(d){
                return d.target.data.showInfo;
            })
            .style("fill", function(d, i) {
                return "#FFF";
            })
            .style("font-family", "Arial")
            .style("font-size", 12)
            .attr("dx", '-10')
            .attr("dy", 18);

        simulation.on("tick", tickActions);
        simulation.alpha(.7);
        showInfoTxt.exit().remove();
    }

    /** Functions **/
    wht_svg.on('click', function(){
       
        wht_node.each(function (d) {
           
            d.fx = null
            d.fy = null
        })
    })
    
    // text换行
    svgNS = "http://www.w3.org/2000/svg";
    svgDocument = document;
    function create_multiline(textNode, text)
    {
        var str = ''
        var len = text.length
        for (var i = 0, j = 1; i < len; i++, j++) {
            if (j && j % 4 === 0) {
                if (len > 4) {
                    str = str + ',' + text[i]
                } else {
                    str += text[i]
                }
                } else {
                    str += text[i]
            }
        }
       
        var limitWidth = 66;
        var words = str.split(',');                        
        var tspan_element = document.createElementNS(svgNS, "tspan");   // Create first tspan element
        var text_node = svgDocument.createTextNode(words[0]);           // Create text in tspan element
       
        textNode.innerHTML = '';
        tspan_element.appendChild(text_node);                           // Add tspan element to DOM
        textNode.appendChild(tspan_element);                        // Add text to tspan element
        
        if(words.length > 1){
            tspan_element.setAttributeNS(null, "x", 28);
            tspan_element.setAttributeNS(null, "dy", '-12');
        }

        for(var i=1; i<words.length; i++)
        {
            var len = tspan_element.firstChild.data.length; 
                      // Find number of letters in string
            tspan_element.firstChild.data += words[i];            // Add next word
            if (tspan_element.getComputedTextLength() > limitWidth)
            {
                tspan_element.firstChild.data = tspan_element.firstChild.data.slice(0, len);    // Remove added word
                
                var tspan_element = document.createElementNS(svgNS, "tspan");       // Create new tspan element
                tspan_element.setAttributeNS(null, "x", '-24');
                tspan_element.setAttributeNS(null, "dy", 16);

                text_node = svgDocument.createTextNode(words[i]);
                tspan_element.appendChild(text_node);
                textNode.appendChild(tspan_element);
            }
        }
    }

    // 获取节点内文字
    var textColl = document.querySelectorAll('.node .infoNode');
    var textArr = Array.prototype.slice.apply(textColl);

    textArr.forEach(function(item){
        create_multiline(item, item.innerHTML)
    })

    //Drag functions 
    //d is the node 
    function drag_start(d) {
//        console.log("dragstart")
        wht_node.each(function (d_each) {
            if ( d_each != d) {
                d_each.fx = null
                d_each.fy = null
            }
        })
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    //make sure you can't drag the circle outside the box
    function drag_drag(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function drag_end(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    //Zoom functions 
    function zoom_actions() {
        wht_g.attr("transform", d3.event.transform)
    }


    function tickActions() {
        //update circle positions each tick of the simulation 
//            node.attr("cx", function (d) {
//                return d.x = Math.max(radius, Math.min(width - radius, d.x));
//            })
//            .attr("cy", function (d) {
//                return d.y = Math.max(radius, Math.min(height - radius, d.y));
//            });
        wht_node
            .attr('cx', function (d) { return d.x })
            .attr('cy', function (d) { return d.y })

        wht_node.attr("transform", function (d) {
//            return "translate(" + (Math.max(radius, Math.min(width - radius, d.x))) + ", " + (Math.max(radius,
//                Math.min(height - radius, d.y))) + ")";
            return "translate("+d.x+","+d.y+")";
        });

        //update link positions 
        wht_link.attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });


        d3.selectAll(".showInfoTxt").attr("transform", function (d) {
                return "translate(" +
                    ((d.source.x + d.target.x) / 2 - (strlen(String(d.target.data.showInfo)) * 3)) + "," +
                    ((d.source.y + d.target.y) / 2) + ")";
        });
    }

    // 点击节点查询下级
    function requestData(id) {
        $.ajax({
            url: '',
            type: 'post',
            data: {
                dwSjid: id
            },
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (res) {
                console.log('res', res)
                var resObj = eval("(" + res + ")")
                nodes_data = nodes_data.concat(resObj.nodes)
                links_data = links_data.concat(resObj.links)
                update()
            }
        })
    }


    //递归删除links
    function removeLinesRecursive(id) {
        var lines = g.selectAll("line[source-name='" + id + "']")._groups[0]
        for (var index = 0; index < lines.length; index++) {
            var line = lines[index];
            removeLinesRecursive(line.id)
            removeObjFromArr(links_data, links_data.find(function (obj) {
                return obj.target.id === line.id
            }))

        }
    }

    //递归删除nodes
    function removeNodesRecursive(id) {
        var lines = g.selectAll("line[source-name='" + id + "']")._groups[0]
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var nodes = g.selectAll(".node[id='" + line.id + "']")._groups[0]
            for (var j = 0; j < nodes.length; j++) {
                var node = nodes[j]
                removeNodesRecursive(node.id)
                removeObjFromArr(nodes_data, nodes_data.find(function (obj) {
                    return obj.id === node.id
                }))
            }
        }
    }

    function getObjIndexFromArr(_arr, _obj) {
        var len = _arr.length;
        for (var i = 0; i < len; i++) {
            if (_arr[i] == _obj) {
                return parseInt(i);
            }
        }
        return -1;
    };

    function removeObjFromArr(_arr, _obj) {
        var length = _arr.length;
        for (var i = 0; i < length; i++) {
            if (_arr[i] == _obj) {
                _arr.splice(i, 1);
                return;
            }
        }
    };

    function strlen(str) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                len++;
            } else {
                len += 2;
            }
        }
        return len;
    }

    function initFormRoot(node) {
        if(node==null){
            return ;
        }
        wht_root=node;
        update();
    }
})(jQuery);