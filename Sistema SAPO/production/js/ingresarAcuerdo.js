function subirAcuerdo(){
  var curso = $("#cursos").val();
  var fecha = new Date();
  fecha = $("#single_cal1").val();
  var contenido = $("#contenidoAcuerdo").val();

  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  console.log("guardo los datos");
  console.log(contenido);
  console.log(fecha);
  console.log(curso);
  if(email !== null && pass !== null){
    if (titulo !== null && curso !== null && fecha !== null && contenido !== null) {

      $.ajax({
        url: 'http://sapo2018.000webhostapp.com/ingresarAcuerdo.php',
        method: 'POST',
        dataType: 'json',
        data: {
          curso: curso,
          fecha: fecha,
          contenido: contenido,
          email: email,
          pass: pass
        },
        success: function(data){
          if(data.resp){
            alert("ACUERDO INGRESADO CON EXITO");
            $("#contenido").load("acuerdosTomadosAdmin.html");
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
