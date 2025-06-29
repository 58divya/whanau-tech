import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Kia ora! How can I help you with WhānauTech today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [...prev, { from: 'bot', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { from: 'bot', text: 'Sorry, I had trouble responding.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { from: 'bot', text: 'Network error, please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#007bff',
          color: 'white',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '24px',
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          zIndex: 1000
        }}
        aria-label="Toggle chatbot"
      >
        💬
      </button>

      {/* Chat window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          width: '350px',
          height: '450px',
          background: '#f4f4f4',
          border: '1px solid #ccc',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          zIndex: 999
        }}>
          <div style={{
            padding: '10px',
            backgroundColor: '#216c41',  // Dark green
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Koru.svg/240px-Koru.svg.png")',
            backgroundSize: '40px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '10px center',
            paddingLeft: '50px'
          }}>
            WhānauTech Chatbot
          </div>

          <div style={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ textAlign: msg.from === 'user' ? 'right' : 'left', margin: '5px 0' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '8px 12px',
                  borderRadius: '15px',
                  maxWidth: '80%',
                  background: msg.from === 'user' ? '#276749' : '#e0f2f1',  // dark green / light green
                  color: msg.from === 'user' ? 'white' : 'black',
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <p><em>Typing...</em></p>}
          </div>

          <div style={{ display: 'flex', borderTop: '1px solid #ccc' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              style={{ flexGrow: 1, padding: '10px', border: 'none' }}
            />
            <button onClick={sendMessage} style={{ padding: '10px', border: 'none', background: '#007bff', color: '#fff' }}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;