function cargarDatos(){
  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  var id = localStorage.getItem("idAvisoEdit");
  if(email !== null && pass !== null && id != null){

    $.ajax({
      url: 'http://sapo2018.000webhostapp.com/editarAviso.php',
      method: 'POST',
      dataType: 'json',
      data: {
      email: email,
      id: id,
      pass: pass
      },
      success: function(data){
        if(data.resp){
          var titulo = data.datos.titulo;
          var curso = data.datos.idCurso;
          var fecha = data.datos.fecha;
          var contenido = data.datos.contenido;
          console.log("titulo: "+titulo+"idcurso: "+curso+"fecha: "+fecha+"contenido: "+contenido);
          $('#first-name').val(titulo);
          $('#cursos').val(curso);
          $('#single_cal1').val(fecha);
          $('#contenidoAviso').val(contenido);

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

function cargarCursos(){
  if(localStorage.getItem("email") !== null && localStorage.getItem("pass") !== null){
    var email = localStorage.getItem("email");
    var pass = localStorage.getItem("pass");
    $.ajax({
      url: 'http://sapo2018.000webhostapp.com/seleccionarCurso.php',
      method: 'POST',
      dataType: 'json',
      data: {
      email: email,
      pass: pass
      },
      success: function(data){
        if(data.resp){
          var grado;
          var idCurso;
          var cantidad = data.cantidad;

          for (var i = cantidad-1; i >= 0; i--) {
            console.log(data.datos[i].grado);
            grado = data.datos[i].grado;
            idCurso = data.datos[i].idCurso;
            //console.log(idCurso);
            text_html ='<option value="'+idCurso+'">'+grado+'</option>';
            $('#cursos').append(text_html);
          }
        }else{
          alert('ERROR');
        }
      },
      error: function(){
        alert('WS NO RESPONDE');
      }
    });
  }else {
    alert('Debe iniciar sesión');
    document.location="login.html"
  }
}


function subirAvisoEditado(){
  var titulo = $("#first-name").val();
  var curso = $("#cursos").val();
  var fecha = new Date();
  fecha = $("#single_cal1").val();
  var contenido = $("#contenidoAviso").val();

  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  var id = localStorage.getItem("idAvisoEdit");
  console.log("guardo los datos");
  console.log(titulo);
  console.log(contenido);
  console.log(fecha);
  console.log(curso);
  if(email !== null && pass !== null && id != null){
    if (titulo !== null && curso !== null && fecha !== null && contenido !== null) {

      $.ajax({
        url: 'http://sapo2018.000webhostapp.com/editarInfoAviso.php',
        method: 'POST',
        dataType: 'json',
        data: {
          titulo: titulo,
          curso: curso,
          fecha: fecha,
          contenido: contenido,
          email: email,
          id: id,
          pass: pass
        },
        success: function(data){
          if(data.resp){
            alert("AVISO EDITADO CON EXITO");
            $("#contenido").load("avisosAdmin.html");
            //document.location="indexAdmin.html";
            }else{
              console.log(data.resp2);
              alert("ERROR");
            }
          },
          error: function(){
            alert("EL WS NO RESPONDE");
          }
        });
      }else {
        alert('DEBE LLENAR TODOS LOS CAMPOS DE INFORMACION');
      }
    }else {
      alert('DEBE INICIAR SESIÓN');
      document.location="login.html"
    }
}
