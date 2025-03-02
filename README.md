# Sistema de Alerta de Emergência

Um sistema web para gerenciamento de alertas de emergência, permitindo que cidadãos, autoridades e serviços de emergência possam reportar e responder a incidentes.

## Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Prisma
- PostgreSQL
- NextAuth.js
- TailwindCSS

## Funcionalidades

- Autenticação de usuários
- Diferentes níveis de acesso (Admin, Autoridade, Serviço de Emergência, Cidadão)
- Criação e gerenciamento de alertas
- Filtragem de alertas por tipo e status
- Sistema de resposta a alertas
- Interface responsiva

## Pré-requisitos

- Node.js 18+
- PostgreSQL
- NPM ou Yarn

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd servico-de-alerta
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/alertadb"
NEXTAUTH_SECRET="seu_segredo_aqui"
NEXTAUTH_URL="http://localhost:3000"
```

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

O aplicativo estará disponível em `http://localhost:3000`

## Estrutura do Projeto

```
src/
  ├── app/              # Rotas e páginas
  ├── components/       # Componentes React
  ├── lib/             # Utilitários e configurações
  ├── types/           # Definições de tipos TypeScript
  └── prisma/          # Schema e migrações do banco de dados
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
