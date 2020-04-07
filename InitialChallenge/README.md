# Criptografia de Júlio César

Este é o desafio de admissão. Consiste em consumir uma API da Codenation requisitando dados do desafio e enviar a resposta.

## Tópicos

Neste desafio você aprenderá:

- Manipular Strings
- Maniupular JSON
- Interagir com API REST

## Requisitos

Para asegurar que o script funcione corretamente, execute o seguinte comando para instalar as dependências do projeto:

```shell
npm install
```

## Detalhes

O contexto do desafio gira em torno de decifrar uma string criptografada com a [Cifra de Júlio César](https://pt.wikipedia.org/wiki/Cifra_de_C%C3%A9sar). Para ter acesso a essa string é necessãrio fazer uma requisição HTTP a seguinte rota:

```
https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=SEU_TOKEN
```

Para conseguir seu token acesse sua conta na [Codenation](https://codenation.dev/) e verifique seu perfil. O token estará lá.

Feita a requisição, a resposta será um JSON no seguinte formato:

```JSON
{ 
    "numero_casas": 10, 
    "token":"token_do_usuario", 
    "cifrado": "texto criptografado", 
    "decifrado": "aqui vai o texto decifrado", 
    "resumo_criptografico": "aqui vai o resumo" 
}
```

O código deve preencher esse JSON com as informações que faltam (o 'decifrado' e 'resumo_criptografico') e enviar de volta para API pela seguinte rota:

```
https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=SEU_TOKEN
```

A API, caso a resposta esteja correta, retornará um JSON informando sua pontuação. Caso contrário, o JSON conterá um log do erro.

### Observações

O 'resumo_criptografico' é o 'decifrado' após passar por uma função de [sha1](https://pt.wikipedia.org/wiki/SHA-1). O pacote para essa criptografia pode ser qualquer um. Nesse projeto utilizei o [js-sha1](https://www.npmjs.com/package/js-sha1).

A API espera um arquivo sendo enviado como multipart/form-data, como se fosse enviado por um formulário HTML, com um campo do tipo file com o nome answer.

## Executando o código

Para usar essa solução é necessário colocar na raiz desse projeto um arquivo <i>key.json</i> que conterá seu token da codenation na seguinte estrutura:

```JSON
{
    "token": "SEU_TOKEN"
}
```

Tendo isso em mente, execute:

```shell
npm start
```

Será gerado pelo programa um arquivo chamado <i>answer.json</i> que conterá a resposta submetida à API.