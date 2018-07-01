function cargarNotas(){
  document.getElementById('tablaNotas').innerHTML = '';
  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  var curso = $("#cursosNotas").val();
  var asignatura = $("#asignaturasNotas").val();
  localStorage.setItem('asignatura', asignatura);
  //,\''+value.idAsignatura+'\'
  if (curso != "noSeleccionado" && asignatura != "noSeleccionado"){

    if(email !== null && pass !== null){

      $.ajax({
        url: 'http://sapo2018.000webhostapp.com/mostrarNotas.php',
        method: 'POST',
        dataType: 'json',
        data: {
        email: email,
        curso: curso,
        asignatura: asignatura,
        pass: pass
        },
        success: function(data){
          if(data.resp){
            localStorage.setItem('nombreAsignatura', data.nombreAsignatura)
            var alumno;
            var cantidad = data.cantidad;
            var promedio = 0;
            $.each( data.datos, function( key, value ) {
              console.log(value);
              text_html ='<tr>';
              text_html +='<td>'+value.nombreAlumno+'</td>';
              text_html +='<td>'+value.apellidoAlumno+'</td>';
              if (value.promedio != "0") {
                text_html +='<td>'+value.promedio.toFixed(1)+'</td>';
              }else {
                text_html +='<td>---</td>';
              }
              alumno = value.nombreAlumno + " " + value.apellidoAlumno;
              text_html +='<td><button onclick="divDetallesNotas(\''+value.idAlumno+'\',\''+alumno+'\');" type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModalNotasDetalles">Ver Notas</button></td>';
              text_html +='<td><button onclick="divAgregarNotas(\''+value.idAlumno+'\',\''+alumno+'\');" type="button" class="btn btn-success" data-toggle="modal" data-target="#myModalAgregarNota">Agregar Nota</button></td>';
              text_html +='<td><button onclick="divEditarNotas(\''+value.idAlumno+'\',\''+alumno+'\');" type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModalEditarNota">Editar Nota</button></td>';
              text_html +='<td><button onclick="divEliminarNotas(\''+value.idAlumno+'\',\''+alumno+'\');" type="button" class="btn btn-danger" data-toggle="modal" data-target="#myModalEliminarNota">Eliminar Nota</button></td>';
              text_html +='</tr>';
              $('#tablaNotas').append(text_html);
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
          });
      document.location="login.html"
    }
  }else {
    $.toast({
        text : "<h2>DEBE SELECCIONAR CURSO Y ASIGNATURA</h2>",
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
}

function divDetallesNotas(id,alumno) {
  var nombreAsignatura = localStorage.getItem("nombreAsignatura");
  document.getElementById('tablaNotasDetalles').innerHTML = ''; //Elimina lo cargado anteriormente en la tabla
  console.log(alumno);
  document.getElementById('nombreAsignaturaDetalles').innerHTML = nombreAsignatura;
  document.getElementById('AlumnoNomApDetalles').innerHTML = alumno;

  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  var asignatura = localStorage.getItem("asignatura");
  if(email !== null && pass !== null && id !== null && asignatura !== null){

    $.ajax({
      url: 'http://sapo2018.000webhostapp.com/mostrarNotasDetalles.php',
      method: 'POST',
      dataType: 'json',
      data: {
      email: email,
      id: id,
      asignatura: asignatura,
      pass: pass
      },
      success: function(data){
        if(data.resp){
          var cont = 0;
          var cantidad = data.cantidad;

          $.each( data.datos, function( key, value ) {
            cont++;
            text_html ='<tr>';
            text_html +='<td>'+cont+'</td>';
            text_html +='<td>'+value.nota+'</td>';
            text_html +='</tr>';
            $('#tablaNotasDetalles').append(text_html);
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



function divAgregarNotas(id, alumno) {
  //document.getElementById('mesesPorPagar').innerHTML = '<option value="noSeleccionado">Elija un mes</option>';
  console.log(alumno);
  var nombreAsignatura = localStorage.getItem("nombreAsignatura");
  document.getElementById('nombreAsignaturaAAgregar').innerHTML = nombreAsignatura;
  document.getElementById('AlumnoNomApAgregarNota').innerHTML = alumno;
  localStorage.setItem("alumnoAAN", id);
}



function cargarCursosNotasDetalles(){
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
            $('#cursosNotas').append(text_html);
          });

          $('#cursos').append(text_html);
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


function cargarAsignaturasNotasDetalles(idCurso){
  document.getElementById('asignaturasNotas').innerHTML = '<option value="noSeleccionado">Elija una asignatura</option>';
  if(localStorage.getItem("email") !== null && localStorage.getItem("pass") !== null && idCurso !== null){
    var email = localStorage.getItem("email");
    var pass = localStorage.getItem("pass");
    $.ajax({
      url: 'http://sapo2018.000webhostapp.com/seleccionarAsignatura.php',
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
            text_html ='<option value="'+value.idAsignatura+'">'+value.nombreAsignatura+'</option>';

            $('#asignaturasNotas').append(text_html);
          });

          $('#cursos').append(text_html);
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



function agregarNuevaNota() {
  if(localStorage.getItem("email") !== null && localStorage.getItem("pass") !== null && localStorage.getItem("alumnoAAN") !== null && localStorage.getItem("asignatura") !== null){
    var email = localStorage.getItem("email");
    var pass = localStorage.getItem("pass");
    var id = localStorage.getItem("alumnoAAN");
    var asignatura = localStorage.getItem("asignatura");
    var nuevaNota = $("#notaNueva").val();

    if ($('#notaNueva').val().length !== 0){
      $.ajax({
        url: 'http://sapo2018.000webhostapp.com/agregarNota.php',
        method: 'POST',
        dataType: 'json',
        data: {
        email: email,
        id: id,
        nuevaNota: nuevaNota,
        asignatura: asignatura,
        pass: pass
        },
        success: function(data){
          if(data.resp){

            $.toast({
              text : "<h2>NOTA AGREGADA EXITOSAMENTE</h2>",
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
           $('#myModalAgregarNota').modal('hide'); //solo de prueba
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
      $.toast({
          text : "<h2>DEBE INGRESAR UNA NOTA</h2>",
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

//--------------------------------------- EDITAR Y ELIMINAR NOTAS (PRUEBA) ---------------------------------------------

function divEditarNotas(id,alumno) {
  var nombreAsignatura = localStorage.getItem("nombreAsignatura");
  document.getElementById('tablaNotasEditar').innerHTML = ''; //Elimina lo cargado anteriormente en la tabla
  console.log(alumno);
  document.getElementById('nombreAsignaturaEditar').innerHTML = nombreAsignatura;
  document.getElementById('AlumnoNomApEditar').innerHTML = alumno;
  localStorage.setItem("alumnoAEN", id);

  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  var asignatura = localStorage.getItem("asignatura");
  if(email !== null && pass !== null && id !== null && asignatura !== null){

    $.ajax({
      url: 'http://sapo2018.000webhostapp.com/mostrarNotasEditar.php',
      method: 'POST',
      dataType: 'json',
      data: {
      email: email,
      id: id,
      asignatura: asignatura,
      pass: pass
      },
      success: function(data){
        if(data.resp){
          var cont = 0;
          var cantidad = data.cantidad;

          $.each( data.datos, function( key, value ) {
            cont++;
            text_html ='<tr>';
            text_html +='<td>'+cont+'</td>';
            text_html +='<td><input type="text" id='+cont+' name="'+value.idNota+'" required="required" class="form-control col-md-7 col-xs-12"></td>';
            text_html +='</tr>';
            $('#tablaNotasEditar').append(text_html);
            $("#"+cont+"").val(value.nota);
            //Pruebas --> Funciona :3
            console.log($("#"+cont).attr("name"));
          });

          localStorage.setItem("cantidadDeNotas", cont);
          console.log("cantidadDeNotas: " + localStorage.getItem("cantidadDeNotas"));
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

function editarNotas() {

  for (var k = 1; k <= localStorage.getItem("cantidadDeNotas") ; k++) {
    if(localStorage.getItem("email") !== null && localStorage.getItem("pass") !== null && localStorage.getItem("alumnoAAN") !== null && localStorage.getItem("asignatura") !== null){
      var email = localStorage.getItem("email");
      var pass = localStorage.getItem("pass");
      var id = localStorage.getItem("alumnoAEN");
      var asignatura = localStorage.getItem("asignatura");
      var notaAEditar = $("#"+k).val();
      var idNota = $("#"+k).attr("name");
      console.log("idNota: "+idNota+", nota: "+notaAEditar);
      if (notaAEditar.length !== 0 || notaAEditar != ""){
        $.ajax({
          url: 'http://sapo2018.000webhostapp.com/editarNota.php',
          method: 'POST',
          dataType: 'json',
          data: {
          email: email,
          id: id,
          notaAEditar: notaAEditar,
          idNota: idNota,
          //asignatura: asignatura,
          pass: pass
          },
          success: function(data){
            if(data.resp){

              $.toast({
                text : "<h2>NOTA EDITADA EXITOSAMENTE</h2>",
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
             $('#myModalAgregarNota').modal('hide'); //solo de prueba
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
        $.toast({
            text : "<h2>DEBE INGRESAR UNA NOTA</h2>",
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

//----------- ELIMINAR ------------

function divEliminarNotas(id,alumno) {
  var nombreAsignatura = localStorage.getItem("nombreAsignatura");
  document.getElementById('tablaNotasEliminar').innerHTML = ''; //Elimina lo cargado anteriormente en la tabla
  console.log(alumno);
  document.getElementById('nombreAsignaturaEliminar').innerHTML = nombreAsignatura;
  document.getElementById('AlumnoNomApEliminar').innerHTML = alumno;
  localStorage.setItem("alumnoAEliN", id);

  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  var asignatura = localStorage.getItem("asignatura");
  if(email !== null && pass !== null && id !== null && asignatura !== null){

    $.ajax({
      url: 'http://sapo2018.000webhostapp.com/mostrarNotasEliminar.php',
      method: 'POST',
      dataType: 'json',
      data: {
      email: email,
      id: id,
      asignatura: asignatura,
      pass: pass
      },
      success: function(data){
        if(data.resp){
          var cont = 0;
          var cantidad = data.cantidad;

          $.each( data.datos, function( key, value ) {
            cont++;
            text_html ='<tr>';
            text_html +='<td>'+cont+'</td>';
            text_html +='<td>'+value.nota+'</td>'; //idNota
            text_html +='<td><input type="checkbox" id="'+cont+'" name="'+value.idNota+'"></td>'; // value="Bike"
            text_html +='</tr>';
            $('#tablaNotasEliminar').append(text_html);
            //$("#"+cont+"").val(value.nota);
            //Pruebas --> Funciona :3
            console.log($("#"+cont).attr("name"));
          });

          localStorage.setItem("cantidadDeNotasEliminar", cont);
          console.log("cantidadDeNotas: " + localStorage.getItem("cantidadDeNotasEliminar"));
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

function eliminarNotas() {
  for (var j = 1; j <= localStorage.getItem("cantidadDeNotasEliminar"); j++) {
    console.log("idNota: "+$("#"+j).attr("name"));
    console.log("valor checkbox: "+$("#"+j).prop('checked'));
    console.log("--------");

    if ($("#"+j).prop('checked') == true) {

      if(localStorage.getItem("email") !== null && localStorage.getItem("pass") !== null && localStorage.getItem("alumnoAAN") !== null && localStorage.getItem("asignatura") !== null){
        var email = localStorage.getItem("email");
        var pass = localStorage.getItem("pass");
        var id = localStorage.getItem("alumnoAEliN");
        //var asignatura = localStorage.getItem("asignatura");
        //var notaAEditar = $("#"+j).val();
        var idNotaAEliminar = $("#"+j).attr("name");
        //console.log("idNota: "+idNota+", nota: "+notaAEditar);
        if ($("#"+j).prop('checked') == true) { //es solo por ahora, despues lo elimino
          $.ajax({
            url: 'http://sapo2018.000webhostapp.com/eliminarNota.php',
            method: 'POST',
            dataType: 'json',
            data: {
            email: email,
            id: id,
            //notaAEditar: notaAEditar,
            idNotaAEliminar: idNotaAEliminar,
            //asignatura: asignatura,
            pass: pass
            },
            success: function(data){
              if(data.resp){

                $.toast({
                  text : "<h2>NOTA ELIMINADA EXITOSAMENTE</h2>",
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
               $('#myModalAgregarNota').modal('hide'); //solo de prueba
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
          $.toast({
              text : "<h2>DEBE INGRESAR UNA NOTA</h2>",
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
}
