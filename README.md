Sistema de gerenciamento de pontos de iluminação pública
Tecnologias utilizadas:
•	Node.js + Express + Sequelize (Backend)
•	PostgreSQL (Banco de dados)
•	React + TypeScript + Bootstrap + Leaflet (Frontend)
•	Insomnia (para testes de API)
________________________________________
Estrutura do projeto
/backend-iluminacao - API REST em Node.js
/frontend-iluminacao - Interface com mapa e tabela
________________________________________
Configurar o backend
Precisa ter:
•	Node.js instalado
•	PostgreSQL instalado e rodando localmente
Passo a passo:
Acesse a pasta do backend
- cd backend-iluminacao

Instale as dependências
- npm install

Crie um arquivo .env com suas configurações:.env 

Exemplo:

DB_HOST=localhost
DB_PORT=5432
DB_NAME=iluminacao
DB_USER=seu_usuario
DB_PASS=sua_senha
PORT=5000

Inicie o servidor backend:
- npx ts-node src/server.ts
________________________________________
Configurar o frontend
- Acesse a pasta do frontend
cd ../frontend-iluminacao

Instale as dependências
-	npm install
Execute o frontend:
-	npm start
________________________________________
Acessar o sistema
•	Acesse: http://localhost:3000
•	Login fixo:
o	Usuário: admin
o	Senha: 123456
________________________________________
Teste da API 
Utilizei o Insomnia, métodos:
•	GET /pontos → lista todos os pontos
•	POST /pontos → cadastra um ponto
•	PUT /pontos/:id → edita um ponto
•	DELETE /pontos/:id → exclui um ponto
________________________________________
Funcionalidades implementadas
•	 Cadastro de pontos de iluminação
•	 Edição e exclusão de pontos
•	 Mapa interativo com marcadores (Leaflet)
•	 Filtros por todas as colunas na tabela
•	 Filtro por área desenhada no mapa (Leaflet Draw)
•	 Autenticação simples com login fixo
•	 Interface responsiva com Bootstrap

