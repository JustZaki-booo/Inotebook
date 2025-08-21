import React from "react";

function About() {
  return (
    <div className="container my-4">
      <h1 className="mb-3">About iNotebook</h1>
      <p>
        iNotebook is your personal notes companion. You can quickly create, edit, 
        and organize all your notes in one place. Keep track of your ideas, tasks, 
        and important information effortlessly.
      </p>
      
      <h2 className="mt-4">Features</h2>
      <ul>
        <li>Easily add new notes with title, description, and tags.</li>
        <li>Edit or delete notes whenever you need.</li>
        <li>Organize your notes for better productivity.</li>
        <li>Secure access — your notes are private to your account.</li>
      </ul>

      <h2 className="mt-4">Why iNotebook?</h2>
      <p>
        iNotebook is designed to be fast, simple, and reliable. Whether you're 
        a student, professional, or just someone who loves jotting down ideas, 
        iNotebook helps you stay organized and focused.
      </p>

      <h2 className="mt-4">Get Started</h2>
      <p>
        Sign up today and start managing your notes efficiently. Your thoughts, tasks, 
        and ideas are just a click away from being organized.
      </p>
    </div>
  );
}

export default About;
