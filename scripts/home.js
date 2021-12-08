//variavel que contem o formulario
var form = document.forms["formularioChallenge"]

var idAtual

var largura = window.screen.width;
console.log(largura);

//variaveis que recebem as divs dos botoes
var divSave = document.getElementById("save")
var divEdit = document.getElementById("edit")
var divModalConfirm = document.getElementById("modalConfirm")

divEdit.classList.add('hidden')

//evento apos o botão de save ser apertado
document.getElementById("btnSave").addEventListener("click", adicionarDesafio);

//evento apos o botão de abrir o formulario ser apertado
document.getElementById("addChallenge").addEventListener("click", colocaId);

//evento apos o botão de cancelar do save ser apertado
document.getElementById("btnCancelSave").addEventListener("click", removeErro);

//evento apos o botão de cencelar do edit ser apertado
document.getElementById("btnCancelEdit").addEventListener("click", removeErro);

//evento apos o botão de close ser apertado
document.getElementById("button-close").addEventListener("click", limpaform);


//pega o botao edit
var btnEdit = document.getElementById("btnEdit")

//pega o botao delete
var btnDelete = document.getElementById("btnDelete")

//pega o tbody
var tbody = document.getElementsByTagName("tbody")[0]

//pega o titulo do modalForm
var titleModal = document.getElementById("staticBackdropLabel")

//carrega os desafios ja inseridos
function carregaDesafios() {


    const keys = Object.keys(localStorage).filter((value) => value.startsWith("desafio"));
    var lastId

    for (const key of keys) {

        objetoEmFormatoDeString = localStorage.getItem(key);

        let desafioLocalStorage = JSON.parse(objetoEmFormatoDeString);

        criaTabela(desafioLocalStorage)

        lastId = Number(key.slice(8, key.length))
    }

    idAtual = Object.values(keys)[3]

    if (!lastId) {
        lastId = 0;
    }

    //pega apenas o id
    idAtual = lastId + 1;
    console.log(idAtual)
}

//chamada da funcao carrega desafios
carregaDesafios()

//pega todos os valores do formulario
function pegaValores() {

    var formData = new FormData(form)

    var desafio = {}

    for (var i of formData.entries()) {
        desafio[i[0]] = i[1]
    }
    verificaNulo(desafio)
    return desafio
}

//coloca o id a input
function colocaId() {

    if (!idAtual) {
        var inputId = document.getElementById("id")
        inputId.value = 1
        idAtual = 1
    } else {
        var inputId = document.getElementById("id")
        inputId.value = idAtual
    }

}

//cria a tabela para receber os dados
function criaTabela(desafio) {

    let novaLinha = document.createElement('tr')

    //pega a linha da tabela é adciona o id respectivo
    novaLinha.id = `tr_desafio_${desafio.id}`;

    //tudo do botao editar
    let editIcon = document.createElement('i')
    var botaoEditar = document.createElement('BUTTON')
    botaoEditar.setAttribute('data-bs-toggle', 'modal');
    botaoEditar.setAttribute('data-bs-target', '#modalForm');

    //pega o botao e adicona o id respectivo
    botaoEditar.id = `button_desafio_${desafio.id}`

    let tdEditar = document.createElement('td')
    tdEditar.id = `td_edit_desafio_${desafio.id}`

    //tudo do botao excluir
    let deleteIcon = document.createElement('i')
    var botaoExcluir = document.createElement('BUTTON')
    botaoExcluir.setAttribute('data-bs-toggle', 'modal');
    botaoExcluir.setAttribute('data-bs-target', '#modalConfirm');

    //pega o botao e adicona o id respectivo
    botaoExcluir.id = `button_desafio_${desafio.id}`

    let tdExcluir = document.createElement('td')
    tdExcluir.id = `td_delete_desafio_${desafio.id}`

    botaoEditar.setAttribute('data-bs-toggle', 'modal');
    botaoEditar.setAttribute('data-bs-target', '#modalForm');

    //tudo do drop donw
    var dropButton = document.createElement('BUTTON')
    dropButton.setAttribute('data-bs-toggle', 'dropdown');
    dropButton.classList.add("btn", "dropdown-toggle", "button-down", "font-size")

    dropButton.id = `drop_button_desafio_${desafio.id}`

    let tddrop = document.createElement('td')
    tddrop.classList.add('dropdown')

    let ulDrop = document.createElement('ul')
    ulDrop.setAttribute('aria-labelledby', `drop_button_desafio_${desafio.id}`)
    ulDrop.classList.add("dropdown-menu", "ul-drop", "ul-style")

    let liEdit = document.createElement('li')
    let aEdit = document.createElement('a')
    aEdit.classList.add("dropdown-item")
    aEdit.innerHTML = "edit"
    aEdit.setAttribute('data-bs-toggle', 'modal')
    aEdit.setAttribute('data-bs-target', '#modalForm')
    aEdit.id = `a_edit_desafio_${desafio.id}`

    let liDelete = document.createElement('li')
    let aDelete = document.createElement('a')
    aDelete.classList.add("dropdown-item")
    aDelete.innerHTML = "delete"
    aDelete.setAttribute('data-bs-toggle', 'modal')
    aDelete.setAttribute('data-bs-target', '#modalConfirm')
    aDelete.id = `a_delete_desafio_${desafio.id}`

    dropButton.innerHTML = "actions"

    //adciona os valores do formulario a nova linha da tabela
    for (key of Object.keys(desafio)) {
        let novaColuna = document.createElement('td')

        novaColuna.textContent = desafio[key]
        novaColuna.id = `td_desafio_${desafio.id}_${key}`;

        novaLinha.appendChild(novaColuna)
    }

    botaoEditar.onclick = (ev) => {
        titleModal.textContent = "edit challenge";

        editarDesafio(ev)
    }

    aEdit.onclick = (ev) => {
        titleModal.textContent = "edit challenge";

        editarDesafio(ev)
    }

    botaoExcluir.onclick = (ev) => {
        titleModal.textContent = "delete challenge";

        excluirDesafio(ev)
    }

    aDelete.onclick = (ev) => {
        titleModal.textContent = "delete challenge";

        excluirDesafio(ev)
    }

    editIcon.classList.add('fas', 'fa-pen', 'fa-lg')
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'fa-lg')

    botaoEditar.classList.add('button-edit', 'button-edit:hover')
    botaoExcluir.classList.add('button-delet', 'button-delet:hover')

    let body = document.getElementsByClassName("body")

    //appenda todos os itens
    botaoEditar.appendChild(editIcon)
    tdEditar.appendChild(botaoEditar)
    novaLinha.appendChild(tdEditar)

    botaoExcluir.appendChild(deleteIcon)
    tdExcluir.appendChild(botaoExcluir)
    novaLinha.appendChild(tdExcluir)

    liEdit.appendChild(aEdit)

    liDelete.appendChild(aDelete)

    ulDrop.appendChild(liEdit)
    ulDrop.appendChild(liDelete)

    tddrop.appendChild(dropButton)
    tddrop.appendChild(ulDrop)

    novaLinha.appendChild(tddrop)

    tbody.appendChild(novaLinha)

    if (largura <= 425) {
        tddrop.classList.remove("hidden-table")
        dropButton.classList.remove("button-down")
        ulDrop.classList.remove("ul-drop")
    }
}

//adciona nova linha a tabela
function adicionarDesafio() {
    var desafio = pegaValores()

    if (!desafio.title && !desafio.start && !desafio.end && !desafio.description) {

    } else {

        localStorage.setItem(`desafio_${idAtual}`, JSON.stringify(desafio));

        criaTabela(desafio)

        limpaform()

        //acrescenta mais 1 no id do novo desafio
        idAtual = idAtual + 1
        formularioChallenge["id"].value = idAtual

        removeErro()
    }
}

//edita um desafio ja existente
function editarDesafio(ev) {

    divEdit.classList.remove('hidden')
    divSave.classList.add('hidden')

    let btn = ev.delegateTarget.id;

    //pega apenas o id
    let localId = btn.slice(15, btn.length);

    //adciona o id nas trs
    var valores = document.querySelectorAll(`#tr_desafio_${localId} td`)

    //pega todos os valores da linha
    for (i = 0; i < valores.length; i++) {

        //pega o nome interiro de todos os campos do formulario
        let idElemento = valores[i].id

        //pega apenas o nome do campo do formulario
        let nomeCampo = idElemento.slice(13, idElemento.length)

        //atribui os valores da tabela no formulario
        if (form[nomeCampo]) {
            form[nomeCampo].value = valores[i].innerHTML;
        }
        console.log(localId)
    }

    //quando o botao de confirmacao edit for pressionado
    btnEdit.onclick = (ev) => {

        //pega os valores do formulario
        let desafio = pegaValores();

        //troca os values da linha especifica
        for (const [key, value] of Object.entries(desafio)) {
            let element = document.getElementById(`td_desafio_${localId}_${key}`)
            element.textContent = value
        }

        var desafioLocalStorage = JSON.parse(localStorage.getItem(`desafio_${localId}`))

        console.log(Object.values(desafioLocalStorage))

        for (let i of Object.values(desafioLocalStorage)) {
            localStorage.setItem(`desafio_${localId}`, JSON.stringify(desafio))
        }

        limpaform()
        removeErro()
    }
}

//exclui um desafio
function excluirDesafio(ev) {

    divSave.classList.add('hidden')

    titleModal.innerHTML = "delete challenge"

    let btn = ev.delegateTarget.id;

    //pega apenas o id
    let localId = btn.split("_").slice(this.length - 1);

    //adciona o id nas trs
    var valores = document.querySelectorAll(`#tr_desafio_${localId} td`)

    //pega a td especifica
    var td = document.querySelectorAll(`#tr_desafio_${localId}`)

    //pega todos os valores da linha
    for (i = 0; i < valores.length; i++) {

        //pega o nome interiro de todos os campos do formulario
        let idElemento = valores[i].id

        //pega apenas o nome do campo do formulario
        let nomeCampo = idElemento.slice(13, idElemento.length);

        //atribui os valores da tabela no formulario
        if (form[nomeCampo]) {
            form[nomeCampo].value = valores[i].innerHTML;
        }
    }

    //quando o botao de confirmacao edit for pressionado
    btnDelete.onclick = function (ev) {


        tbody.removeChild(td[0])
        localStorage.removeItem(`desafio_${localId}`)

        limpaform()
        removeErro()
    }
}

//valida as inputs
function verificaNulo(desafio) {
    form.classList.add('was-validated')
}

//adciona o id no formulario
function adicionarId() {
    formularioChallenge["id"].value = idAtual
}

//remove o erro das inputs do formulario
function removeErro() {
    titleModal.textContent = "new challenge";

    form.classList.remove('was-validated')
    divEdit.classList.add('hidden')
    divSave.classList.remove('hidden')
}

//limpa as inputs do formulario
function limpaform() {
    titleModal.textContent = "new challenge";

    formularioChallenge.reset()
    divEdit.classList.add('hidden')
    divSave.classList.remove('hidden')
}