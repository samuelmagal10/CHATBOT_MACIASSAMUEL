# 🤖 Entrevistador Técnico AI

Un chatbot interactivo desarrollado con **FastAPI** y **JavaScript** que simula entrevistas técnicas en tiempo real, ayudando a programadores a prepararse para sus entrevistas laborales. Este asistente virtual actúa como un **mentor experto en programación**, ofreciendo preguntas, consejos y respuestas detalladas.

---

## 🚀 Características

- 💬 Simula entrevistas técnicas en vivo con IA.
- 📚 Soporte para temas como algoritmos, estructuras de datos, bases de datos, programación orientada a objetos, buenas prácticas y más.
- 🧠 Explicaciones claras con ejemplos para cada concepto técnico.
- 🌗 Modo claro / oscuro con un solo clic.
- 📜 Historial de conversación persistente (guardado en localStorage).
- 🖋️ Soporte de formato Markdown en las respuestas del bot.
- 🎯 Interfaz moderna, amigable y responsive.

---

## 🧪 Tecnologías Utilizadas

| Frontend                | Backend              |
| ----------------------- | -------------------- |
| HTML5, CSS3, JavaScript | Python (FastAPI)     |
| Font Awesome            | OpenAI API (Mistral) |
| LocalStorage            | Pydantic             |
| Modo Dark               | dotenv               |

---

## 📁 Estructura del Proyecto

\`\`\`
📦 chatbot-ai
├── static/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── chatbot.py
├── config.py
├── .env
└── README.md
\`\`\`

---

## ⚙️ Instalación y Uso Local

1. **Clona el repositorio:**
   \`\`\`bash
   git clone https://github.com/tu-usuario/chatbot-ai.git
   cd chatbot-ai
   \`\`\`

2. **Instala las dependencias (con entorno virtual opcional):**
   \`\`\`bash
   pip install fastapi uvicorn python-dotenv openai
   \`\`\`

3. **Configura las variables de entorno:**
   Crea un archivo `.env` con tu API Key y base URL (si aplica):

   \`\`\`
   API_KEY=sk-...
   BASE_URL=https://api.openai.com/v1
   \`\`\`

4. **Ejecuta la aplicación:**
   \`\`\`bash
   uvicorn chatbot:app --reload
   \`\`\`

5. **Accede desde tu navegador:**
   \`\`\`
   http://localhost:8000
   \`\`\`

---

## 🧠 ¿Cómo funciona?

El backend utiliza la API de OpenAI (modelo `mistral-small-3.1`) con un prompt de sistema personalizado que convierte al bot en un mentor técnico profesional. Cada pregunta del usuario se envía a este modelo y se obtiene una respuesta clara y pedagógica, diseñada para mejorar el rendimiento del usuario en entrevistas técnicas.

---

## 🛠️ Funcionalidades destacadas del código

- **Persistencia local del historial**: el `localStorage` guarda cada interacción.
- **Markdown parser**: el script convierte elementos como `**negrita**`, `# títulos`, `*cursivas*`, listas y bloques de código en HTML.
- **Indicador de escritura animado**.
- **Interfaz adaptable** a dispositivos móviles (media queries).

---

## 👨‍💻 Autor

Desarrollado por **[Tu Nombre o Usuario de GitHub]**  
📫 Contacto: [samuelmagal10@gmail.com.com]  
🌐 Portafolio: [https://github.com/samuelmagal10]
