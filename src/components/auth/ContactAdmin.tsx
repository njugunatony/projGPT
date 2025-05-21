import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const ContactAdmin: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSent(false);
    try {
      await addDoc(collection(db, "contactMessages"), {
        name,
        email,
        subject,
        message,
        createdAt: Timestamp.now()
      });
      setSent(true);
      setName(""); setEmail(""); setSubject(""); setMessage("");
    } catch (err: any) {
      setError(err.message || "Failed to send message.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Admin</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      {sent && <p style={{color:'green'}}>Message sent! We'll get back to you soon.</p>}
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={e=>setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={e=>setSubject(e.target.value)}
        required
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={e=>setMessage(e.target.value)}
        required
      />
      <button type="submit">Send Message</button>
    </form>
  );
};

export default ContactAdmin;