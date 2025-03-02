#!/bin/bash

# Gerar o cliente Prisma
echo "Gerando cliente Prisma..."
npx prisma generate

# Executar as migrações
echo "Executando migrações..."
npx prisma migrate dev

# Verificar se as migrações foram bem-sucedidas
if [ $? -eq 0 ]; then
    echo "Banco de dados configurado com sucesso!"
else
    echo "Erro ao configurar o banco de dados"
    exit 1
fi 