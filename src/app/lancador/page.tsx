"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from '../page.module.css';

// Definição da interface para Usuário
interface User {
  id: number;
  name: string;
  age: number;
}

// Definição da interface para adiçao de receitas e despesas
interface Transaction {
  id: number;
  description: string;
  value: number;
  type: "despesa" | "receita";
  personId: number;
}

export default function Lancador() {
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [type, setType] = useState<"despesa" | "receita">("despesa");
  const [personId, setPersonId] = useState("");
  const [nextId, setNextId] = useState(1);

  // Função que carrega os dados do LocalStorage ao iniciar a página
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    const savedTransactions = localStorage.getItem("transactions");

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }

    if (savedTransactions) {
      const parsedTransactions = JSON.parse(savedTransactions);
      setTransactions(parsedTransactions);

      if (parsedTransactions.length > 0) {
        setNextId(
          Math.max(...parsedTransactions.map((transaction: Transaction) => transaction.id)) + 1
        );
      }
    }
  }, []);

  // Salvar transações no LocalStorage
  const saveTransactionsToLocalStorage = (transactions: Transaction[]) => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  };

  // Função para formatar valores para reais
  const formatCurrency = (value: string) => {
    const cleanValue = value.replace(/[^\d,]/g, "").replace(",", ".");
    return parseFloat(cleanValue);
  };

  // Adicionar uma nova receita e despesas
  const addTransaction = (e: React.FormEvent) => {
    e.preventDefault();

    const user = users.find((user) => user.id === parseInt(personId));
    if (!user) {
      alert("Usuário não encontrado.");
      return;
    }

    if (user.age < 18 && type !== "despesa") {
      alert("Menores de idade podem apenas lançar despesas.");
      return;
    }

    const transactionValue = formatCurrency(value);
    if (transactionValue <= 0 || isNaN(transactionValue)) {
      alert("O valor da transação deve ser maior que zero e válido.");
      return;
    }

    const newTransaction: Transaction = {
      id: nextId,
      description,
      value: transactionValue,
      type,
      personId: parseInt(personId),
    };

    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    setNextId(nextId + 1);
    setDescription("");
    setValue("");
    setType("despesa");
    setPersonId("");
    saveTransactionsToLocalStorage(updatedTransactions);
  };

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>Lançar Receitas e Despesas</h1>

      <form onSubmit={addTransaction} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Descrição</label>
          <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="value" className={styles.label}>Valor (R$)</label>
          <input id="value" type="text" value={value} onChange={(e) => setValue(e.target.value)} required className={styles.input} placeholder="Ex: 100,50" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="type" className={styles.label}>Tipo</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value as "despesa" | "receita")} required className={styles.input}>
            <option value="despesa">Despesa</option>
            <option value="receita">Receita</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="personId" className={styles.label}>Pessoa (ID)</label>
          <input id="personId" type="text" value={personId} onChange={(e) => setPersonId(e.target.value)} required className={styles.input} placeholder="Digite o ID da pessoa" />
        </div>
        <button type="submit" className={styles.buttonUser}>Cadastrar Transação</button>
      </form>

      <h2 className={styles.subTitle}>Lista de Transações</h2>
      <ul className={styles.transactionList}>
        {transactions.length === 0 ? (
          <p className={styles.noTransactions}>Nenhuma transação cadastrada.</p>
        ) : (
          transactions.map((transaction: Transaction) => (
            <li key={transaction.id} className={styles.transactionItem}>
              {transaction.description} - R$ {transaction.value.toFixed(2)} ({transaction.type})
              <br />
              Pessoa: {users.find((user) => user.id === transaction.personId)?.name}
            </li>
          ))
        )}
      </ul>

      <div className={styles.navigationButtons}>
        <Link href="/"><button className={styles.navButton}>Cadastrar Usuário</button></Link>
        <Link href="/consultar"><button className={styles.navButton}>Consultar Receitas/Despesas</button></Link>
      </div>
    </main>
  );
}
