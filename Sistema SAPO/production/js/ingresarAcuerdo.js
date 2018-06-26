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
  console.log(email);
  console.log(pass);
  if(email !== null && pass !== null){
    if (curso != "noSeleccionado" && fecha != null && contenido != null) {

      $.ajax({
        url: 'https://sapo2018.000webhostapp.com/IngresarAcuerdo.php',
        method: 'GET',
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
             //cargar('acuerdosTomadosAdmin');
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

function cargarCursosIngresarAcuerdos(){
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

          $.each( data.datos, function( key, value ) {
            console.log(value);
            text_html ='<option value="'+value.idCurso+'">'+value.grado+'</option>';
            $('#cursos').append(text_html);
          });

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
