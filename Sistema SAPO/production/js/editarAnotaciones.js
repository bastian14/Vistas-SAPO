function cargarDatosEditarAnotacionesAdmin(){
  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  var id = localStorage.getItem("idAnotacionEdit");
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
          //var alumno = data.datos.alumno;
          var tipo = data.datos.tipo;
          var fecha = data.datos.fecha;
          var contenido = data.datos.contenido;
          console.log("titulo: "+titulo+"\nidcurso: "+curso+"\nfecha: "+fecha+"\ntipo: "+tipo+"\ncontenido: "+contenido);
          $('#titulo').val(titulo);
          //$('alumnosEditarAnotacionesAdmin').val(alumno);
          //$('tipoDeAnotacionEditarA').val(tipo);
          //$('#tipoDeAnotacionEditarA option[value="0"]').attr("selected", true);
          document.ready = document.getElementById("tipoDeAnotacionEditarA").value = tipo;

          //$('#cursosEditarAnotaciones').val(curso);
          document.ready = document.getElementById("cursosEditarAnotaciones").value = curso;

          $('#single_cal1').val(fecha);
          $('#contenidoAnotacionEditarAnotacion').val(contenido);
          cargarAlumnosEditarAnotacionAdmin(curso);
          cargarAlumnoAnotacion();
        }else{
          //alert('ERROR');
          $.toast({
            text : "<h2>ERROR</h2>",
            showHideTransition : 'slide',  // It can be plain, fade or slide
            icon: 'error',
            bgColor : 'dark-red',              // Background color for toast
            textColor : '#eee',            // text color
            allowToastClose : false,       // Show the close button or not
            hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
            stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
            textAlign : 'left',            // Alignment of text i.e. left, right, center
            position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
          })
        }
      },
      error: function(){
        //alert('ERROR 2');
        $.toast({
          text : "<h2>ERROR AL CARGAR LOS DATOS</h2>",
          showHideTransition : 'slide',  // It can be plain, fade or slide
          icon: 'error',
          bgColor : 'dark-red',              // Background color for toast
          textColor : '#eee',            // text color
          allowToastClose : false,       // Show the close button or not
          hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
          stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
          textAlign : 'left',            // Alignment of text i.e. left, right, center
          position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
        })
      }
    });
  }else {
    //alert('Debe iniciar sesión');
    $.toast({
      text : "<h2>Debe iniciar sesión</h2>",
      showHideTransition : 'slide',  // It can be plain, fade or slide
      icon: 'warning',
      bgColor : 'dark-red',              // Background color for toast
      textColor : '#eee',            // text color
      allowToastClose : false,       // Show the close button or not
      hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
      stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
      textAlign : 'left',            // Alignment of text i.e. left, right, center
      position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
    })
    document.location="login.html"
  }
}

function cargarCursosEditarAnotacionesAdmin(){
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
            $('#cursosEditarAnotaciones').append(text_html);
          });
          cargarDatosEditarAnotacionesAdmin();
        }else{
          //alert('ERROR');
          $.toast({
            text : "<h2>ERROR</h2>",
            showHideTransition : 'slide',  // It can be plain, fade or slide
            icon: 'error',
            bgColor : 'dark-red',              // Background color for toast
            textColor : '#eee',            // text color
            allowToastClose : false,       // Show the close button or not
            hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
            stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
            textAlign : 'left',            // Alignment of text i.e. left, right, center
            position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
          })
        }
      },
      error: function(){
        //alert('WS NO RESPONDE');
        $.toast({
          text : "<h2>WS NO RESPONDE</h2>",
          showHideTransition : 'slide',  // It can be plain, fade or slide
          icon: 'warning',
          bgColor : 'dark-red',              // Background color for toast
          textColor : '#eee',            // text color
          allowToastClose : false,       // Show the close button or not
          hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
          stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
          textAlign : 'left',            // Alignment of text i.e. left, right, center
          position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
        })
      }
    });
  }else {
    //alert('Debe iniciar sesión');
    $.toast({
      text : "<h2>Debe iniciar sesión</h2>",
      showHideTransition : 'slide',  // It can be plain, fade or slide
      icon: 'warning',
      bgColor : 'dark-red',              // Background color for toast
      textColor : '#eee',            // text color
      allowToastClose : false,       // Show the close button or not
      hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
      stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
      textAlign : 'left',            // Alignment of text i.e. left, right, center
      position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
    })
    document.location="login.html"
  }
}


function cargarAlumnosEditarAnotacionAdmin(idCurso) {
  document.getElementById('alumnosEditarAnotacionesAdmin').innerHTML = '<option value="noSeleccionado">Elija un alumno</option>';
  if(localStorage.getItem("email") !== null && localStorage.getItem("pass") !== null && idCurso !== null){
    var email = localStorage.getItem("email");
    var pass = localStorage.getItem("pass");

    $.ajax({
      url: 'http://sapo2018.000webhostapp.com/seleccionarAlumno2.php',
      method: 'POST',
      dataType: 'json',
      data: {
      email: email,
      idCurso: idCurso,
      pass: pass
      },
      success: function(data){
        if(data.resp){
          $.each( data.datos, function( key, value ) {
            console.log(value);
            text_html ='<option value="'+value.idAlumno+'">'+value.nombreAlumno+" "+value.apellidoAlumno+'</option>';
            $('#alumnosEditarAnotacionesAdmin').append(text_html);
          });


          //setTimeout(cargarAlumnoAnotacion, 5000);
        }else{
          //alert('ERROR');
          $.toast({
            text : "<h2>ERROR AL CARGAR ALUMNO</h2>",
            showHideTransition : 'slide',  // It can be plain, fade or slide
            icon: 'error',
            bgColor : 'dark-red',              // Background color for toast
            textColor : '#eee',            // text color
            allowToastClose : false,       // Show the close button or not
            hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
            stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
            textAlign : 'left',            // Alignment of text i.e. left, right, center
            position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
         });
        }
      },
      error: function(){
        //alert('WS NO RESPONDE');
        $.toast({
          text : "<h2>WS NO RESPONDE</h2>",
          showHideTransition : 'slide',  // It can be plain, fade or slide
          icon: 'warning',
          bgColor : 'dark-red',              // Background color for toast
          textColor : '#eee',            // text color
          allowToastClose : false,       // Show the close button or not
          hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
          stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
          textAlign : 'left',            // Alignment of text i.e. left, right, center
          position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
      });
      }
    });
  }else {
    //alert('Debe iniciar sesión');
    $.toast({
      text : "<h2>Debe iniciar sesión</h2>",
      showHideTransition : 'slide',  // It can be plain, fade or slide
      icon: 'warning',
      bgColor : 'dark-red',              // Background color for toast
      textColor : '#eee',            // text color
      allowToastClose : false,       // Show the close button or not
      hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
      stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
      textAlign : 'left',            // Alignment of text i.e. left, right, center
      position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
  });
    document.location="login.html"
  }
}
//-----------------------------------------INICIO-----------------------------------------------------------

  function cargarAlumnoAnotacion(){
    var email = localStorage.getItem("email");
    var pass = localStorage.getItem("pass");
    var id = localStorage.getItem("idAnotacionEdit");
    if(email !== null && pass !== null && id != null){
      console.log("uff uff");
      $.ajax({
        url: 'http://sapo2018.000webhostapp.com/seleccionarAlumnoEditarAnotaciones.php',
        method: 'POST',
        dataType: 'json',
        data: {
        email: email,
        id: id,
        pass: pass
        },
        success: function(data){
          if(data.resp){
            var alumno = data.idAlumno;
            console.log("alumno ID: "+alumno);
            document.ready = document.getElementById("alumnosEditarAnotacionesAdmin").value = alumno;
            //$('alumnosEditarAnotacionesAdmin').val(data.idAlumno);
          }else{
            //alert('ERROR');
            $.toast({
              text : "<h2>ERROR</h2>",
              showHideTransition : 'slide',  // It can be plain, fade or slide
              icon: 'error',
              bgColor : 'dark-red',              // Background color for toast
              textColor : '#eee',            // text color
              allowToastClose : false,       // Show the close button or not
              hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
              stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
              textAlign : 'left',            // Alignment of text i.e. left, right, center
              position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
            })
          }
        },
        error: function(){
          //alert('ERROR 2');
          $.toast({
            text : "<h2>ERROR 2</h2>",
            showHideTransition : 'slide',  // It can be plain, fade or slide
            icon: 'error',
            bgColor : 'dark-red',              // Background color for toast
            textColor : '#eee',            // text color
            allowToastClose : false,       // Show the close button or not
            hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
            stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
            textAlign : 'left',            // Alignment of text i.e. left, right, center
            position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
          })
        }
      });
    }else {
      //alert('Debe iniciar sesión');
      $.toast({
        text : "<h2>Debe iniciar sesión</h2>",
        showHideTransition : 'slide',  // It can be plain, fade or slide
        icon: 'warning',
        bgColor : 'dark-red',              // Background color for toast
        textColor : '#eee',            // text color
        allowToastClose : false,       // Show the close button or not
        hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
        stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
        textAlign : 'left',            // Alignment of text i.e. left, right, center
        position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
      })
      document.location="login.html"
    }
  }

//------------------------------------------ FIN ----------------------------------------------------------

function subirAnotacionEditada(){
  var titulo = $("#titulo").val();
  var curso = $("#cursosEditarAnotaciones").val();
  var alumno = $("#alumnosEditarAnotacionesAdmin").val();
  var tipo = $("#tipoDeAnotacionEditarA").val();
  var fecha = new Date();
  fecha = $("#single_cal1").val();
  var contenido = $("#contenidoAnotacionEditarAnotacion").val();

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
    if (titulo !== null && curso != "noSeleccionado" && fecha !== null && contenido !== null && alumno != "noSeleccionado" && tipo != "noSeleccionado") {

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
            //alert("ANOTACION EDITADA CON EXITO");
            $.toast({
              text : "<h2>ANOTACION EDITADA CON EXITO</h2>",
              showHideTransition : 'slide',  // It can be plain, fade or slide
              icon: 'success',
              bgColor : 'dark-red',              // Background color for toast
              textColor : '#eee',            // text color
              allowToastClose : false,       // Show the close button or not
              hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
              stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
              textAlign : 'left',            // Alignment of text i.e. left, right, center
              position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
            })
            $("#contenido").load("anotacionesAdmin.html");
            //document.location="indexAdmin.html";
            }else{
              console.log(data.resp2);
              //alert("ERROR");
              $.toast({
                text : "<h2>ERROR</h2>",
                showHideTransition : 'slide',  // It can be plain, fade or slide
                icon: 'error',
                bgColor : 'dark-red',              // Background color for toast
                textColor : '#eee',            // text color
                allowToastClose : false,       // Show the close button or not
                hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
                stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
                textAlign : 'left',            // Alignment of text i.e. left, right, center
                position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
              })
            }
          },
          error: function(){
            //alert("EL WS NO RESPONDE");
             $.toast({
              text : "<h2>EL WS NO RESPONDE</h2>",
              showHideTransition : 'slide',  // It can be plain, fade or slide
              icon: 'warning',
              bgColor : 'dark-red',              // Background color for toast
              textColor : '#eee',            // text color
              allowToastClose : false,       // Show the close button or not
              hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
              stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
              textAlign : 'left',            // Alignment of text i.e. left, right, center
              position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
            })
          }
        });
      }else {
        //alert('DEBE LLENAR TODOS LOS CAMPOS DE INFORMACION');
        $.toast({
          text : "<h2>DEBE LLENAR TODOS LOS CAMPOS DE INFORMACION</h2>",
          showHideTransition : 'slide',  // It can be plain, fade or slide
          icon: 'warning',
          bgColor : 'dark-red',              // Background color for toast
          textColor : '#eee',            // text color
          allowToastClose : false,       // Show the close button or not
          hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
          stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
          textAlign : 'left',            // Alignment of text i.e. left, right, center
          position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
        })
      }
    }else {
      //alert('DEBE INICIAR SESIÓN');
      $.toast({
        text : "<h2>DEBE INICIAR SESIÓN</h2>",
        showHideTransition : 'slide',  // It can be plain, fade or slide
        icon: 'warning',
        bgColor : 'dark-red',              // Background color for toast
        textColor : '#eee',            // text color
        allowToastClose : false,       // Show the close button or not
        hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
        stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
        textAlign : 'left',            // Alignment of text i.e. left, right, center
        position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
      })
      document.location="login.html"
    }
}
