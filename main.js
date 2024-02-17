const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
const tarefasCompleted = JSON.parse(localStorage.getItem('tarefasCompleted')) || [];

$('document').ready(() => {

    $('form').on('submit', (e) => {
        e.preventDefault();
        addNewTarefa(generateId(), $('textarea').val());
        reload();
        reset();
    })

    $('.addTarefa').click(() => {
        $('.form').slideDown().css('display', 'flex');
    })

    $('#btn-cancel').click(() => {
        $('.form').slideUp();
    })

    $('#btnDelet').click(() => {

    })

    function addNewTarefa(id, desc) {
        tarefa = {
            id: id,
            desc: desc
        }

        tarefas.push(tarefa)
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    function card(tarefa) {
        // const ul = document.getElementsByTagName('ul')[0];
        const li = document.createElement('li');
        const divTarefa = document.createElement('div');

        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', `${tarefa.id}`);
        input.addEventListener('click', () => {
            tarefaCheck(tarefa);
        })

        const label = document.createElement('label');
        label.setAttribute('for', `${tarefa.id}`);
        label.innerHTML = `<i class="fa-solid fa-check"></i>`;

        const p = document.createElement('p');
        p.innerText = `${tarefa.desc}`

        divTarefa.appendChild(input);
        divTarefa.appendChild(label);
        divTarefa.appendChild(p);
        li.appendChild(divTarefa);

        const divButtons = document.createElement('div');

        const btnDelet = document.createElement('button');
        btnDelet.setAttribute('class', 'btnDelet');
        btnDelet.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
        btnDelet.addEventListener('click', () => {
            deletTarefa(tarefa.id);
        })

        const btnEdit = document.createElement('button');
        btnEdit.setAttribute('class', 'btnEdit');
        btnEdit.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        btnEdit.addEventListener('click', () => {
            editTarefa(li, tarefa);
            $('textarea').trigger('focus');
            disableButtons();
            disabledTarefa();
            li.setAttribute('class', 'editActive');
        })

        divButtons.appendChild(btnEdit);
        divButtons.appendChild(btnDelet);
        li.appendChild(divButtons);
        // ul.appendChild(li);
        return li;
    }

    function cardCompleted(tarefa) {
        const li = document.createElement('li');
        const divTarefa = document.createElement('div');

        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', `${tarefa.id}`);
        input.setAttribute('checked', '');
        input.addEventListener('click', () => {
            tarefaCheck(tarefa);
        })

        const label = document.createElement('label');
        label.setAttribute('for', `${tarefa.id}`);
        label.innerHTML = `<i class="fa-solid fa-check"></i>`;

        const p = document.createElement('p');
        p.innerText = `${tarefa.desc}`

        divTarefa.appendChild(input);
        divTarefa.appendChild(label);
        divTarefa.appendChild(p);
        li.appendChild(divTarefa);

        const divButtons = document.createElement('div');

        const btnDelet = document.createElement('button');
        btnDelet.setAttribute('class', 'btnDelet');
        btnDelet.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
        btnDelet.addEventListener('click', () => {
            deletTarefaCompleted(tarefa.id);
        })

        divButtons.appendChild(btnDelet);
        li.appendChild(divButtons);
        return li;
    }

    function tarefaCheck(tarefa) {
        const tarefaChecked = tarefasCompleted.indexOf(tarefa);

        if (tarefaChecked == -1) {
            tarefasCompleted.push(tarefa);
            localStorage.setItem('tarefasCompleted', JSON.stringify(tarefasCompleted));
            deletTarefa(tarefa.id);
        } else {
            tarefas.push(tarefa);
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            deletTarefaCompleted(tarefa.id);
        }
    }

    function editTarefa(li, tarefa) {
        li.innerHTML = `
            <div>
                <input type="checkbox" id="${tarefa.id}">
                <label for="${tarefa.id}"><i class="fa-solid fa-check"></i></label>
                <textarea rows="1">${tarefa.desc}</textarea>
            </div>
        `;

        const div = document.createElement('div');

        const btnCancel = document.createElement('button');
        btnCancel.innerHTML = `<i class="fa-solid fa-ban"></i>`;
        btnCancel.addEventListener('click', () => {
            reload();
        })

        const btnConfirm = document.createElement('button');
        btnConfirm.innerHTML = `<i class="fa-solid fa-check"></i>`;
        btnConfirm.addEventListener('click', () => {
            const textarea = li.getElementsByTagName('textarea')[0];
            if (textarea.value != '') {
                tarefa.desc = textarea.value;
                localStorage.setItem('tarefas', JSON.stringify(tarefas));
                reload();
            }
        })

        div.appendChild(btnConfirm);
        div.appendChild(btnCancel);
        li.appendChild(div);
    }

    function deletTarefa(id) {
        const tarefa = tarefas.filter(tarefa => tarefa.id == id)[0];
        tarefas.splice(tarefas.indexOf(tarefa), 1);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        reload();
    }

    function deletTarefaCompleted(id) {
        const tarefa = tarefasCompleted.filter(tarefa => tarefa.id == id)[0];
        tarefasCompleted.splice(tarefasCompleted.indexOf(tarefa), 1);
        localStorage.setItem('tarefasCompleted', JSON.stringify(tarefasCompleted));
        reload();
    }

    function disableButtons() {
        const btnEdits = document.getElementsByClassName('btnEdit');
        for (let i = 0; i < btnEdits.length; i++) {
            if (btnEdits[i].disabled == '') {
                btnEdits[i].disabled = 'true';
            } else {
                btnEdits[i].removeAttribute('disabled');
            }
        }
        const btnDelets = document.getElementsByClassName('btnDelet');
        for (let i = 0; i < btnDelets.length; i++) {
            if (btnDelets[i].disabled == '') {
                btnDelets[i].disabled = 'true';
            } else {
                btnDelets[i].removeAttribute('disabled');
            }
        }
    }

    function disabledTarefa() {
        const ul = document.getElementsByTagName('ul')[0];

        for (let i = 0; i < ul.children.length; i++) {
            ul.children[i].setAttribute('class', 'disabled');
        }
    }

    reload();
    function reload() {
        const ulTarefas = document.getElementsByTagName('ul')[0];
        const ulCompleted = document.getElementsByTagName('ul')[1];

        if (ulTarefas.children.length > 0) {
            ulTarefas.innerHTML = '';
        }

        if (ulCompleted.children.length > 0) {
            ulCompleted.innerHTML = '';
            $('.container-concluidas').css('display', 'none');
        }

        tarefas.forEach(tarefa => {
            ulTarefas.appendChild(card(tarefa));
        });

        tarefasCompleted.forEach(tarefa => {
            ulCompleted.appendChild(cardCompleted(tarefa));
        });

        if (ulCompleted.children.length >= 1) {
            $('.container-concluidas').css('display', 'flex');
        }

        if (ulTarefas.children.length == 0) {
            const p = document.createElement('p');
            p.setAttribute('class', 'notfoundtext')
            p.innerHTML = `<i class="fa-solid fa-file-circle-exclamation"></i> Não há tarefas para fazer.`;
            ulTarefas.appendChild(p);
        }
    }

    function generateId() {
        let randomId = parseInt(Math.random() * 100);
        let idTarefas = tarefas.filter(tarefa => tarefa.id == randomId);
        let idTarefasCompleted = tarefasCompleted.filter(tarefa => tarefa.id == randomId);

        while (idTarefas.length > 0 || idTarefasCompleted.length > 0) {
            randomId = parseInt(Math.random() * 100);
            idTarefas = tarefas.filter(tarefa => tarefa.id == randomId);
            idTarefasCompleted = tarefasCompleted.filter(tarefa => tarefa.id == randomId);
        }

        return randomId;
    }

    function reset() {
        $('textarea').val('');
    }
})