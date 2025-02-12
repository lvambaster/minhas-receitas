"use client";
import Link from "next/link";
import { useState, useEffect } from 'react';
import styles from './page.module.css';

// Definição da interface para Usuário
interface User {
  id: number;
  name: string;
  age: number;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [nextId, setNextId] = useState(1);

  // Carregar dados do LocalStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');

    if (savedUsers) {
      try {
        const usersParsed: User[] = JSON.parse(savedUsers);  
        setUsers(usersParsed);

        // Atualiza o ID do próximo usuário
        if (usersParsed.length > 0) {
          const maxId = Math.max(...usersParsed.map((user: User) => user.id));  
          setNextId(maxId + 1);
        }
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        setUsers([]);
      }
    } else {
      setUsers([]);
    }
  }, []);

  // Função para salvar os usuários
  const saveUsers = (users: User[]) => {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('Erro ao salvar no LocalStorage:', error);
    }
  };

  // Função para adicionar usuário
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !age) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const newUser = { id: nextId, name, age: parseInt(age) };
    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);
    setNextId(nextId + 1);
    setName('');
    setAge('');
    saveUsers(updatedUsers);
  };

  // Função para deletar usuário
  const handleDeleteUser = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  return (
    <main className={styles.mainUser}>
      <h1 className={styles.h1User}>Cadastro de Usuários</h1>

      <form onSubmit={handleAddUser} className={styles.formUser}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.labelUser}>Nome</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.inputUser}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="age" className={styles.labelUser}>Idade</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className={styles.inputUser}
          />
        </div>
        <button type="submit" className={styles.buttonUser}>Cadastrar</button>
      </form>

      <h2 className={styles.h2User}>Lista de Usuários</h2>
      <ul className={styles.userList}>
        {users.length === 0 ? (
          <p className={styles.noUsersMessage}>Nenhum usuário cadastrado.</p>
        ) : (
          users.map((user: User) => (  
            <li key={user.id} className={styles.userItem}>
              <strong>ID: {user.id}</strong> - {user.name} - {user.age} anos
              <button
                onClick={() => handleDeleteUser(user.id)}
                className={styles.deleteButton}
              >
                Deletar
              </button>
            </li>
          ))
        )}
      </ul>

      <div className={styles.navigationButtons}>
        <Link href="/lancador"><button className={styles.navButton}>Cadastrar Receitas/Despesas</button></Link>
        <Link href="/consultar"><button className={styles.navButton}>Consultar Receitas/Despesas</button></Link>
      </div>
    </main>
  );
}
