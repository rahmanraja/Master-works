/** @format */

"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", password: "" });
  // Handle input change funtion
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        // Handle successful user creation
        const data = await response.json();
        console.log(data.id,"got id of user" );
        // const id = data.id
        router.push(`/profile`);
      } else {
        // Handle failed user creation
        const errorData = await response.json();
        console.error(errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <main className={styles.main}>
        <h1>Login page</h1>

        <div className={styles.center}>
          <div>
            <label htmlFor="username">UserName: </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              placeholder="username"
              autoComplete="off"
            />
            <br />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              placeholder="password"
              autoComplete="off"
            />
          </div>
          <button type="submit">Login</button>
        </div>

        <div className={styles.grid}></div>
      </main>
    </form>
  );
}
