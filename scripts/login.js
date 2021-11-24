var form = document.forms["formularioLogin"]

//eventos apos o botão de login ser apertado
document.getElementById("logIn").addEventListener("click",pegaValores);

function pegaValores(){

    var formData = new FormData(form)

    var usuario = {}
    
    for (var i of formData.entries()) {
        usuario[i[0]] = i[1]
        console.log(i[1])
    }
    verificaNulo(usuario)
}

//valida as inputs
function verificaNulo(usuario){
    form.classList.add('was-validated')

    if(usuario.email == "raul@gmail.com" && usuario.senha == "Batatadoce15"){
        window.location.href = "file:///F:/Hardesafi-main/views/home.html"
    }
}