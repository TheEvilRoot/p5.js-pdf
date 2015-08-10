var route = function() {
    var section = window.location.hash;
    section = section.replace(/#/g, "");
    if (["basic", "next", "custom", "vector"].indexOf(section) === -1) {
        window.location.hash = "basic";
        return;
    }
    // highlight current section
    document.querySelector('.current') && (document.querySelector('.current').className = '');
    document.querySelector('[href="#'+section+'"]').className = 'current';

    // todo: remove all canvas
    var req = new XMLHttpRequest();
    req.onload = function() {
        var code = req.response;
        document.getElementById("code").innerHTML = code;
        var patch = [
            "window.setup = setup;",
            "window.draw = draw;"
        ].join('');
        eval(code + patch);
        new p5(null, document.getElementById("canvas")); // global init p5
    };
    req.open("GET", "examples/" + section + ".js");
    req.send();
};

route();

window.onhashchange = route;
