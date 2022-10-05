Blueprint = (function(){

    var author;
    var blueprints;
    var totalPoints;
    var plano;
    var bps2;
    var planoM;
    var bp; 
    var canvas;
    var canvasM;
    var ctx;
    var ID;
    var bps;
    var AuthorNew;

    var apirest = apimock;

    var fun=function(list){
        blueprints = list;
    }

    function authorName(){
        author = document.getElementById("author").value;
        document.getElementById('nombreAutor').innerHTML = author;
    }

    function setAuthor(author){
        this.author = author;
    }

    function getBluePrints(){
        authorName();
        getBluePrintsByNameAndAuthor();
        updatePoints();
    }

    function updatePoints(){
        var points = blueprints.map(function(bp){
            return bp.points.length;
        })
        totalPoints = points.reduce(function(a,b){return a+b;});
        document.getElementById('totalPoints').innerHTML = totalPoints;
    }

    function getBluePrintsByNameAndAuthor(){
        $("table tbody").empty();
        apimock.getBlueprintsByAuthor(author,fun);
        bps = blueprints;
        bps2 = blueprints.map(function(bp){;
            if(bp.points.length==1){
                return {nombre:bp.name, puntos: bp.points[0].x + "," + bp.points[0].y};
            }
            else if(bp.points.length==2){
                return {nombre:bp.name, puntos: bp.points[0].x + "," + bp.points[0].y + "|||" + bp.points[bp.points.length-1].x + "," + bp.points[bp.points.length-1].y};
            }
            else{
                return {nombre:bp.name, puntos: bp.points.length};
            }
        })
        var bluePrintTable = bps2.map(function(plano){        
            var columna = "<tr><td align=\"center\" id=\""+plano.nombre+"\">"+plano.nombre+"</td><td align=\"center\">"+plano.puntos+"</td><td><button onclick=\"Blueprint.drawBlueprint("+plano.nombre+".id)\">Open</button></td></tr>";
            $("table tbody").append(columna);
            return columna;
        });
    }

    

    function setBluePrints(blueprints){
        this.blueprints = blueprints;
    }


    function repaint(ID,newPoint){
        bps.points.push(newPoint);
        console.log(bps.points)
        drawBlueprint(bps.name);
    }


    function drawBlueprint (id){
        canvas.width=canvas.width;
        AuthorNew= $("#author").val();
        canvasM = $("#canvas");
        canvas = $("#canvas")[0];
        ctx = canvas.getContext("2d");
        if(ID !=id){
            ID = id;
            apirest.getBlueprintsByNameAndAuthor($("#author").val(),ID,fun);
        }
        bps = blueprints;
        ctx.moveTo(bps.points[0]["x"],bps.points[0]["y"]);
        for(let i=1;i<bps.points.length; i++){
            ctx.lineTo(bps.points[i]["x"],bps.points[i]["y"]);
        }
        ctx.stroke();
    }

    function saveBlueprints(){
        console.log($("#author").val());
        console.log(ID);
        console.log(JSON.stringify(blueprints.points));
        apirest.updateBlueprint($("#author").val(),ID,JSON.stringify(blueprints.points),fun);
    }

    function deleteBlueprints(){
        canvas.width = canvas.width;
        apirest.deletePrint($("#author").val(),ID);
        $("table tbody").remove(); 
        actualizarPlanos();
    }

    function createBlueprints(){
        authorName();
        if(author === ''){
            alert("Por favor ingrese un nombre de Autor");
            return;
        }
        var bpname = prompt("Nombre del blueprint: ", "Nombre del nuevo blueprint");
        if (bpname === '' || bpname === null){
            alert("Por favor ingrese un nombre de blueprint");
            return;
        }
        var newbp = {author: author, name: bpname, points: []};
        apirest.postBlueprint( JSON.stringify(bpnew), readInputData);
    }
    

    return{
        getBluePrints : getBluePrints,
        setAuthor: setAuthor,
        setBluePrints: setBluePrints,
        drawBlueprint : drawBlueprint,
        saveBlueprints : saveBlueprints,
        deleteBlueprints : deleteBlueprints,
        createBlueprints : createBlueprints,
        init:function(){
            canvas = $("#canvas")[0];
            ctx = canvas.getContext("2d");
            let rect = canvas.getBoundingClientRect();
            console.info("Inicializando elementos...");
            if(window.PointerEvent){
                canvas.addEventListener("pointerdown", function(event){
                    var newPoint = {x:event.clientX-rect.left, y:event.clientY-rect.top-10};
                    repaint(ID,newPoint);
                });
            }  
        }
    }

})();
Blueprint;