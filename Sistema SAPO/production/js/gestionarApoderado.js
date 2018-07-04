//---------------------- CARGAR ALUMNOS SIN APODERADOS ------------------------
function cargarAlumnosAgregarApo() {
  if(localStorage.getItem("email") !== null && localStorage.getItem("pass") !== null){
    var email = localStorage.getItem("email");
    var pass = localStorage.getItem("pass");
    $.ajax({
      url: 'http://sapo2018.000webhostapp.com/seleccionarAlumnoAgregarApo.php',
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
            text_html ='<option value="'+value.idAlumno+'">'+value.alumnoNombre+" "+value.alumnoApellido+'</option>';
            $('#alumnosAgregarApoderado').append(text_html);
          });

          //$('#cursos').append(text_html);
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


//---------------------- AGREGAR NUEVO APODERADOS ------------------------
function agregarNuevoApoderado() {

  var nombreApo = $("#nombreApoderado").val();
  var apellidoApo = $("#apellidoApoderado").val();
  var alumnosApo = $("#alumnosAgregarApoderado").val();
  var correoApo = $("#correoApoderado").val();
  var passApo = $("#contraseñaApoderado").val();
  //var passApo2 = $("#contraseñaApoderado2").val();

  var inputFile = document.getElementById("imagenApoderado");
  var file = inputFile.files[0];

  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");

  console.log("guardo los datos");
  console.log(nombreApo);
  console.log(apellidoApo);
  console.log(alumnosApo);
  console.log("archivo: "+file);


  var data = new FormData();

  data.append("archivo",file);
  data.append("nombreApo", nombreApo);
  data.append("apellidoApo",apellidoApo);
  data.append("alumnosApo", alumnosApo);
  data.append("correoApo",correoApo);
  data.append("passApo", passApo);
  data.append("email",email);
  data.append("pass", pass);

  if(email !== null && pass !== null){
    if (alumnosApo != "noSeleccionado" && nombreApo.length != 0 && apellidoApo.length != 0 && correoApo.length != 0 && passApo.length != 0 && file !== null) {
      //console.log(data);
      $.ajax({
        url: 'https://sapo2018.000webhostapp.com/ingresarApoderado.php',
        method: 'POST',
        dataType: 'json',
        contentType: false,
        data: data,
        processData: false,
        cache: false,
        success: function(data){
          console.log("good");
          if(data.resp){
            //alert("ACUERDO INGRESADO CON EXITO");
            console.log("success");
              $.toast({
                text : "<h2>APODERADO INGRESADO CON EXITO</h2>",
                showHideTransition : 'slide',  // It can be plain, fade or slide
                icon: 'success',
                bgColor : 'dark-red',              // Background color for toast
                textColor : '#eee',            // text color
                allowToastClose : false,       // Show the close button or not
                hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
                stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
                textAlign : 'left',            // Alignment of text i.e. left, right, center
                position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
              });
            $("#contenido").load("gestionarApoderado.html");
            //document.location="indexAdmin.html";
             //cargar('acuerdosTomadosAdmin');
            }else{
              console.log("error 1");
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
               });
            }
          },
          error: function(){
            //alert("EL WS NO RESPONDE");
            console.log("error 2");
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
            });
          }
        });
        console.log("Post ajax");
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
        });
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
      });
      document.location="login.html"
    }
}

//-------------------------- MOSTRAR APODERADOS ---------------------------------------

function cargarApoderadosGestionar() {
  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");

  if(email !== null && pass !== null){

    $.ajax({
      url: 'http://sapo2018.000webhostapp.com/mostrarApoderados.php',
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
            text_html ='<tr>';
            text_html +='<td>'+value.nombreApoderado+" "+value.apellidoApoderado+'</td>';
            text_html +='<td>'+value.nombreAlumno+" "+value.apellidoAlumno+'</td>';
            text_html +='<td>'+value.correoApoderado+'</td>';
            /*if (value.promedio != "0") {
              text_html +='<td>'+value.promedio.toFixed(1)+'</td>';
            }else {
              text_html +='<td>---</td>';
            }*/
            apoderado = value.nombreApoderado+" "+value.apellidoApoderado;

            text_html +='<td><button onclick="editarApoderadoGestionar(\''+value.idApoderado+'\');" type="button" class="btn btn-warning">Editar</button></td>';
            text_html +='<td><button onclick="eliminarApoderadoGestionar(\''+value.idApoderado+'\');" type="button" class="btn btn-danger">Eliminar</button></td>';
            text_html +='</tr>';
            $('#tablaGApoderados').append(text_html);
          });
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
          });
        }
      },
      error: function(){
        //alert('ERROR 2 <>');
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


//------------- EDITAR APODERADO----------------------

function eliminarApoderadoGestionar(id){
  console.log(id);
  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  if(confirm("desea continuar")){
    if(email !== null && pass !== null){
      $.ajax({
        url: 'http://sapo2018.000webhostapp.com/eliminarApoderado.php',
        method: 'POST',
        dataType: 'json',
        data: {
        email: email,
        id: id,
        pass: pass
        },
        success: function(data){
          if(data.resp){
            //alert("Acuerdo eliminado con exito.");
            $.toast({
              text : "<h2>Apoderado eliminado con exito</h2>",
              showHideTransition : 'slide',  // It can be plain, fade or slide
              icon: 'success',
              bgColor : 'dark-red',              // Background color for toast
              textColor : '#eee',            // text color
              allowToastClose : false,       // Show the close button or not
              hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
              stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
              textAlign : 'left',            // Alignment of text i.e. left, right, center
              position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
            });
            $("#contenido").load("gestionarApoderado.html");
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
          });
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
}


function editarApoderadoGestionar(id){
  localStorage.setItem("idApoderadoEdit", id);
  $("#contenido").load("editarApoderado.html");
}

function cargarAlumnosEditarApoderado() {
  if(localStorage.getItem("email") !== null && localStorage.getItem("pass") !== null && localStorage.getItem("idApoderadoEdit") !== null){
    var email = localStorage.getItem("email");
    var pass = localStorage.getItem("pass");
    var idApo = localStorage.getItem("idApoderadoEdit");
    $.ajax({
      url: 'http://sapo2018.000webhostapp.com/seleccionarAlumnoEditarApo.php',
      method: 'POST',
      dataType: 'json',
      data: {
      email: email,
      idApo: idApo,
      pass: pass
      },
      success: function(data){
        if(data.resp){

          $.each( data.datos, function( key, value ) {
            console.log(value);
            text_html ='<option value="'+value.idAlumno+'">'+value.alumnoNombre+" "+value.alumnoApellido+'</option>';
            $('#alumnosEditarApoderado').append(text_html);
          });
          cargarInfoEditarApoderado();
          //$('#cursos').append(text_html);
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

function cargarInfoEditarApoderado() {
  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  var idApo = localStorage.getItem("idApoderadoEdit");
  if(email !== null && pass !== null && idApo != null){

    $.ajax({
      url: 'http://sapo2018.000webhostapp.com/editarApoderado.php',
      method: 'POST',
      dataType: 'json',
      data: {
      email: email,
      idApo: idApo,
      pass: pass
      },
      success: function(data){
        if(data.resp){
          var nombreApoEdit = data.datos.nombreApoderado;
          var apellidoApoEdit = data.datos.apellidoApoderado;
          var idAlumnoEdit = data.datos.idAlumno;
          var correoApoEdit = data.datos.correoApoderado;
          var passApoEdit = data.datos.pApoderado;
          //console.log("titulo: "+titulo+"idcurso: "+curso+"fecha: "+fecha+"contenido: "+contenido);
          $('#nombreApoderado').val(nombreApoEdit);
          $('#apellidoApoderado').val(apellidoApoEdit);
          $('#alumnosEditarApoderado').val(idAlumnoEdit);
          $('#correoApoderado').val(correoApoEdit);
          $('#contraseñaApoderado').val(passApoEdit);

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
