Descrição:
 Esse código foi feito pensando em resolver o  Desafio de Seleção – Sistema de Gestão de Alunos. Utilizei Html, Css e JavaScript, todos vanilla,
 afim de criar uma página que fizesse a leitura dos dados fornecidos como tabela, com filtros para facilitar a leitura dos dados.

Objetivo:
 - Carregar dados de alunos a partir de um arquivo JSON.
 - Exibir todos os alunos em uma tabela.
 - Transformar campos com null em 0.

Filtros por:
 - Nome (primeiro e/ou último)
 - Média das notas
 - Quantidade de faltas

Presets necessários:
 - Mostrar apenas aprovados (média ≥ 7.0 e faltas < 7)
 (Separei em dois para melhorar a específicação dos filtros)
 - Mostrar apenas reprovados por média
 - Mostrar apenas reprovados por faltas
 - (Fiz adicionais, como: botão para limpar os filtros e botão para filtrar alunos reprovados por nota e faltas, assim, especificando cada vez mais os filtros)


Interface:
 HTML, CSS e JavaScript (vanillas).

Estrutura do código:

├── index.html
├── src/
│   ├── css/
│   │   └── style.css
│   ├── javaScript/
│   │   └── app.js
│   └── json/
│       └── alunos.json
└── README.md



Passo a Passo de como executar:


- Abrir o Git Bash e executar:
   - git clone  https://github.com/GiuliaDSCardoso/AnaliseDeDadosEscolares.git
   - cd AnaliseDeDadosEscolares
- Em seguida:
   - Abrir a pasta no VsCode
   - Agora basta clicar com o botão direito no arquivo index.html e abrir com a extensão Live Server (opção: open with Live Server)



O arquivo alunos.json foi salvo localmente a partir dos dados do link fornecido no desafio, e fiz o uso do Live Server para que o fetch funcionasse



Link Github Pages:
https://giuliadscardoso.github.io/AnaliseDeDadosEscolares/

Autoria
Giulia dos Santos Cardoso
Email: giuliacardosodev@gmail.com
Whatsapp: (75) 98190-4784
GitHub: https://github.com/GiuliaDSCardoso

