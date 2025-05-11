📝 #Task Manager — Frontend

Este é o frontend do projeto Task Manager, uma aplicação web para gerenciamento de tarefas com autenticação. Desenvolvido em React com estilização utilizando Tailwind CSS.

✅ Funcionalidades

-Cadastro de usuários (/register)

-Login com autenticação JWT (/login)

-Navbar com renderização condicional (Login / Logout)

-Roteamento protegido via PrivateRoute

-Dashboard com:

-Listagem de tarefas

-Criação de tarefas(Em desenvolvimento)

-Exclusão de tarefas

-Feedback de erros no login e dashboard

-Consumo de API RESTful desenvolvida em Node.js(Task Manager API)

🚀 Tecnologias utilizadas

  -React

  -React Router Dom

  -Axios

  -Tailwind CSS

  -Vite (ou Create React App, dependendo da base)

  -Heroicons

📂 Estrutura de pastas (simplificada)

```bash
src/
├── assets/           # Ícones personalizados
├── components/       # Componentes reutilizáveis (Navbar, etc)
├── pages/            # Páginas principais (Home, Login, Register, Dashboard)
├── routes/           # Rotas e componentes de proteção (PrivateRoute)
├── App.jsx
└── main.jsx
```

⚙️ Como rodar localmente

  1. Clone o repositório:
     
```bash
git clone https://github.com/seu-usuario/task-manager-frontend.git
cd task-manager-frontend
```
  2. Instale as dependências:

  ```bash
  npm install
  ```
  3. Rode a aplicação:

 ```bash
  npm run dev
  ```

  4. Acesse no navegador:

  ```bash
  http://localhost:5173
  ```

⚠️ Certifique-se de que a API backend está rodando em http://localhost:5000 (ou atualize os endpoints no código).

🔐 Ambiente

No momento, os tokens são armazenados via localStorage. Futuramente você pode considerar o uso de Context API ou Redux para gerenciamento global de estado e autenticação.

💡 Melhorias futuras

-Editar tarefas
-Marcar como concluída
-Filtro por status (pendente, concluída)
-Responsividade completa (mobile-first)
-Validações no formulário de login e registro

✍️ Autor

Felipe — Desenvolvedor frontend 💻
