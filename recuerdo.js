// console.log('Probando ejecución');

//Identificar el avegador donde se ejecutaba el código
function detectaNavegador(){
    let peticion;
    try{
        peticion = new ActiveXObject("Msxml2.xmlHTTP");
    }catch(error1){
        alert('Posible ERROR ' + error1);
        try{
            peticion = new XMLHttpRequest();
        }catch(error1){
            alert("Posible Error " + error1);
            try {
                peticion = new XMLHttpRequest();
            }catch(error2){
                alert("Posible Error " + error2);
                try{
                    peticion = new ActiveXObject("Microsoft.XMLHTTP");
                }catch(error3){
                    alert("Posible Error " + error3);
                    peticion = false;
                }
            }
        }
    }
    return peticion;
}

function PeticionServidor(xhrobtenido){
    let respuesta;
    xhrobtenido.open('GET', 'https://run.mocky.io/v3/48395366-06f1-4e1a-8418-a341f7ccc1e8', true); //Consume el recurso 'true' es para ejecutar de forma asincrona
    xhrobtenido.send(null);
    xhrobtenido.onreadystatechange = function(state){
        if(xhrobtenido.readyState == 4)
        { //peticion completada
            if(xhrobtenido.status == 200)
            {//peticion satisfactoria
                respuesta = xhrobtenido.responseXML;
                muestraXML(respuesta);
            }
            else{
                console.log("Ocurrió un error");
            }
        }
    }
    return respuesta;
}

function muestraXML(docxml){
    let arreglo = docxml.getElementsByTagName('profes');
    var tabla = "<tr><th>ID</th><th>Registro</th><th>Nombre</th><th>Apellido paterno</th><th>Apellido materno</th><th>Genero</th><th>Categoria</th><th>Correo</th><th>Celular</th><th>Civil</th></tr>"

    for(let i = 0; i < arreglo.length; i++){
        tabla += "<tr><td>";
        tabla += arreglo[i].getElementsByTagName('ID_Profe')[0].textContent;
        tabla += "</td><td>";
        tabla += arreglo[i].getElementsByTagName('RegistroEmpleado')[0].textContent; 
        tabla += "</td><td>";
        tabla += arreglo[i].getElementsByTagName('Nombre')[0].textContent;
        tabla += "</td><td>";
        tabla += arreglo[i].getElementsByTagName('Ap_pat')[0].textContent;
        tabla += "</td><td>";
        tabla += arreglo[i].getElementsByTagName('Ap_Mat')[0].textContent;
        tabla += "</td><td>";
        tabla += arreglo[i].getElementsByTagName('Genero')[0].textContent;
        tabla += "</td><td>";
        tabla += arreglo[i].getElementsByTagName('Categoria')[0].textContent;
        tabla += "</td><td>";
        tabla += arreglo[i].getElementsByTagName('Correo')[0].textContent;
        tabla += "</td><td>";
        tabla += arreglo[i].getElementsByTagName('Celular')[0].textContent;
        tabla += "</td><td>";
        tabla += arreglo[i].getElementsByTagName('F_EdoCivil')[0].textContent;
        tabla += "</td></tr>";
        
    }
    document.getElementById("tabla").innerHTML = tabla;
}

let xhr1 = detectaNavegador();
if(xhr1 != false){
    let respxml = PeticionServidor(xhr1);
    console.log(xhr1);
}

//https://run.mocky.io/v3/2af1fec1-3f48-4422-b90a-e97a1c3d1525