function cargarAnotaciones(){
  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  if(email !== null && pass !== null){

    $.ajax({
      url: 'http://sapo2018.000webhostapp.com/mostrarAnotaciones.php',
      method: 'POST',
      dataType: 'json',
      data: {
      email: email,
      pass: pass
      },
      success: function(data){
        if(data.resp){
          var titulo;
          var curso;
          var alumno;
          var fecha;
          var tipo;
          var contenido;
          var idAnotacion;
          var cantidad = data.cantidad;

          for (var i = 0; i < cantidad; i++) {
            titulo = data.datos[i].titulo;
            curso = data.datos[i].curso;
            alumno = data.datos[i].alumno;
            fecha = data.datos[i].fecha;
            tipo = data.datos[i].tipo;
            contenido = data.datos[i].contenido;
            idAcuerdo = data.datos[i].idAnotacion;
            console.log("titulo: "+titulo+" curso: "+curso+"alumno: "+alumno+" fecha: "+fecha+"tipo: "+tipo+" contenido: "+contenido);
            text_html ='<tr>';
            text_html +='<td>'+titulo+'</td>';
            text_html +='<td>'+curso+'</td>';
            text_html +='<td>'+alumno+'</td>';
            text_html +='<td>'+fecha+'</td>';
            text_html +='<td>'+tipo+'</td>';
            text_html +='<td>'+contenido+'</td>';
            text_html +='<td><button onclick="editarAnotaciones(\''+idAnotacion+'\')" type="button" class="btn btn-primary">Editar</button></td>';
            text_html +='<td><button onclick="borrarAnotaciones(\''+idAnotacion+'\')" type="button" class="btn btn-primary">Eliminar</button></td>';
            text_html +='<tr>';
            $('#tablaAnotaciones').append(text_html);
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

function borrarAnotaciones(id){
  console.log(id);
  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  if(confirm("desea continuar")){
    if(email !== null && pass !== null){
      $.ajax({
        url: 'http://sapo2018.000webhostapp.com/eliminarAnotacion.php',
        method: 'POST',
        dataType: 'json',
        data: {
        email: email,
        id: id,
        pass: pass
        },
        success: function(data){
          if(data.resp){
            alert("Anotacion eliminada con exito.");
            $("#contenido").load("anotacionesAdmin.html");
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


function editarAnotaciones(id){
  localStorage.setItem("idAanotacionEdit", id);
  $("#contenido").load("editarAnotacion.html");
}
