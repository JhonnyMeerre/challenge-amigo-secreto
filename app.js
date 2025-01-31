// Array para armazenar os nomes dos amigos
let amigos = [];

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nomeAmigo = inputAmigo.value.trim();

    // Verificar se o campo está vazio
    if (nomeAmigo === '') {
        alert('Por favor, digite um nome.');
        return;
    }

    // Verificar se o nome já foi adicionado
    if (amigos.includes(nomeAmigo)) {
        alert('Este nome já foi adicionado!');
        return;
    }

    // Adiciona o nome ao array e atualiza a lista na tela
    amigos.push(nomeAmigo);
    atualizarListaAmigos();

    // Limpa o campo de input
    inputAmigo.value = '';
}

// Função para atualizar a lista de amigos na tela
function atualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ''; // Limpa a lista atual

    // Adicionar cada amigo como um item da lista
    amigos.forEach(amigo => {
        const itemLista = document.createElement('li');
        itemLista.textContent = amigo;
        listaAmigos.appendChild(itemLista);
    });
}

// Função para embaralhar um array (Fisher-Yates shuffle)
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para sortear os amigos secretos
function sortearAmigo() {
    // Verifica se há pelo menos 2 amigos na lista
    if (amigos.length < 2) {
        alert('Adicione pelo menos 2 amigos para sortear!');
        return;
    }

    let sorteioValido = false;
    let amigosEmbaralhados;

    // Repete o sorteio até que ninguém tire a si mesmo
    while (!sorteioValido) {
        amigosEmbaralhados = embaralhar([...amigos]); // Cria uma cópia embaralhada da lista
        sorteioValido = true;

        // Verifica se alguém tirou a si mesmo
        for (let i = 0; i < amigos.length; i++) {
            if (amigos[i] === amigosEmbaralhados[i]) {
                sorteioValido = false;
                break;
            }
        }
    }

    // Cria os pares de amigos secretos
    const resultadoSorteio = amigos.map((amigo, index) => {
        const amigoSecreto = amigosEmbaralhados[index];
        return `${amigo} tirou ${amigoSecreto}`;
    });

    // Exibe o resultado na tela
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = ''; // Limpa o resultado anterior

    resultadoSorteio.forEach(resultado => {
        const itemResultado = document.createElement('li');
        itemResultado.textContent = resultado;
        resultadoElement.appendChild(itemResultado);
    });
}