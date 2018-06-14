function cargarAvisos(){
  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  if(email !== null && pass !== null){

    $.ajax({
      url: 'http://sapo2018.000webhostapp.com/mostrarAvisos.php',
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
          var fecha;
          var contenido;
          var idAviso;
          var cantidad = data.cantidad;

          for (var i = 0; i < cantidad; i++) {
            titulo = data.datos[i].titulo;
            curso = data.datos[i].curso;
            fecha = data.datos[i].fecha;
            contenido = data.datos[i].contenido;
            idAviso = data.datos[i].idAviso;
            console.log("titulo: "+titulo+" curso: "+curso+" fecha: "+fecha+" contenido: "+contenido);
            text_html ='<tr>';
            text_html +='<td>'+titulo+'</td>';
            text_html +='<td>'+curso+'</td>';
            text_html +='<td>'+fecha+'</td>';
            text_html +='<td>'+contenido+'</td>';
            text_html +='<td><button onclick="editar(\''+idAviso+'\')" type="button" class="btn btn-primary">Editar</button></td>';
            text_html +='<td><button onclick="borrar(\''+idAviso+'\')" type="button" class="btn btn-primary">Eliminar</button></td>';
            text_html +='<tr>';
            $('#tablaAvisos').append(text_html);
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
        url: 'http://sapo2018.000webhostapp.com/eliminarAviso.php',
        method: 'POST',
        dataType: 'json',
        data: {
        email: email,
        id: id,
        pass: pass
        },
        success: function(data){
          if(data.resp){
            alert("Aviso eliminado con exito.");
            $("#contenido").load("avisosAdmin.html");
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
  $("#contenido").load("editarAviso.html");
}
