//variavel que contem o formulario
var form = document.forms["formularioChallenge"]

//id dos desafios
var idAtual = 1

//variaveis que recebem as divs dos botoes
var divSave = document.getElementById("save")
var divEdit = document.getElementById("edit")
var divDelete = document.getElementById("delete")

divEdit.classList.add('hidden')
divDelete.classList.add('hidden')

//evento apos o botão de save ser apertado
document.getElementById("btnSave").addEventListener("click",adicionarDesafio);

//evento apos o botão de abrir o formulario ser apertado
document.getElementById("addChallenge").addEventListener("click",adicionarId);

//evento apos o botão de cancelar do save ser apertado
document.getElementById("btnCancelSave").addEventListener("click",removeErro);

//evento apos o botão de cencelar do edit ser apertado
document.getElementById("btnCancelEdit").addEventListener("click",removeErro);

//evento apos o botão de cencelar do delete ser apertado
document.getElementById("btnCancelDelete").addEventListener("click",removeErro);

//evento apos o botão de close ser apertado
document.getElementById("button-close").addEventListener("click",limpaform);

//pega o botao edit
var btnEdit = document.getElementById("btnEdit")

//pega o botao delete
var btnDelete = document.getElementById("btnDelete")

//pega o tbody
var tbody = document.getElementsByTagName("tbody")[0]

//pega o titulo do modalForm
var titleModal = document.getElementById("staticBackdropLabel")

//pega todos os valores do formulario
function pegaValores(){

    var formData = new FormData(form)

    var desafio = {}
    
    for (var i of formData.entries()) {
        desafio[i[0]] = i[1]
    }
    verificaNulo(desafio)
    return desafio
}

//adciona nova linha a tabela
function adicionarDesafio(){
    var desafio = pegaValores()

    if(!desafio.title && !desafio.start && !desafio.end && !desafio.description){
        
    } 
    else{

        localStorage.setItem(`desafio_${idAtual}`, JSON.stringify(desafio));

        let novaLinha = document.createElement('tr')

        //pega a linha da tabela é adciona o id respectivo
        novaLinha.id = `tr_desafio_${idAtual}`;

        //tudo do botao editar
        let editIcon = document.createElement('i')
        var botaoEditar = document.createElement('BUTTON')
        botaoEditar.setAttribute('data-bs-toggle','modal');
        botaoEditar.setAttribute('data-bs-target','#modalForm');

        //pega o botao e adicona o id respectivo
        botaoEditar.id = `button_desafio_${idAtual}`

        botaoEditar.onclick = (ev) => {
            titleModal.textContent = "edit challenge";

            editarDesafio(ev)
        }


        //pega o botao e adicina o id respectivo
        botaoEditar.id = `button_desafio_${idAtual}`

        let tdEditar = document.createElement('td')

        //tudo do botao excluir
        let deleteIcon = document.createElement('i')
        var botaoExcluir = document.createElement('BUTTON')
        botaoExcluir.setAttribute('data-bs-toggle','modal');
        botaoExcluir.setAttribute('data-bs-target','#modalForm');

        //pega o botao e adicona o id respectivo
        botaoExcluir.id = `button_desafio_${idAtual}`

        botaoExcluir.onclick = (ev) => {
            titleModal.textContent = "delete challenge";

            excluirDesafio(ev)
        }

        //pega o botao e adicina o id respectivo
        botaoExcluir.id = `button_desafio_${idAtual}`

        let tdExcluir = document.createElement('td')

        //adciona os valores do formulario a nova linha da tabela
        for(key of Object.keys(desafio)){
            let novaColuna = document.createElement('td')

            novaColuna.textContent = desafio[key]
            novaColuna.id = `td_desafio_${idAtual}_${key}`;

            novaLinha.appendChild(novaColuna)
        }

        editIcon.classList.add('fas','fa-pen','fa-lg')
        deleteIcon.classList.add('fas','fa-trash-alt','fa-lg')

        botaoEditar.classList.add('button-edit','button-edit:hover')
        botaoExcluir.classList.add('button-delet','button-delet:hover')

        //appenda todos os itens
        botaoEditar.appendChild(editIcon)
        tdEditar.appendChild(botaoEditar)
        novaLinha.appendChild(tdEditar)

        botaoExcluir.appendChild(deleteIcon)
        tdExcluir.appendChild(botaoExcluir)
        novaLinha.appendChild(tdExcluir)

        tbody.appendChild(novaLinha)

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
        if(form[nomeCampo]) {
            form[nomeCampo].value = valores[i].innerHTML;
        }
    }

    //quando o botao de confirmacao edit for pressionado
    btnEdit.onclick = (ev) =>{

        //pega os valores do formulario
        let desafio = pegaValores();

        //troca os values da linha especifica
        for (const [key, value] of Object.entries(desafio)) {
            let element = document.getElementById(`td_desafio_${localId}_${key}`)
            element.textContent = value
        }

        limpaform()
        removeErro()
    } 
}

//exclui um desafio
function excluirDesafio(ev){

    divDelete.classList.remove('hidden')
    divSave.classList.add('hidden')

    titleModal.innerHTML = "delete challenge"

    let btn = ev.delegateTarget.id;

    //pega apenas o id
    let localId = btn.slice(15, btn.length);

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
        if(form[nomeCampo]) {
            form[nomeCampo].value = valores[i].innerHTML;
        }
    }

    //quando o botao de confirmacao edit for pressionado
    btnDelete.onclick = function (ev) {
        tbody.removeChild(td[0])
        limpaform()
        removeErro()
    } 
}

//valida as inputs
function verificaNulo(desafio){
    form.classList.add('was-validated')
}

//adciona o id no formulario
function adicionarId(){
    formularioChallenge["id"].value = idAtual
}

//remove o erro das inputs do formulario
function removeErro(){
    titleModal.textContent = "new challenge";

    form.classList.remove('was-validated')
    divDelete.classList.add('hidden')
    divEdit.classList.add('hidden')
    divSave.classList.remove('hidden')
}

//limpa as inputs do formulario
function limpaform(){
    titleModal.textContent = "new challenge";

    formularioChallenge.reset()
    divDelete.classList.add('hidden')
    divEdit.classList.add('hidden')
    divSave.classList.remove('hidden')
}