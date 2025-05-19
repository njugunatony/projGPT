import React, { useState } from 'react';
import { addUser } from '../api/userService';

const AddUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser({ name, email });
      setSuccess('User added!');
      setName('');
      setEmail('');
    } catch (err) {
      setSuccess('Failed to add user.');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required/>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required/>
      <button type="submit">Add User</button>
      {success && <div>{success}</div>}
    </form>
  );
};

export default AddUserForm;