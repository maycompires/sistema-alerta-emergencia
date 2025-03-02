-- Criar o banco de dados
CREATE DATABASE alertadb;

-- Conectar ao banco de dados
\c alertadb;

-- Criar o usuário
CREATE USER alertauser WITH PASSWORD 'sua-senha-segura';

-- Conceder privilégios
GRANT ALL PRIVILEGES ON DATABASE alertadb TO alertauser; 