# ✨ AI Creative Writing Tool

The **AI Creative Writing Tool** is a single-page web application (SPA) built with **React** and **TypeScript**, designed to deliver real-time, generative text experiences powered by the **Google Gemini API**. It provides a seamless and responsive interface for creative writing, role-based content generation, and AI-assisted storytelling.
<img width="1600" height="713" alt="CreativeWriting" src="https://github.com/user-attachments/assets/50eee456-dbd3-43d7-b036-ad651842d6b8" />

---

## 🧱 Implementation Architecture

This application emphasizes modularity, responsiveness, and maintainability — leveraging modern web technologies to ensure a smooth user experience.

- ⚛️ **Frontend:** React 18 using functional components and hooks  
- 💬 **Language:** TypeScript for static typing and better developer productivity  
- 🤖 **API Client:** Official `@google/genai` SDK for Gemini API interaction  
- 🧩 **State Management:**  
  - Local state handled via `useState` and `useCallback`  
  - Persistent history stored using `localStorage` through a custom hook  
- 🎨 **Styling:** Tailwind CSS loaded via CDN for rapid prototyping and a clean, utility-first design system  

---

## 🔍 API Selection Rationale

The **Google Gemini API** was selected for its flexibility, creative control, and powerful text generation capabilities.

- 🧠 **Model:** `gemini-2.5-flash` — optimized for creativity, speed, and balanced response quality  
- 🎭 **Tone Control:** Supports *system instructions* for tone and style customization (e.g., humorous, dramatic)  
- 🔄 **Streaming:** Real-time content updates enhance interactivity and responsiveness  
- ☁️ **Scalability:** Backed by Google Cloud infrastructure for reliability and performance  
- 🌡️ **Temperature:** Set at 0.7 to encourage imaginative yet coherent outputs  

---

## 🧠 Prompt Engineering Methodology

To achieve creative, contextually rich outputs, prompts are crafted using structured design principles:

1. **Role-Playing:**  
   The AI is assigned a persona such as “master storyteller” or “zen poet” to guide tone and style.

2. **Contextual Grounding:**  
   User ideas are framed with explicit context markers (e.g., `**Story Premise:**`, `**Theme:**`) to anchor creativity.

3. **Structured Instructions & Constraints:**  
   - Enforces rules for specific forms (e.g., *haiku* → 5-7-5 syllable pattern, *sonnet* → 14 lines with rhyme scheme)  
   - Narrative prompts follow logical flow: *beginning → rising action → climax → resolution*

4. **Genre & Tone Specification:**  
   User-specified genres and tones are embedded in the prompt to align output with stylistic intent.

---

## ⚡ Performance Optimization Techniques

Performance and responsiveness are prioritized through modern optimization strategies:

- 🔄 **Streaming API:** Uses `generateContentStream()` to render text in real time  
- 🧵 **Asynchronous Operations:** Non-blocking API requests keep the UI responsive  
- 💾 **Client-Side Caching:** Stores history in `localStorage` for instant retrieval without repeated API calls  
- 🧠 **Memoization:** Core logic wrapped with `useCallback` to avoid unnecessary re-renders and improve performance  

---

## 📊 Rate Limits & Usage Costs

Integration with the Gemini API includes considerations for usage management and cost optimization.

- 🚦 **Rate Limits:**  
  The `gemini-2.5-flash` model supports approximately **60 requests per minute (RPM)**. Exceeding this limit results in temporary API rejections.

- 💰 **Usage Costs:**  
  Pricing depends on input/output token counts. For the latest details, refer to:  
  👉 [Official Google AI Pricing Documentation](https://ai.google.dev/pricing)

---

## 🧩 Limitation Management Strategies

The app employs several mechanisms to handle constraints and ensure reliability:

- 🧱 **Error Handling:**  
  All API calls use `try...catch` blocks with clear, user-friendly error messages.

- ⏱️ **Performance Tracking:**  
  Generation time per request is measured and displayed to give users insight into API responsiveness.

- 🚫 **Input Validation:**  
  Prevents empty prompts from being submitted, minimizing unnecessary API requests.

- 💾 **Result Caching:**  
  Previous generations are saved in the local history panel for easy access without additional API costs.

---

## 🧰 Tech Stack Summary

| Category | Technology |
|-----------|-------------|
| **Frontend Framework** | React 18 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS (CDN) |
| **AI Model** | Google Gemini 2.5 Flash |
| **API SDK** | @google/genai |
| **State Management** | React Hooks + LocalStorage |
| **Build Tool** | Vite |

---

## 🧑‍💻 Author

**Michelle Rammila**  


