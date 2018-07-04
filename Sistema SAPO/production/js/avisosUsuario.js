function cargarAvisos(){
  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  if(email !== null && pass !== null){

    $.ajax({
      url: 'http://sapo2018.000webhostapp.com/mostrarAvisosApoderados.php',
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
            //text_html +='<td><button onclick="editarAviso(\''+idAviso+'\')" type="button" class="btn btn-warning">Editar</button></td>';
            //text_html +='<td><button onclick="borrarAviso(\''+idAviso+'\')" type="button" class="btn btn-danger">Eliminar</button></td>';
            text_html +='<tr>';
            $('#tablaAvisos').append(text_html);
          }
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
