import React,{useState} from "react";

interface User {
  id: number;
  username: string;
  password: string;
}

interface ModalProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, user, onClose, onUpdate }) => {
  const [username, setUsername] = useState(user?.username || ""); // Initialize username state
  const [password, setPassword] = useState(user?.password || ""); // Initialize password state

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
    // console.log(username, "username in modal")
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    const updatedUser = {
      id: user.id,
      username,
      password,
    };

    console.log(updatedUser, "updatedUser on modal")

    onUpdate(updatedUser); // Call parent's onUpdate function with updated data
    onClose(); // Close the modal after successful update
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username} // Controlled component using state
            onChange={handleUsernameChange}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password} // Controlled component using state
            onChange={handlePasswordChange}
            required
          />
          <button type="submit">Update</button>
        </form>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
