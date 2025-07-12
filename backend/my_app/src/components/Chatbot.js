import React, { useState, useEffect, useRef } from 'react';
import translations from './translations'; // adjust path if needed
import './Chatbot.css';

function Chatbot({ selectedLanguage = 'en' }) {
  const t = translations[selectedLanguage]?.chatbot || translations.en.chatbot;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);       // Chatbot is visible
  const [isMinimized, setIsMinimized] = useState(true); // But minimized
  const [showPreview, setShowPreview] = useState(true); // Greeting popup

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Add initial greeting message
    setMessages([{ from: 'bot', text: t.greeting }]);

    // Hide greeting preview after a delay
    const timer = setTimeout(() => setShowPreview(false), 8000);
    return () => clearTimeout(timer);
  }, [t.greeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:5000/api/chat-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, lang: selectedLanguage }),
        mode: 'cors',
      });

      if (!res.body) throw new Error('ReadableStream not supported');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      setMessages(prev => [...prev, { from: 'bot', text: '' }]);

      let done = false;
      let accumulatedText = '';
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value);
          accumulatedText += chunk;

          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { from: 'bot', text: accumulatedText };
            return updated;
          });
        }
      }
    } catch (error) {
      console.error('❌ Error during fetch:', error);
      setMessages(prev => [...prev, { from: 'bot', text: t.networkError }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  };

  return (
    <div>
      {/* Toggle Button (when closed) */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(true);
            inputRef.current?.focus();
          }}
          className="chatbot-toggle-button"
          aria-label="Open chatbot"
        >
          💬
        </button>
      )}

      {/* Chatbot Panel */}
      <div
        className={`chatbot-window ${isOpen ? 'open' : 'closed'} ${isMinimized ? 'minimized' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="chatbot-header">
          {t.title}
          {isMinimized && showPreview && (
            <div className="chatbot-preview-bubble" onClick={() => {
              setIsMinimized(false);
              setShowPreview(false);
              inputRef.current?.focus();
            }}>
              {t.greeting}
            </div>
          )}
          <div>
            <button
              onClick={() => {
                setIsMinimized(!isMinimized);
                if (isMinimized) inputRef.current?.focus();
              }}
              className="chatbot-minimize-button"
              title={isMinimized ? 'Maximize' : 'Minimize'}
            >
              {isMinimized ? '⬆️' : '⬇️'}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="chatbot-close-button"
              title="Close"
            >
              ✖
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="chatbot-messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chatbot-message ${msg.from === 'user' ? 'user' : 'bot'}`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
              {loading && <p><em>{t.typing}</em></p>}
            </div>

            <div className="chatbot-input-area">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.placeholder}
                disabled={loading}
              />
              <button onClick={sendMessage} disabled={loading}>
                {t.send}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Chatbot;