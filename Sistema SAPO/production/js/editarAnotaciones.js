function cargarDatos(){
  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  var id = localStorage.getItem("idAcuerdoEdit");
  if(email !== null && pass !== null && id != null){

    $.ajax({
      url: 'http://sapo2018.000webhostapp.com/editarAnotaciones.php',
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
          var alumno = data.datos.alumno;
          var tipo = data.datos.tipo;
          var fecha = data.datos.fecha;
          var contenido = data.datos.contenido;
          console.log("titulo: "+titulo+"idcurso: "+curso+"alumno: "+alumno+"fecha: "+fecha+"tipo: "+tipo+"contenido: "+contenido);
          $('#titulo').val(titulo);
          $('alumno').val(alumno);
          $('tipo').val(tipo);
          $('#cursos').val(curso);
          $('#single_cal1').val(fecha);
          $('#contenidoAnotacion').val(contenido);

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

          $.each( data.datos, function( key, value ) {
            console.log(value);
            text_html ='<option value="'+value.idCurso+'">'+value.grado+'</option>';
            $('#cursos').append(text_html);
          });

        }else{
          alert('ERROR');
        }
        cargarDatos();
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


function subirAnotacionEditada(){
  var titulo = $("#titulo").val();
  var curso = $("#cursos").val();
  var alumno = $("#alumno").val();
  var tipo = $("#tipo").val();
  var fecha = new Date();
  fecha = $("#single_cal1").val();
  var contenido = $("#contenidoAnotacion").val();

  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  var id = localStorage.getItem("idAnotacionEdit");
  console.log("guardo los datos");
  console.log(titulo);
  console.log(alumno);
  console.log(tipo);
  console.log(contenido);
  console.log(fecha);
  console.log(curso);
  if(email !== null && pass !== null && id != null){
    if (titulo !== null && curso !== null && fecha !== null && contenido !== null alumno !== null tipo !== null) {

      $.ajax({
        url: 'http://sapo2018.000webhostapp.com/editarInfoAnotacion.php',
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
          id: id,
          pass: pass
        },
        success: function(data){
          if(data.resp){
            alert("ANOTACION EDITADA CON EXITO");
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