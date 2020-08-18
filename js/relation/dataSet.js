var imageUrl="";
var defaultImg="";
var personInfoTag="info";
var relationTag="relationship";
var w = window.innerWidth,
    h = window.innerHeight;

var node_type=   //节点类型
{
    ROOT_NODE:0,
	PERSON_NODE:1,
    RELATION_NODE:2,
    INFO_NODE:3
};

var indexName = {};
var relationImg_index={};

var personImages=["images/outer_circle_n3.png"];
var infoImageUrl="images/circle_n3.png";

function intitImageArry(result) {
    indexName=result[relationTag];
    for(var key in indexName){
        relationImg_index[key]="images/"+key+".png";
    }
}


function initDatas(stuffName,list,groupIndex,preRelation) {
    var tmp={};
    tmp.name=stuffName;
    var status = list[relationTag]; 
    
    var picId;
    for(var key in status){
        list[key].map(function(item){
            picId = item.userPic;
            
            if( picId!=null && typeof(picId)!="undefined" ){
                tmp.img = picId + "png";
            }else{
                tmp.img=defaultImg;
            }
        })  
    }
    

    tmp.group=groupIndex;
    tmp.children=null;
    tmp.relaIndex="root";
    tmp.isRoot=true;
    tmp.nodeType=node_type.ROOT_NODE;
    tmp.danger=0;

    tmp.children=addRelationNode(tmp,list,preRelation);
    if(tmp.children!=null){
        for(var i=0;i<tmp.children.length;i++){
            var child=tmp.children[i];
                child.isRoot=true;
                child.children=addNormalNode(child,list[child.relaIndex]);
        }
    }
    
    return tmp;
}

function addNormalNode(tmp,list){
    var tmpArray=[];
    for(var i=0;i<list.length;i++){

        var obj={};
        obj.name=list[i].name;
        obj.relaIndex=tmp.relaIndex;
        obj.relation=indexName[tmp.relaIndex];
        obj.group=tmp.group+1;

        var picId=list[i].userPic;

        if( picId!=null && typeof(picId)!="undefined" ){
            obj.img=imageUrl+picId.substring(0,picId.length-3)+"png";
        }else{
            obj.img=defaultImg;
        }

        obj.nodeType=list[i].type; //或者可能是任务人物节点
        obj.children=null;
        obj.isRoot=false;

        obj.showInfo=list[i].showInfo;
        obj.danger=list[i].danger;
        // if(list[i].type == node_type.INFO_NODE){
        //
        // }
        tmpArray.push(obj);
    }
    return tmpArray;
}

function addRelationNode(parent,list,preRelation){
    var tmpArray=[];

    for(var key in  list){
        if(key==personInfoTag || key==relationTag){
            continue;
        }

        if(key == preRelation){
            continue;
        }
        tmpArray.push(createRelationNode(parent,key));
    }
    return tmpArray;
}

function createRelationNode(obj,index) {
    var tmp={};
    tmp.nodeType=node_type.RELATION_NODE;
    tmp.name=indexName[index];
    tmp.group=obj.group+1;
    tmp.children=null;
    tmp.relaIndex=index;
    tmp.isRoot=false;
    tmp.fixed=false;
    return tmp;
}

var i=0;
// Returns a list of all nodes under the root.
function flatten(root) {
    var nodes = [];
    // i = 0;

    function recurse(node) {
        if (node.children)
            node.size = node.children.reduce(function (p, v) {
                return p + recurse(v);
            }, 0);
        if (!node.id)
            node.id = ++i;

        nodes.push(node);
        return node.size;
    }

    root.size = recurse(root);
    return nodes;
}