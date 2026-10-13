# Refund

Refund é uma aplicação web simples para montar uma lista de despesas e visualizar o valor total de uma solicitação de reembolso. A interface está em português e apresenta valores no padrão brasileiro (R$).

Este projeto tem foco em aprendizado e estudos, servindo como prática de desenvolvimento web com HTML, CSS e JavaScript.

## Funcionalidades

- Informar o nome, a categoria e o valor de uma despesa.
- Formatar o valor digitado como moeda brasileira.
- Adicionar despesas à lista com o ícone correspondente à categoria.
- Remover despesas da lista.
- Atualizar automaticamente a quantidade de despesas e o valor total.
- Limpar o formulário após adicionar uma despesa.

## Como executar

Não é necessário instalar dependências nem iniciar um servidor. Abra o arquivo `index.html` em um navegador.

## Como usar

1. Informe o nome da despesa.
2. Selecione uma categoria: alimentação, hospedagem, serviços, transporte ou outros.
3. Digite o valor da despesa.
4. Clique em **Adicionar despesa**.
5. Para excluir uma despesa, clique no ícone de remoção ao lado dela.

O total e a quantidade de despesas são recalculados sempre que um item é adicionado ou removido.

## Tecnologias

- HTML
- CSS
- JavaScript

## Estrutura do projeto

- `index.html`: estrutura da página e formulário.
- `styles.css`: estilos e layout responsivo.
- `script.js`: formatação de valores e comportamento da lista de despesas.
- `img/`: logotipo, ícones e imagens das categorias.

## Observação

As despesas existem apenas na página atual. Elas não são enviadas para um servidor nem salvas no navegador; ao atualizar ou fechar a página, a lista é perdida.
