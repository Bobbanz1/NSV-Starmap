var starmap_path = 'assets/vendor/starmap_default.json'

$(document).ready(function(){
    load1();
})

function load1() {
    jQuery.getJSON(starmap_path, function(jsonData){
        var _systems;
        _systems = jsonData;
        var sectorNumber = "1";
        sector(_systems, sectorNumber);
    });        
}

function load2() {
    jQuery.getJSON(starmap_path, function(jsonData){
        var _systems;
        _systems = jsonData;
        var sectorNumber = "2";
        sector(_systems, sectorNumber);
    });        
}

function load3() {
    jQuery.getJSON(starmap_path, function(jsonData){
        var _systems;
        _systems = jsonData;
        var sectorNumber = "3";
        sector(_systems, sectorNumber);
    });        
}

function sector(_systems, sectorNumber) {
    var tmpl = $.templates("#sector" + sectorNumber);
    $(".outerbgdradis").html(tmpl.render(_systems));
    const canvas = document.createElement("svg");
    canvas.setAttribute("id", "compat");
    jQuery(_systems).each(function(i, node){
        var sys_info = node;
        var name = sys_info["name"];
        var x = sys_info["x"];
        var y = sys_info["y"];
        var hidden = sys_info["hidden"];
        var sector = sys_info["sector"];
        if (sector == sectorNumber) {
            document.getElementById(name).style.height = '1px';
            document.getElementById(name).style.position = 'absolute';
            document.getElementById(name).style.left = x * 12 + 'px';
            document.getElementById(name).style.bottom = y * 12 + 'px';
            document.getElementById(name).style.border = '1px solid #193a7a';    
        }
    });    
    document.getElementById("outerbgdradis").appendChild(canvas);
    sorter(sectorNumber);
}

function sorter(sectorNumber) {
    jQuery.getJSON(starmap_path,function(jsonData){
        var _systems;
        _systems = jsonData;
        jQuery(_systems).each(function(i, node){
        var sys_info = node;
        if (sys_info["sector"] == sectorNumber) {
            var name = sys_info["name"];
            var x = sys_info["x"];
            var y = sys_info["y"];
            if (sys_info["adjacency_list"] != "[]") {
                let adjacent = sys_info["adjacency_list"];
                let temp = adjacent.replace(/"/g, "");
                let dog = temp.replace(/]/g, "")
                let cat = dog.substr(1);
                var tempArray = cat.split(",");
                for (let index = 0; index < tempArray.length; index++) {
                    const element = tempArray[index];
                    lineCreator(name, element, x, y, _systems, sectorNumber);
                }
            };    
        }
        });
    });
}

function lineCreator(start, element, x, y, jsonData, sectorNumber) {
    const line = document.createElement("line");
    const temp = element;
    line.setAttribute("id", start +"-line-"+ element);
    document.getElementById("compat").appendChild(line);
    var sys = document.getElementById(element);
    let slipX = IntoX(temp, jsonData, sectorNumber);
    var slipY = IntoY(temp, jsonData, sectorNumber);
    var orgX = slipX;
    var orgY = slipY;
    var dx = orgX - x;
    var dy = orgY - y;
    var len = Math.sqrt(dx*dx+dy*dy);
    var angle = (180/Math.PI) * Math.atan2(dy, dx);
    starmap(x,y,len, line, -angle);
}

function IntoX(aser, jsonData, sector) {
    var cat;
    var _systems;
    _systems = jsonData;
    jQuery(_systems).each(function(i, node){
        var sys_info = node;
        if (sys_info["sector"] == sector) {
            let name = sys_info["name"];
                if (name === aser) {
                    cat = sys_info["x"];
                    return cat;
                };
            }
    });
    return cat;
}

function IntoY(int, jsonData, sector) {
    var cat;
        var _systems;
        _systems = jsonData;
        jQuery(_systems).each(function(i, node){
        var sys_info = node;
        if (sys_info["sector"] == sector) {
            var name = sys_info["name"];
            if (name === int) {
                cat = sys_info["y"];
                return cat;
            }
        }
    });
    return cat;
}

function starmap(x, y, len, line, angle) {
    var left = x * 12 + 'px';
    var bottom = y * 12 + 'px';
    var wid = len * 12 + 'px';
    var trans = 'rotate(' + angle + 'deg)';
    const htmlLine = "height: 1px; "
    + "position: absolute; "
    + "left: " + left + "; "
    + "bottom: " + bottom + "; "
    + "width: " + wid + "; "
    + "border: 0.5px solid #FFFFFF; "
    + "transform: " + trans + "; "
    + "msTransform: " + trans + "; "
    + "transformOrigin: center left; " 
    line.setAttribute("style", htmlLine);
}
