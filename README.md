
# Ciclo do Bem API ( NestJS Hexagonal Architecture )

<p align="center">
  <img src="./assets/environmentalists-recycling-world-environment-day.jpg" alt="Reciclagem" width="500" />
</p>


## Descrição
A [Ciclo do Bem](https://ciclodobem-production.up.railway.app/) API foi desenvolvida para conectar usuários doadores de recicláveis e catadores para fins de coleta porta-a-porta, contribuindo assim ao aumento da quantidade de recicláveis coletados, redução do impacto ambiental pelo descarte incorreto destes, além do crescimento e fortalecimento da renda dos catadores cadastrados.

## Tecnologias
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Funcionalidades

- `Cadastro de usuários`: cadastro de usuáros interessados em doar recicláveis;
- `Coleta de coordenadas`: integração com API externa para coleta de coordenadas em graus decimais a partir do CEP informado pelo usuário;
- `Cadastro de catadores`: cadastro de catadores interessados em realizar coleta dos recicláveis porta-a-porta dos usuários cadastrados;
- `Agendamento de Coleta para usuário`: usuário registra dia da semana e turno de interesse para coleta;
- `Agendamento de Coleta para catador`: catador registra  por turno, bairro e dia da semana de interesse para realização da coleta;
- `Criação de rotas para coleta`:  *listagem diária automática* dos agendamentos de usuários para o corrente dia, por bairro;
- `Indicação de conclusão da coleta`: funcionalidade de indicação de conclusão da coleta por domicílio.

## Implementações Futuras

- `Criação de rotas considerando caminho mínimo`: otimindicação de percurso otimizado para coleta considerando implementação de algoritmo de caminhos mínimos, como Dijkstra;
- `Automação de notificações`: envio automático de notificação aos usuários quando do cadastramento de um agendamento de um catador para coleta em uma área antes não atendida e com usuários interessados;
- `Cadastro de Empresas/Instituições`: Permitir o cadastro de empresas e a associação destas aos catadores cadastrados. 

## Running the App

Você pode utilizar e testar a aplicação diretamente pelo `Swagger`, no [link](https://ciclodobem-production.up.railway.app/api/). 
Mas se preferir, siga os passos a seguir para executar a aplicação localmente.

```bash
# clone o repositório
$ git clone https://github.com/ewelyn-samaris/ciclo_do_bem.git

# entre na pasta
$ cd ciclo_do_bem

# instale as dependências
$ npm install

# crie uma url de conexão com o banco de dados PostgreSQL no formato abaixo 
# a armazene em um arquivo .env na raíz de seu projeto, com o nome DATABASE_URL
postgresql://<user>:<password>@<host>:<port>/<database>

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Teste

```bash
# unit tests
$ npm run test
```

## Contato

- Author - [Ewelyn Sâmaris](https://www.linkedin.com/in/ewelynsamaris/)

