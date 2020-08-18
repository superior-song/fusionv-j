(function($) {
    var svg = d3.select("svg")
    var centerWrap = document.getElementsByClassName('center-rwhx')[0];
    var width = +centerWrap.clientWidth
    var height = +centerWrap.clientWidth
    var radius = 15
    var g, node, link
    var circles, texts
    var nodes_data = []
    var links_data = []
    var nodes_data = [{
            "jc": "",
            "id": "node1",
            "jb": "0",
            "fh": "",
            "qc": ""
        },
        {
            "jc": "",
            "id": "node11",
            "jb": "1",
            "fh": "光明路菜市场",
            "qc": "",
            "num":"落脚2次"
        },
        {
            "jc": "",
            "id": "node12",
            "jb": "1",
            "fh": "国购广场",
            "qc": "",
            "num":"落脚2次"
        }, {
            "jc": "",
            "id": "node13",
            "jb": "1",
            "fh": "逍遥津公园",
            "qc": "",
            "num":"落脚2次"
        }, {
            "jc": "",
            "id": "node14",
            "jb": "1",
            "fh": "合肥科技馆",
            "qc": "",
            "num":"落脚2次"
        }, {
            "jc": "",
            "id": "node15",
            "jb": "2",
            "fh": "王丽",
            "qc": "",
            "num":"同行2次"
        }, {
            "jc": "",
            "id": "node16",
            "jb": "3",
            "fh": "赵四",
            "qc": "",
            "num":"同行2次"
        }, {
            "jc": "",
            "id": "node17",
            "jb": "4",
            "fh": "李四",
            "qc": "",
            "num":"同行2次"
        }
    ]
    var links_data = [{
        "target": "node11",
        "source": "node1"
    }, {
        "target": "node12",
        "source": "node1"
    }, {
        "target": "node13",
        "source": "node1"
    }, {
        "target": "node14",
        "source": "node1"
    }, {
        "target": "node15",
        "source": "node1"
    }, {
        "target": "node16",
        "source": "node1"
    }, {
        "target": "node17",
        "source": "node1"
    }]
    var params = [];
    params.push({
        "distance": 260,
        "img1": "images/out_circle_b.png",
        "x1": -100,
        "y1": -220,
        "w1": 172,
        "h1": 172,
        "img2": "images/img_node1.png",
        "x2": -86,
        "y2": -206,
        "w2": 144,
        "h2": 144,
        "tx": -45,
        "ty": 5,
        "ts": 18,
        "tsx": -45,
        "tsy": 5,
        "tsf": 14
    })
    params.push({
        "distance": '',
        "img1": "",
        "x1": -45,
        "y1": -195,
        "w1": 71,
        "h1": 71,
        "img2": "images/img_rel1.png",
        "x2": -29,
        "y2": -179,
        "w2": 71,
        "h2": 71,
        "tx": -30,
        "ty": -190,
        "ts": 18,
        "tsx": 45,
        "tsy": -150,
        "tsf": 14
    })
    params.push({
        "distance": '',
        "img1": "images/out_circle_s.png",
        "x1": -24,
        "y1": -174,
        "w1": 120,
        "h1": 120,
        "img2": "images/img_node1-1.png",
        "x2": -13,
        "y2": -163,
        "w2": 100,
        "h2": 100,
        "tx": 20,
        "ty": -180,
        "ts": 18,
        "tsx": -115,
        "tsy": -70,
        "tsf": 14
    })
    params.push({
        "distance": '',
        "img1": "images/out_circle_s.png",
        "x1": -26,
        "y1": -176,
        "w1": 120,
        "h1": 120,
        "img2": "images/img_node1-2.png",
        "x2": -14,
        "y2": -164,
        "w2": 100,
        "h2": 100,
        "tx": 16,
        "ty": -180,
        "ts": 18,
        "tsx": -25,
        "tsy": -250,
        "tsf": 14
    })
    params.push({
        "distance": '',
        "img1": "images/out_circle_s.png",
        "x1": -24,
        "y1": -174,
        "w1": 120,
        "h1": 120,
        "img2": "images/img_node1-3.png",
        "x2": -13,
        "y2": -163,
        "w2": 100,
        "h2": 100,
        "tx": 16,
        "ty": -180,
        "ts": 18,
        "tsx": 45,
        "tsy": -15,
        "tsf": 14
    })
    

    //set up the simulation and add forces  
    var simulation = d3.forceSimulation()

    // Create the svg:defs element and the line gradient definition.
    var svgDefs = svg.append('defs');
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


    g = svg.append("g")
        .attr("class", "everything");

    // requestData()
    update()

    function update() {
        link = null
        node = null

        g.selectAll('image').remove()
        g.selectAll('text').remove()
        g.selectAll('title').remove()

        node = g.selectAll(".node").data(nodes_data, function (d) {
            return d.id;
        });
        node.exit().remove()

        node = node.enter()
            .append("g")
            .attr("id", function (d) {
                return d.id;
            })
            .attr("class", "node")
            .call(d3.drag()
                .on("start", drag_start)
                .on("drag", drag_drag)
                .on("end", drag_end))
            .merge(node)

        node.append("image")
            .attr("class", "circle")
            .attr("style", function (d) {
                "transform-origin: " + (-params[Number(d.jb > 5 ? 5 : d.jb)].x1) + "px" + (-params[Number(d.jb > 5 ?
                    5 : d.jb)].y1) + "px"
            })
            .attr("xlink:href", function (d) {
                return params[Number(d.jb > 5 ? 5 : d.jb)].img1
            })
            .attr("x", function (d) {
                return params[Number(d.jb > 5 ? 5 : d.jb)].x1
            })
            .attr("y", function (d) {
                return params[Number(d.jb > 5 ? 5 : d.jb)].y1
            })
            .attr("width", function (d) {
                return params[Number(d.jb > 5 ? 5 : d.jb)].w1
            })
            .attr("height", function (d) {
                return params[Number(d.jb > 5 ? 5 : d.jb)].h1
            })

        node.append("image")
            .attr("xlink:href", function (d) {
                
                return params[Number(d.jb > 5 ? 5 : d.jb)].img2
            })
            .attr("x", function (d) {
                return params[Number(d.jb > 5 ? 5 : d.jb)].x2
            })
            .attr("y", function (d) {
                return params[Number(d.jb > 5 ? 5 : d.jb)].y2
            })
            .attr("width", function (d) {
                return params[Number(d.jb > 5 ? 5 : d.jb)].w2
            })
            .attr("height", function (d) {
                return params[Number(d.jb > 5 ? 5 : d.jb)].h2
            })

        node.append("svg:text")
            .style('font-family', 'Verdana, Arial, Helvetica, sans-serif;')
            .style('font-size', function (d) {
                return params[Number(d.jb > 5 ? 5 : d.jb)].ts;
            })
            .style('fill', function (d) {
                if (Number(d.jb) === 0) {
                    return "#4ee2fc"
                } else {
                    return "#061b2b"
                }
            })
            .attr("dx", function (d) {
                if (Number(d.jb) === 0) {
                    return -(strlen(String(d.fh)) * 4.4)
                } else {
                    
                    return params[Number(d.jb > 5 ? 5 : d.jb)].tx;
                }
            })
            .attr("dy", function (d) {
                return params[Number(d.jb > 5 ? 5 : d.jb)].ty;
            })
            .text(function (d) {
                return d.fh;
            })
        node.append("svg:text")
            .style('font-family', 'Verdana, Arial, Helvetica, sans-serif;')
            .style('font-size', function (d) {
                return params[Number(d.jb > 5 ? 5 : d.jb)].tsf;
            })
            .style('fill', function (d) {
                if (Number(d.jb) === 0) {
                    return "#4ee2fc"
                } else {
                    return "#ffffff"
                }
            })
            .attr("dx", function (d) {
                return params[Number(d.jb > 5 ? 5 : d.jb)].tsx;
            })
            .attr("dy", function (d) {
                return params[Number(d.jb > 5 ? 5 : d.jb)].tsy;
            })
            .attr("class", "textSub")
            .text(function (d) {
                return d.num;
            })
        node.append("title")
            .text(function (d) {
                return d.qc;
            });

        node.on('click', function (d) {
            d3.event.stopPropagation()
            var lines = g.selectAll("line[source-name='" + d.id + "']")._groups[0]
            if (lines.length > 0) { //有子节点
                removeLinesRecursive(d.id)
                removeNodesRecursive(d.id)
                update()
            } else { //无
                console.log("id:", d.id)
                requestData(d.id)
            }
        })

        // node.each(function (d) {
        //     if (d.jb == 0) {
        //         d.fx = window.innerWidth / 2
        //         d.fy = window.innerHeight / 2
        //     }
        // })

        var zoom_handler = d3.zoom()
            .on("zoom", zoom_actions);

        zoom_handler(svg);

        simulation.nodes(nodes_data);
        simulation
            .force("charge", d3.forceManyBody().strength(-1000))
            .force("center", d3.forceCenter(width / 2.2, height / 2.2))
            .force("links", d3.forceLink(links_data)
                .id(function (d) {
                    return d.id;
                })
                .distance(function (d) {
                    return params[Number(d.source.jb)].distance
                }));
        link = g.selectAll(".line").data(links_data, function (d) {
            return d.target;
        });
        link.exit().remove()
        link = link.enter().append("line")
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
            }).merge(link)

        simulation.on("tick", tickActions)
        simulation.alpha(.5).restart();
    }

    /** Functions **/

    //Drag functions 
    //d is the node 
    function drag_start(d) {
        node.each(function (d_each) {
            if ( d_each != d) {
                d_each.fx = null
                d_each.fy = null
            }
        })
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    svg.on('click', function(){
        console.log('clickclick')
        node.each(function (d) {
            d.fx = null
            d.fy = null
        })
    })

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
        g.attr("transform", d3.event.transform)
    }


    function tickActions() {
        //update circle positions each tick of the simulation 
        node.attr("cx", function (d) {
               
                return d.x = Math.max(radius, Math.min(width - radius, d.x));
            })
            .attr("cy", function (d) {
                return d.y = Math.max(radius, Math.min(height - radius, d.y)) - 150;
            });

        node.attr("transform", function (d) {
            var valx = Math.max(radius, Math.min(width - radius, d.x)) - 10 ;
            var valy = Math.max(radius, Math.min(height - radius, d.y)) + 150;
            return "translate(" + valx + ", " + valy + ")";
        });

        //update link positions 
        link.attr("x1", function (d) {
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
    }

    // 点击节点查询下级
    function requestData(id) {
        $.ajax({
            url: '${ctx}/web/rest/dwxx/getGyxxDwList',
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

    // 搜索查询目标节点
    function searchNode() {
        var nodeName = $("#nodename").val()
        if (nodeName.length > 0) {
            $.ajax({
                url: '',
                type: 'post',
                data: {
                    nodeName: nodeName
                },
                dataType: 'json',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                success: function (res) {
                    console.log('res', res)
                    var resObj = eval("(" + res + ")")
                    nodes_data = resObj.nodes
                    links_data = resObj.links
                    update()
                }
            })
        }
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
})(jQuery);