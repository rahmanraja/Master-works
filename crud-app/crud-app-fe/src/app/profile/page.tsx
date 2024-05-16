/** @format */

"use client";
import React, { useState, useEffect } from "react";
import Modal from "../Modal";
// Interface for user data
interface User {
  id: number;
  username: string;
  password: string;
}

const Profile = () => {
  const [user, setUser] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false); // Modal state
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Selected user for update

  useEffect(() => {
    fetch("http://localhost:3000/users/")
      .then((response) => response.json())
      .then((data: User[]) => {
        console.log(data, "data of users");
        setUser(data);
      })
      .catch((error) => console.error("Error fetching login data:", error));
  }, []);

  const handleUpdateUserLogin = (userId: number) => {
    setIsOpen(true);
    setSelectedUser(user.find((u) => u.id === userId)); // Find user for update
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedUser(null); // Clear selected user
  };

  const handleUpdateUser = (updatedUser: User) => {
    // Optimistic UI update (optional)
    setUser(user.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    {console.log(  updatedUser ,"updateduser inside profiel.tsx")}
    // Simulate API call to update on server
    fetch(`http://localhost:3000/users/${updatedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: updatedUser.username,
        password: updatedUser.password
      })
    })
      .then((response) => {
        if (!response.ok) {
          console.log(updatedUser,"updatedusers")
          // Handle errors here
          console.error("Error updating user:", response.statusText);
          // Revert local state to avoid incorrect UI (optional)
        } else {
          console.log("User updated successfully!");
        }
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  const handleDeleteUser = (userId) =>{
    fetch(`http://localhost:3000/users/${userId}`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application/Json"
      },
    }).then((response) =>{
      console.error("error deleting data", response.statusText)
    }).catch((error) => console.error(error,"error while deleting"))
  }
  
  const loginProfile = user.map((list) => (
  <div className="mian">
    <div  className="login-details" key={list.id}>
      <p>id: {list.id}</p>
      <p>username: {list.username}</p>
      <p>Password: {list.password}</p>
      <button className="button" onClick={() => handleUpdateUserLogin(list.id)}>Update</button>
      <button className="button" onClick={()=> handleDeleteUser(list.id)}>delete</button>
    </div>
    
  </div>
  ));

  return (
    <div>
      <div className="get-login">
         <h2>LOGIN details</h2>
        {loginProfile}
      </div>

      {isOpen && selectedUser && (
        <Modal
          isOpen={isOpen}
          user={selectedUser}
          onClose={handleCloseModal}
          onUpdate={handleUpdateUser}
        />
      )}
       
    </div>
  );
};

export default Profile;
