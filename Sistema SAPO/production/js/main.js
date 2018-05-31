
function ingresar(){
  $("#preloader").show();
  var email = $('#email').val();
  var pass = $('#pass').val();


  if(email.length > 0 && pass.length > 0){
    console.log(pass);
    console.log(email);
    $.ajax({
    url: 'http://transgasa2018.000webhostapp.com/login.php',//cambiar link
    method: 'POST',
    dataType: 'json',
    data: {
      email: email,
      pass: pass
    },
    success: function(data){
      if(data.resp){
        localStorage.setItem("email", $('#email').val());
        localStorage.setItem("pass", $('#pass').val());
        switch (data.perfil) { //el servicio web devuelve el perfil del usuario y segun este se inicia el sistema
          case '1':
              document.location = "indexAdmin.html";
              console.log("email");
            break;
          case '2':
              document.location = "indexUser.html";
              console.log("pass");
            break;
          default:
              $("#preloader").hide();
              //document.location = "index.html"; //si no se encuentra registrado el perfil no se inicia sesion
        }
      }else{
        $("#preloader").hide();
        alert('Datos ingresados incorrectos');
      }
    },
    error: function(){
      $("#preloader").hide();
      alert('El WS no ha respondido');
    }
  });
  }else{
    alert('Campos de información vacios');
  }
}
