# 📊 Projeto de Teste Prático - Consulta de Finanças  

Este projeto foi desenvolvido para facilitar o gerenciamento de receitas e despesas de diferentes usuários. Ele permite cadastrar transações financeiras e exibir um resumo visual através de tabelas e gráficos dinâmicos.  

## 🚀 Tecnologias Utilizadas  

- **Next.js**: Framework React para desenvolvimento web.  
- **Chart.js**: Biblioteca para visualização de gráficos.  
- **LocalStorage**: Armazena os dados localmente no navegador.  
- **CSS Modules**: Estilização personalizada do projeto.  

---

## 🛠️ Passo a Passo de Funcionamento  

### 1️⃣ **Cadastro de Usuários**  
- Acesse a tela principal.  
- Insira o **nome** e a **idade** para e clique em **"Cadastrar Usuário"**.  
- Os dados são salvos automaticamente no **LocalStorage** do navegador.  

### 2️⃣ **Lançamento de Receitas e Despesas**  
- Clique em **"Cadastrar Receitas/Despesas"**.  
- Insira a **descrição**, o **valor** e selecione se é uma **receita** ou **despesa** e escolha o **usuário** e clicque em **"Cadastrar Transação"** .  
- A transação será salva localmente e vinculada ao usuário selecionado.  

### 3️⃣ **Consulta de Finanças**  
- Acesse a tela **"Consultar Finanças"**.  
- O sistema exibe:  
  - Um **gráfico de barras interativo** com o total de receitas e despesas de cada usuário.  
  - Uma **tabela detalhada**, mostrando os valores individuais e o saldo de cada usuário.  
  - O **total geral** de todas as receitas, despesas e o saldo líquido.  

### 4️⃣ **Gráfico Interativo**  
- O gráfico é gerado automaticamente usando a biblioteca **Chart.js**.  
- Ele exibe a relação entre **receitas e despesas** de cada usuário.  
- A atualização ocorre sempre que um novo lançamento é feito.  

### 5️⃣ **Armazenamento de Dados**  
- Todos os dados (usuários e transações) são armazenados no **LocalStorage**.  
- Isso garante que as informações não sejam perdidas ao recarregar a página.  

  
🎨 Melhorias Visuais
✔️ Interface moderna e responsiva.
✔️ Uso de CSS Modules para melhor organização do código.
✔️ Layout intuitivo com botões de navegação entre páginas.

📄 Licença
Este projeto é de uso livre para fins de aprendizado e desenvolvimento.

