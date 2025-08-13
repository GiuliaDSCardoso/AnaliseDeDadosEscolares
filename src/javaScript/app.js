
/* constante que recebe o endereço do arquivo JSON*/
const BASE_URL = "src/json/alunos.json";
/* constantes dos botões de filtro*/
const aprovadosBtn = document.getElementById('mostrar-aprovados');
const reprovadospornotaBtn = document.getElementById('mostrar-reprovados-por-nota');
const reprovadosporfaltaBtn = document.getElementById('mostrar-reprovados-por-faltas');
const reprovadosNotaEFaltasBtn = document.getElementById('mostrar-reprovados-por-nota-e-faltas');
const limparFiltrosBtn = document.getElementById('limpar-filtros');

/* váriavel que recebe o array de alunos*/
let todosAlunos = []; 

/* classe Dados*/
class Dados {
    constructor() {
        this.id = 1;
        this.arrayAlunos = [];
    }
    
    /* Função para a exibição da tabela*/
    listarTabela() {
    let tbody = document.getElementById('tabela-alunos');
    tbody.innerHTML = "";

    for (let aluno of this.arrayAlunos) {
        let tr = tbody.insertRow();

        let td_id = tr.insertCell();
        let td_primeiro_nome = tr.insertCell();
        let td_ultimo_nome = tr.insertCell();
        let td_nota_1 = tr.insertCell();
        let td_nota_2 = tr.insertCell();
        let td_nota_3 = tr.insertCell();
        let td_nota_4 = tr.insertCell();
        let td_faltas = tr.insertCell();
        let td_media = tr.insertCell();
        let td_status = tr.insertCell();

        td_id.innerHTML = aluno.id;
        td_primeiro_nome.innerHTML = aluno.primeiro_nome;
        td_ultimo_nome.innerHTML = aluno.ultimo_nome;
        /* Verificações para substituir null por 0*/
        td_nota_1.innerHTML = aluno.nota_1 ?? 0;
        td_nota_2.innerHTML = aluno.nota_2 ?? 0;
        td_nota_3.innerHTML = aluno.nota_3 ?? 0;
        td_nota_4.innerHTML = aluno.nota_4 ?? 0;
        td_faltas.innerHTML = aluno.faltas;
        let media = parseFloat(this.calcularMedia(aluno));
        td_media.innerHTML = media.toFixed(1);

        if (media >= 7 && aluno.faltas < 7) {
            td_status.innerHTML = 'Aprovado';
        } else if (media < 7 && aluno.faltas >= 7) {
            td_status.innerHTML = 'Reprovado por nota e faltas';
        } else if (media >=7 && aluno.faltas >= 7) {
            td_status.innerHTML = 'Reprovado por faltas';
        } else {
            td_status.innerHTML = 'Reprovado por nota insuficiente';
        }
    }
}
   /* Função para a aplicação dos filtros*/
    aplicarFiltros() {
        let nomeFiltro = document.getElementById('filtro-nome').value.toLowerCase();
        let mediaMinima = parseFloat(document.getElementById('filtro-media').value) || 0;
        let faltasMaximas = parseInt(document.getElementById('filtro-faltas').value) || Infinity;
        
        const filtrados = todosAlunos.filter(aluno => {
            let nomeCompleto = `${aluno.primeiro_nome} ${aluno.ultimo_nome}`.toLowerCase();

            let notas = [
                aluno.nota_1 ?? 0,
                aluno.nota_2 ?? 0,
                aluno.nota_3 ?? 0,
                aluno.nota_4 ?? 0
            ];

            let media = notas.reduce((soma, n) => soma + n, 0) / notas.length;

            return (
                nomeCompleto.includes(nomeFiltro) &&
                media >= mediaMinima &&
                aluno.faltas <= faltasMaximas
            );
        });

        this.arrayAlunos = filtrados;
        this.listarTabela(); 
    }

    /* Função para calcular a média*/
    calcularMedia(aluno) {
        let notas = [
            aluno.nota_1 ?? 0,
            aluno.nota_2 ?? 0,
            aluno.nota_3 ?? 0,
            aluno.nota_4 ?? 0
        ];
        let media = notas.reduce((soma, n) => soma + n, 0) / notas.length;
        return media.toFixed(1);
    }
}
/* objeto da classe Dados*/
const dados = new Dados();

/* Evento para limpar os filtros e retornar a lista original*/ 
limparFiltrosBtn.addEventListener('click', () => {
    /* Limpa os campos de filtro*/
    document.getElementById('filtro-nome').value = '';
    document.getElementById('filtro-media').value = '';
    document.getElementById('filtro-faltas').value = '';

    /* Restaura a lista completa*/
    dados.arrayAlunos = [...todosAlunos];
    dados.listarTabela();
});

/* Evento para carregar os dados automaticamente ao abrir o site */
document.addEventListener('DOMContentLoaded', async () => {
    const apiResponse = await fetch(BASE_URL);
    const parsedResponse = await apiResponse.json();
    
    todosAlunos = parsedResponse;
    dados.arrayAlunos = [...todosAlunos];
    dados.listarTabela(); 
});

/* Evento para mostrar aprovados*/
aprovadosBtn.addEventListener('click', () => {
    dados.arrayAlunos = todosAlunos.filter(aluno => {
        let media = parseFloat(dados.calcularMedia(aluno));
        return media >= 7 && aluno.faltas < 7;
    });
    dados.listarTabela();
    alert("Alunos aprovados por Nota e abaixo do limite de faltas");
});

/* Evento para mostrar reprovados por média*/
reprovadospornotaBtn.addEventListener('click', () => {
    dados.arrayAlunos = todosAlunos.filter(aluno => {
        let media = parseFloat(dados.calcularMedia(aluno));
        return media < 7 && aluno.faltas < 7;
    });
    dados.listarTabela();
    alert("Alunos reprovados por Nota mesmo estando abaixo do limite de faltas");
});

/*Evento para mostrar reprovados por faltas*/
reprovadosporfaltaBtn.addEventListener('click', () => {
    dados.arrayAlunos = todosAlunos.filter(aluno => {
        let media = parseFloat(dados.calcularMedia(aluno));
        return media >= 7 && aluno.faltas >= 7;
    });
    dados.listarTabela();
    alert("Alunos reprovados por falta mesmo passando por nota");
});

/* Evento para mostrar reprovados por nota e faltas */
reprovadosNotaEFaltasBtn.addEventListener('click', () => {
    dados.arrayAlunos = todosAlunos.filter(aluno => {
        let media = parseFloat(dados.calcularMedia(aluno));
        return media < 7 && aluno.faltas >= 7;
    });
    dados.listarTabela();
    alert("Alunos reprovados tanto por nota quanto por faltas");
});


/* Eventos dos filtros */
document.getElementById('filtro-nome').addEventListener('input', () => dados.aplicarFiltros());
document.getElementById('filtro-media').addEventListener('input', () => dados.aplicarFiltros());
document.getElementById('filtro-faltas').addEventListener('input', () => dados.aplicarFiltros());
