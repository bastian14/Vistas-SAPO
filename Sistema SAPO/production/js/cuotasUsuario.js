function cargarCuotasUsuario() {
  var email = localStorage.getItem("email");
  var pass = localStorage.getItem("pass");
  if(email !== null && pass !== null){
    $.ajax({
      url: 'http://sapo2018.000webhostapp.com/mostrarCuotasDetallesApoderados.php',
      method: 'POST',
      dataType: 'json',
      data: {
      email: email,
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
            text_html +='<td>'+value.mes+'</td>';
            text_html +='</tr>';
            $('#tablaCuotas').append(text_html);
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