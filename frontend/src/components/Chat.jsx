import { useState } from "react";
import { askQuestion } from "../api";
import ReactMarkdown from "react-markdown";

export default function Chat({ userId, onReset }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question || loading) return;

    const q = question;
    setQuestion("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setLoading(true);

    try {
      const res = await askQuestion(userId, q);
      setMessages((m) => [...m, { role: "bot", text: res.data.answer }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "❌ Error fetching answer" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-wrapper">
      {/* HEADER */}
      <div className="chat-header">
        <div className="chat-title">
          🤖 CodeRAG Assistant
          <span>Ask questions about the indexed codebase</span>
        </div>

        <button className="reset-btn" onClick={onReset}>
          🔁 Analyze another repository
        </button>
      </div>

      {/* BODY */}
      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.role}`}>
            {m.role === "bot" ? (
              <ReactMarkdown>{m.text}</ReactMarkdown>
            ) : (
              m.text
            )}
          </div>
        ))}

        {loading && (
          <div className="bubble bot thinking">
            Thinking<span className="dots">...</span>
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="chat-input">
        <input
          placeholder="Ask about the codebase..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
        />
        <button onClick={ask} disabled={loading}>
          Ask
        </button>
      </div>
    </div>
  );
}
