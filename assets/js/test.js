$(document).ready(function(){
    load();
})
function load() {
    jQuery.getJSON('assets/vendor/starmap_default.json',function(jsonData){
        var _systems;
        _systems = jsonData;
        startup(_systems);
    });        
}

function startup(_systems) {
    var tmpl = $.templates("#node-template");
    $(".outerbgdradis").html(tmpl.render(_systems));    
    jQuery(_systems).each(function(i, node){
        console.log(node);
        var sys_info = node;
        var name = sys_info["name"];
        var x = sys_info["x"];
        var y = sys_info["y"];
        var hidden = sys_info["hidden"];
        var sector = sys_info["sector"];
        if (sector == "1") {
            document.getElementById(name).style.height = '1px';
            document.getElementById(name).style.position = 'absolute';
            document.getElementById(name).style.left = x * 12 + 'px';
            document.getElementById(name).style.bottom = y * 12 + 'px';
            document.getElementById(name).style.border = '1px solid #193a7a';    
            if (sys_info["adjacency_list"] != "[]") {
                let adjacent = sys_info["adjacency_list"];
                let temp = adjacent.replace(/"/g, "");
                let dog = temp.replace(/]/g, "")
                let cat = dog.substr(1);
                const tempArray = cat.split(",");
                console.log(tempArray);
            };
        }
    });    
}