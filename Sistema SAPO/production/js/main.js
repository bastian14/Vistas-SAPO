
function ingresar(){
  //$("#preloader").show();
  //------ PRELOADER ------
      getValues();
      someBlock.preloader({
          text: obj.textVal,
          percent: obj.percentVal,
          duration: obj.durationVal
      });
      $('.form-control').each(function(k,v) {
          if (v.value.length == 0) $(v).attr('disabled', true);
      });
  //------------
  var email = $('#email').val();
  var pass = $('#pass').val();

  if(email.length > 0 && pass.length > 0){
    //console.log(pass);
    //console.log(email);
    $.ajax({
    url: 'http://sapo2018.000webhostapp.com/login.php',//cambiar link
    method: 'POST',
    dataType: 'json',
    data: {
      email: email,
      pass: pass
    },
    success: function(data){
      if(data.resp){
        //$.toast("Ingreso exitoso")

        $.toast({
          text : "<h2>Ingreso exitoso</h2>",
          showHideTransition : 'success',  // It can be plain, fade or slide
          bgColor : 'green',              // Background color for toast
          textColor : '#eee',            // text color
          allowToastClose : false,       // Show the close button or not
          hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
          stack : 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
          textAlign : 'left',            // Alignment of text i.e. left, right, center
          position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
        })

        localStorage.setItem("email", $('#email').val());
        console.log(localStorage.getItem('email'));
        localStorage.setItem("pass", $('#pass').val());
        console.log(localStorage.getItem('pass'));
        switch (data.perfil) { //el servicio web devuelve el perfil del usuario y segun este se inicia el sistema
          case '1':
              document.location = "indexAdmin.html";
              //console.log("email");
            break;
          case '2':
              document.location = "indexUser.html";
              //console.log("pass");
            break;
          default:
              $("#preloader").hide();
              //document.location = "index.html"; //si no se encuentra registrado el perfil no se inicia sesion
        }
      }else{
        // PRELOADER
        someBlock.preloader('remove');
        $('.form-control').attr('disabled', false);
        //--------

        $//("#preloader").hide();
        //alert('Datos ingresados incorrectos');
        $.toast({
          text : "<h2>Las redenciales ingresadas son incorrectas</h2>",
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
    },
    error: function(){
      // PRELOADER
      someBlock.preloader('remove');
      $('.form-control').attr('disabled', false);
      //--------

      //$("#preloader").hide();
      //alert('El WS no ha respondido');
      $.toast({
        text : "<h2>El WS no ha respondido</h2>",
        showHideTransition : 'slide',  // It can be plain, fade or slide
        icon: 'error',
        bgColor : 'dark-red',              // Background color for toast
        textColor : '#eee',            // text color
        allowToastClose : false,       // Show the close button or not
        hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
        stack : 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
        textAlign : 'left',            // Alignment of text i.e. left, right, center
        position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
      })
    }
  });
  }else{
    //alert('Campos de información vacios');
    // PRELOADER
    someBlock.preloader('remove');
    $('.form-control').attr('disabled', false);
    //--------
    
    $.toast({
      text : "<h2>Campos de información vacios</h2>",
      showHideTransition : 'slide',  // It can be plain, fade or slide
      icon: 'warning',
      bgColor : 'dark-red',              // Background color for toast
      textColor : '#eee',            // text color
      allowToastClose : false,       // Show the close button or not
      hideAfter : 2000,              // `false` to make it sticky or time in miliseconds to hide after
      stack : 5,                     // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
      textAlign : 'left',            // Alignment of text i.e. left, right, center
      position : 'top-right'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
    })
  }
}
