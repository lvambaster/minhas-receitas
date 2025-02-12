"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from '../page.module.css'; 
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Definição da interface para Usuário
interface User {
  id: number;
  name: string;
  age: number;
}

//Definição da interface para adiçao de receitas e despesas
interface Transaction {
  id: number;
  description: string;
  value: number;
  type: "despesa" | "receita";
  personId: number;
}

//Definição da interface para os totais
interface Totals {
  totalReceitas: number;
  totalDespesas: number;
  saldoGeral: number;
}

export default function Consultar() {
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totais, setTotais] = useState<Totals>({ totalReceitas: 0, totalDespesas: 0, saldoGeral: 0 });

  // Função para calcular receitas, despesas e saldo
  const calcularTotais = (usuarios: User[], transacoes: Transaction[]): Totals => {
    let totalReceitas = 0;
    let totalDespesas = 0;

    usuarios.forEach(usuario => {
      const receitasUsuario = transacoes
        .filter(transacao => transacao.personId === usuario.id && transacao.type === "receita")
        .reduce((acc, transacao) => acc + transacao.value, 0);

      const despesasUsuario = transacoes
        .filter(transacao => transacao.personId === usuario.id && transacao.type === "despesa")
        .reduce((acc, transacao) => acc + transacao.value, 0);

      totalReceitas += receitasUsuario;
      totalDespesas += despesasUsuario;
    });

    return {
      totalReceitas,
      totalDespesas,
      saldoGeral: totalReceitas - totalDespesas,
    };
  };

  // Carregando dados do localStorage ao montar o componente
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    const savedTransactions = localStorage.getItem("transactions");

    const parsedUsers: User[] = savedUsers ? JSON.parse(savedUsers) : [];
    const parsedTransactions: Transaction[] = savedTransactions ? JSON.parse(savedTransactions) : [];

    setUsers(parsedUsers);
    setTransactions(parsedTransactions);
    setTotais(calcularTotais(parsedUsers, parsedTransactions));
  }, []);

  // Dados do gráfico
  const chartData = {
    labels: users.map(user => user.name),
    datasets: [
      {
        label: "Receitas",
        data: users.map(user => transactions
          .filter(transacao => transacao.personId === user.id && transacao.type === "receita")
          .reduce((acc, transacao) => acc + transacao.value, 0)
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: "Despesas",
        data: users.map(user => transactions
          .filter(transacao => transacao.personId === user.id && transacao.type === "despesa")
          .reduce((acc, transacao) => acc + transacao.value, 0)
        ),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>Consultas de Receitas e Despesas</h1>
      
      <div className={styles.chartContainer}>
        <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Nome</th>
            <th className={styles.tableHeader}>Receita</th>
            <th className={styles.tableHeader}>Despesa</th>
            <th className={styles.tableHeader}>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            const receitas = transactions
              .filter(transacao => transacao.personId === user.id && transacao.type === "receita")
              .reduce((acc, transacao) => acc + transacao.value, 0);

            const despesas = transactions
              .filter(transacao => transacao.personId === user.id && transacao.type === "despesa")
              .reduce((acc, transacao) => acc + transacao.value, 0);

            return (
              <tr key={user.id} className={styles.tableRow}>
                <td className={styles.tableData}>{user.name}</td>
                <td className={styles.tableData}>{receitas.toFixed(2)}</td>
                <td className={styles.tableData}>{despesas.toFixed(2)}</td>
                <td className={styles.tableData}>{(receitas - despesas).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2 className={styles.subTitle}>Total Geral</h2>
      <p className={styles.totalText}>Total de Receitas: {totais.totalReceitas.toFixed(2)}</p>
      <p className={styles.totalText}>Total de Despesas: {totais.totalDespesas.toFixed(2)}</p>
      <p className={styles.totalText}>Saldo Líquido: {totais.saldoGeral.toFixed(2)}</p>

      <div className={styles.navigationButtons}>
        <Link href="/">
          <button className={styles.navButton}>Cadastrar Usuário</button>
        </Link>
        <Link href="/lancador">
          <button className={styles.navButton}>Cadastrar Receitas/Despesas</button>
        </Link>
      </div>
    </main>
  );
}
