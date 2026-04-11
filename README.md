# 🚀 Code RAG Platform

A plug-and-play code understanding system that enables semantic search and intelligent querying over codebases using Retrieval-Augmented Generation (RAG).

---

## ✨ What This Project Does

* Upload your codebase
* Automatically processes and indexes it
* Lets you search and query your code intelligently
* Returns context-aware results

👉 No manual database setup required
👉 No backend configuration needed

---

## 🧰 Tech Stack

* FastAPI (Backend)
* PostgreSQL (Cloud - Neon)
* FAISS (Vector Search)
* Gemini API (LLM)

---

## ⚡ Quick Start (Run in 2 Minutes)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/code-rag.git
cd code-rag
```

---

### 2. Create Virtual Environment

```bash
python -m venv venv
```

Activate:

**Windows**

```bash
venv\Scripts\activate
```

**Mac/Linux**

```bash
source venv/bin/activate
```

---

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Setup Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL= postgresql://neondb_owner:npg_6QfIR3wWMZFz@ep-long-block-a1ylktgr-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
GEMINI_API_KEY=your_api_key
```

> 📌 Note: The database is already hosted in the cloud. No local setup required.

---

### 5. Start the Application

```bash
uvicorn app.main:app --reload
```

---

### 6. Open in Browser

```text
http://127.0.0.1:8000/docs
```

👉 Use the interface to:

* Upload code
* Run queries
* Explore results

---

## 🧠 How It Works (Simple View)

1. Code is uploaded
2. It is split into smaller chunks
3. Embeddings are generated
4. Stored in cloud database
5. Queried using semantic search

---

## 📁 Project Structure

```
app/
 ├── main.py
 ├── db.py
 ├── models.py
 ├── build_vector_index.py
 └── ...
```

---

## 🔐 Configuration Notes

* `.env` file is required (not included for security)
* Use your own API key
* All users connect to the same cloud database

---

## ⚠️ Troubleshooting

**Server not starting**

* Ensure virtual environment is activated
* Check dependencies installed

**Database issues**

* Verify `DATABASE_URL` is correct

---

## 🚀 Future Enhancements

* Frontend UI integration
* Authentication system
* Deployment pipeline
* Scalable vector database

---

## 👨‍💻 Author

Vaibhav Gupta

---

## ⭐ Support

If you find this project useful, consider giving it a star ⭐
