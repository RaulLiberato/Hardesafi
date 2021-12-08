var form = document.forms["formularioLogin"]

//eventos apos o botão de login ser apertado
document.getElementById("create").addEventListener("click", criaUsuario)

var button = document.getElementById("arrow").addEventListener("click", voltaPagina)

function adicionaId() {
    const keys = Object.keys(localStorage);
    var lastId

    for (const key of keys) {

        objetoEmFormatoDeString = localStorage.getItem(key);

        lastId = Number(key.slice(8, key.length))
        console.log(lastId)
    }
}

//pega todos os valores do formulario
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

function criaUsuario() {

    pegaValores().then(usuario => {
        var id = adicionaId()

        if (!usuario.email && !usuario.senha && !usuario.senhaConfirma) {

        } else if (usuario.senha == usuario.senhaConfirma) {
            localStorage.setItem(usuario.email, JSON.stringify(usuario));

            window.location.href = "file:///F:/Hardesafi-main/views/login.html"

            form[0].reset();
        }

    })

}

//valida as inputs
function verificaNulo(usuario) {
    form.classList.add('was-validated')
}

function voltaPagina() {
    window.location.href = "file:///F:/Hardesafi-main/views/login.html"
}