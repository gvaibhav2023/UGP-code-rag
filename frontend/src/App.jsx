import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import RepoIngest from "./components/RepoIngest";
import Chat from "./components/Chat";
import "./styles.css";

function App() {
  const [userId, setUserId] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let uid = localStorage.getItem("coderag_user_id");
    if (!uid) {
      uid = uuidv4();
      localStorage.setItem("coderag_user_id", uid);
    }
    setUserId(uid);
  }, []);

  useEffect(() => {
    const bg = document.querySelector(".bg-image");

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxFade = window.innerHeight * 0.7;

      let opacity = 0.12 - (scrollY / maxFade) * 0.12;
      opacity = Math.max(opacity, 0);

      if (bg) bg.style.opacity = opacity;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!userId) return null;

  function TypingExplain() {
    const texts = [
      "We parse your repository using AST to understand real code structure — not just text.",
      "Relevant code chunks are embedded and indexed with FAISS for fast semantic retrieval.",
      "An LLM answers your question using exact source context, not hallucinations."
    ];

    const [visible, setVisible] = useState(false);
    const [displayedText, setDisplayedText] = useState(["", "", ""]);

    useEffect(() => {
      const section = document.querySelector(".explain-section");

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.4 }
      );

      if (section) observer.observe(section);
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (!visible) return;

      texts.forEach((text, index) => {
        let i = 0;
        const interval = setInterval(() => {
          setDisplayedText(prev => {
            const updated = [...prev];
            updated[index] = text.slice(0, i + 1);
            return updated;
          });
          i++;
          if (i === text.length) clearInterval(interval);
        }, 25 + index * 10);
      });
    }, [visible]);

    useEffect(() => {
  if (!ready) return;

  // wait for chat to render
  setTimeout(() => {
    const chatSection = document.querySelector(".chat-section");
    chatSection?.scrollIntoView({ behavior: "smooth" });
  }, 150);
}, [ready]);

    return (
      <section className="explain-section">
        <div className="explain">
          {displayedText.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>
      </section>
    );
  }

  // ✅ NEW: reset handler

const resetApp = () => {
  setReady(false);

  // scroll to repo input section
  setTimeout(() => {
    const ingestSection = document.querySelector(".ingest-section");
    ingestSection?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};

  return (
    <div className="landing-root">
      <div className="bg-image" />

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Code<span>RAG</span>
          </h1>
          <p>
            Ask questions about any codebase.<br />
            Powered by AST, FAISS & LLMs.
          </p>
          <div className="hero-glow" />
        </div>
      </section>

      <TypingExplain />

      {/* INGEST */}
      <section className="ingest-section">
  <RepoIngest
    userId={userId}
    onSuccess={() => {
      setReady(true);

      // ✅ ALWAYS scroll to chat after ingestion
      setTimeout(() => {
        const chatSection = document.querySelector(".chat-section");
        chatSection?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }}
  />
</section>


      {/* CHAT */}
      {ready && (
        <section className="chat-section">
          <Chat userId={userId} onReset={resetApp} />
        </section>
      )}
    </div>
  );
}

export default App;
