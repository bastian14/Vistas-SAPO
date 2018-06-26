function subirAviso(){
  var titulo = $("#first-name").val();
  var curso = $("#cursos").val();
  var fecha = new Date();
  fecha = $("#single_cal1").val();
  var contenido = $("#contenidoAviso").val();

  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  console.log("guardo los datos");
  console.log(titulo);
  console.log(contenido);
  console.log(fecha);
  console.log(curso);
  if(email !== null && pass !== null){
    if (titulo !== null && curso !== "noSeleccionado" && fecha !== null && contenido !== null) {

      $.ajax({
        url: 'http://sapo2018.000webhostapp.com/ingresarAviso.php',
        method: 'POST',
        dataType: 'json',
        data: {
          titulo: titulo,
          curso: curso,
          fecha: fecha,
          contenido: contenido,
          email: email,
          pass: pass
        },
        success: function(data){
          if(data.resp){
            //alert("AVISO INGRESADO CON EXITO"); 
            $.toast({
              text : "<h2>AVISO INGRESADO CON EXITO</h2>",
              showHideTransition : 'slide',  // It can be plain, fade or slide
              icon: 'success',
              bgColor : 'dark-red',          // Background color for toast
              textColor : '#eee',            // text color
              allowToastClose : false,       // Show the close button or not
              hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
              stack : 1,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
              textAlign : 'left',            // Alignment of text i.e. left, right, center
              position : 'top-right'         // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
            });
            $("#contenido").load("avisosAdmin.html");
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
               });
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
            });
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
        })
      document.location="login.html"
    }
}

function cargarCursosIngresarAvisos(){
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
