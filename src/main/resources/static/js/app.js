Blueprint = (function(){

    var author;
    var blueprints;
    var totalPoints;


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
        var bPrints = blueprints.map(function(bp){;
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
        var bluePrintTable = bPrints.map(function(plano){        
            var columna = "<tr><td id=\""+plano.nombre+"_\">"+plano.nombre+"</td><td align=\"center\">"+plano.puntos+"</td></tr>";
            $("table tbody").append(columna);
            return columna;
        });
    }

    function setBluePrints(blueprints){
        this.blueprints = blueprints;
    }
    

    return{
        getBluePrints : getBluePrints,
        setAuthor: setAuthor,
        setBluePrints: setBluePrints
    }

})();
Blueprint;