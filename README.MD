# Projeto de Tabela de Prestadores de Serviço

Este projeto é um trabalho para a faculdade que consiste em uma tabela de prestadores de serviço. A tabela é gerada dinamicamente e os dados são armazenados no `localStorage`.

## Funcionalidades

- A tabela é gerada dinamicamente com base nos dados armazenados no `localStorage`.
- Os usuários podem adicionar, editar e remover entradas na tabela.
- A tabela usa Shadow DOM para encapsular o estilo e o comportamento, evitando conflitos com o restante do documento.

## Correções e Melhorias

- O código foi modificado para trabalhar com Shadow DOM. Agora, o `tbody` da tabela é acessado através do Shadow DOM do elemento personalizado.
- Foi adicionada uma verificação adicional na função `loadEntries` para evitar a adição de entradas `undefined` à tabela.

## Como usar

1. Abra o arquivo `index.html` em seu navegador.
2. Use os botões 'Editar', 'Deletar' e 'Compartilhar' para interagir com as entradas na tabela.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- Shadow DOM

Este projeto foi desenvolvido como parte de um trabalho para a faculdade.
