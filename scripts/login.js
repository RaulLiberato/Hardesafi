var form = document.forms["formularioLogin"]

//eventos apos o botão de login ser apertado
document.getElementById("logIn").addEventListener("click", login);

async function pegaValores() {

    var formData = new FormData(form)

    var usuario = {}

    for (var i of formData.entries()) {
        if (i[0] === "senha" || i[0] === "senhaConfirma") {
            const encoder = new TextEncoder();
            const data = encoder.encode(i[1]);
            const buffer = await crypto.subtle.digest("SHA-512", data);
            var chars = Array.prototype.map.call(new Uint8Array(buffer), ch => String.fromCharCode(ch)).join('');
            usuario[i[0]] = btoa(chars);
        } else {
            usuario[i[0]] = i[1]
            console.log(usuario)
        }
    }

    verificaNulo(usuario)
    return usuario
}

//valida as inputs
function verificaNulo(usuario) {
    form.classList.add('was-validated')
}

function login() {

    pegaValores().then(usuario => {

        var usuarioLocalStorage = JSON.parse(localStorage.getItem(usuario.email));
        console.log(cu)

        if (usuarioLocalStorage && usuario.senha == usuarioLocalStorage.senha) {
            window.location.href = "file:///F:/Hardesafi-main/views/home.html"
        }
    })
}