import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';
import { faker } from '@faker-js/faker';

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer
    },
    models: {
      user: Model.extend<Partial<User>>({})
    },
    factories: {
      //gerar dados em massa pelo mirage
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
          //o name de factory aceita um index como parametro;
        },
        email() {
          return faker.internet.email().toLocaleLowerCase();
          //utilizando o faker para criar email fake em lowerCase;
        },
        createdAt() {
          return faker.date.recent(10, new Date());
          /**
           * utilizando o faker para criar uma data para o usuarios
          que seja 10 dias recentes a partir da data de hoje;
           */
        }
      })
    },
    seeds(server) {
      server.createList('user', 100);
      //utilizando o seeds para criar 100 usuarios baseado no user do factory;
    },

    routes() {
      this.namespace == 'api';
      //passando o namespace da rota 'https://localhost:3000/api/';
      this.timing = 750;
      //toda chamada utilizada do mirage com delay de 750ms para validar spinner loading e outros;

      this.get('/users', function (schema, request) {
        //utilizando shorthands do miragejs para ler arquivos do banco de dados
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart - Number(per_page);

        const users = this.serialize(schema.all('user')).slice(pageStart, pageEnd);

        return new Response(200, { 'x-total-count': String(total) }, { users });
      });
      this.get('/users/:id');

      this.post('/users');
      //utilizando shorthands do miragejs para inserir arquivos no banco de dados

      this.namespace = '';
      /**
      definindo o namespace como '' para quando terminar de utiliza-las para nao 
      prejudicar as rotas do next;
      */
      this.passthrough();
      //todas chamadas que sejam enviadas por chamada api nao seja executada ele passa para as proximas;
    }
  });
  return server;
}
