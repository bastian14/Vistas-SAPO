function cargarAcuerdos(){
  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  
  if(email !== null && pass !== null){

    $.ajax({
      url: 'http://sapo2018.000webhostapp.com/mostrarAcuerdos.php',
      method: 'POST',
      dataType: 'json',
      data: {
      email: email,
      pass: pass
      },
      success: function(data){
        if(data.resp){
          var profesor;
          var curso;
          var fecha;
          var contenido;
          var idAcuerdo;
          var cantidad = data.cantidad;

          for (var i = 0; i < cantidad; i++) {
            profesor = data.datos[i].profesor;
            curso = data.datos[i].curso;
            fecha = data.datos[i].fecha;
            contenido = data.datos[i].contenido;
            idAcuerdo = data.datos[i].idAcuerdo;
            console.log("profesor: "+profesor+" curso: "+curso+" fecha: "+fecha+" contenido: "+contenido);
            text_html ='<tr>';
            text_html +='<td>'+profesor+'</td>';
            text_html +='<td>'+curso+'</td>';
            text_html +='<td>'+fecha+'</td>';
            text_html +='<td>'+contenido+'</td>';
            text_html +='<td><button onclick="editar(\''+idAcuerdo+'\')" type="button" class="btn btn-primary">Editar</button></td>';
            text_html +='<td><button onclick="borrar(\''+idAcuerdo+'\')" type="button" class="btn btn-primary">Eliminar</button></td>';
            text_html +='<tr>';
            $('#tablaAcuerdos').append(text_html);
          }
        }else{
          alert('ERROR');
        }
      },
      error: function(){
        alert('ERROR 2');
      }
    });
  }else {
    alert('Debe iniciar sesión');
    document.location="login.html"
  }
}

function borrar(id){
  console.log(id);
  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  if(confirm("desea continuar")){
    if(email !== null && pass !== null){
      $.ajax({
        url: 'http://sapo2018.000webhostapp.com/eliminarAcuerdo.php',
        method: 'POST',
        dataType: 'json',
        data: {
        email: email,
        id: id,
        pass: pass
        },
        success: function(data){
          if(data.resp){
            alert("Acuerdo eliminado con exito.");
            $("#contenido").load("acuerdosTomadosAdmin.html");
          }else{
            alert('ERROR');
          }
        },
        error: function(){
          alert('ERROR 2');
        }
      });
    }else {
      alert('Debe iniciar sesión');
      document.location="login.html"
    }
  }
}


function editar(id){
  localStorage.setItem("idAvisoEdit", id);
  $("#contenido").load("editarAcuerdo.html");
}
