# mapa-de-calor
## Esse é o repositório do mapa de calor, feito com o objetivo de ajudar os alunos da Pós graduação de gestão e liderança da SPTECH 2022/02 a enriquecer o seu trabalho.
### A pagina index.html tem 2 funções:
#### 1- Receber um arquivo csv separado por virgulas sendo a 1ª coluna a latitude em graus e a 2º a longetude em graus (ver arquivo de exemplo na pasta csv)
#### 2- Receber um arquivo sendo a 1º coluna o endereço completo no seguinte formato:
####  `Nome da Rua`, `numero`, `cep`-`Bairro`, `cidade` - `Sigla do estado`
> Ex: AV NORDESTINA, 3010-PARQUE VITORIA, São Paulo - SP
##### Nesta função o sistema chama a api do google maps e gera um arquivo csv com as informações trazidas como latitude, longetude, endereço completo, etc
***Obs: o arquivo gerado pode ser reimportado na função 1, EVITANDO CUSTOS ADICIONAIS!!***
##### **IMPORTANTE: o uso dessa api é paga, mas é possivel criar uma conta com 90 dias gratuitos no google maps**
> Ver como aqui nesse link: https://developers.google.com/maps/premium/apikey/maps-javascript-apikey?hl=pt-br#:~:text=Acesse%20a%20p%C3%A1gina%20Plataforma%20Google%20Maps%20%3E%20Credenciais.&text=Na%20p%C3%A1gina%20Credenciais%2C%20clique%20em,exibir%C3%A1%20sua%20chave%20rec%C3%A9m%2Dcriada.

# Para o sistema funcionar:
Antes de começar insira a sua chave da api do google-maps aonde está escrito `$INSIRA A SUA CHAVE DE API AQUI$`" dentro do codigo fonte do arquivo index.html
