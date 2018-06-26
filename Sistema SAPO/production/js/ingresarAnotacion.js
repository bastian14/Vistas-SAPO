function subirAnotacion(){
  var titulo = $("#titulo").val();
  var curso = $("#cursos").val();
  var alumno = $("#alumno").val();
  var tipo = $("#tipo").val();
  var fecha = new Date();
  fecha = $("#single_cal1").val();
  var contenido = $("#contenidoAnotacion").val();

  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  console.log("guardo los datos");
  console.log(titulo);
  console.log(alumno);
  console.log(tipo);
  console.log(contenido);
  console.log(fecha);
  console.log(curso);
  if(email !== null && pass !== null){
    if (titulo !== null && curso !== "noSeleccionado" && fecha !== null && contenido !== null alumno !== null tipo !== null) {

      $.ajax({
        url: 'http://sapo2018.000webhostapp.com/ingresarAnotacion.php',
        method: 'POST',
        dataType: 'json',
        data: {
          titulo: titulo,
          curso: curso,
          alumno: alumno,
          tipo: tipo,
          fecha: fecha,
          contenido: contenido,
          email: email,
          pass: pass
        },
        success: function(data){
          if(data.resp){
            alert("ANOTACION INGRESADA CON EXITO");
            $("#contenido").load("anotacionesAdmin.html");
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

function cargarCursosIngresarAnotaciones(){
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
            text_html +='<option value="'+idCurso+'">'+grado+'</option>';
          }
          $('#cursos').append(text_html);
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
