/** @format */
"use client";
import { userInfo } from "os";
import React, { useState, useEffect } from "react";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: null,
    lastName: "",
    age: "",
    dob: "",
  });
  const [user, setuser] = useState({ username: "", password: "" });
  //   const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch profile data
    fetch("http://localhost:3000/users/:id/profiles")
      .then((response) => response.json())
      .then((data) =>
        setProfile((prevData) => {
          return {
            ...prevData,
            firstName: data.firstName,
            lastNameName: data.lastName,
            age: data.age,
            dob: data.dob,
          };
        })
      )
      .catch((error) => console.error("Error fetching profile:", error));

    // Fetch login data
    fetch("http://localhost:3000/users/")
      .then((response) => response.json())
      .then((data) =>
        setuser((prev) => ({
          ...prev,
          userName: data.username,
          password: data.password,
        }))
      )
      .catch((error) => console.error("Error fetching login data:", error));

    // Fetch posts data
    fetch("/api/posts");
    /*     .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error)); */
  }, []);

  if (!profile.firstName || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="get-login">
        <h2>LOGIN details</h2>
        <p>UserName : {user?.username}</p>
        <p>Password : {user?.password}</p>
      </div>
      <div className="get-profile">
        <h2>PROFILE</h2>
        <p>First Name: {profile.firstName}</p>
        <p>Last Name: {profile.lastName}</p>
        <p>Age: {profile.age}</p>
        <p>Date of Birth: {profile.dob}</p>
      </div>
      <div className="get-posts">
        <h2>POST details</h2>
        {/* {posts.map((post) => (
          <div key={post.id}>
            <p>Title: {post.title}</p>
            <p>Body: {post.description}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Profile;
