
// =====================
// Configuración Global
// =====================
const STORAGE_KEY = 'chatbotConversationHistory';
let conversationHistory = [];

const MENSAJES_BIENVENIDA = [
  "¡Hola! 👋 Soy tu entrevistador técnico personal de IA. Estoy aquí para ayudarte a prepararte para tu próxima entrevista.",
  "¿Estás listo para simular una entrevista de programación y pulir tus habilidades?"
];

// =====================
// Inicialización
// =====================
document.addEventListener("DOMContentLoaded", () => {
  aplicarPreferenciaModoOscuro();
  cargarHistorialConversacion();
});

// =====================
// Modo Oscuro
// =====================
function toggleModoOscuro() {
  document.body.classList.toggle("dark-mode");
  const modo = document.body.classList.contains("dark-mode") ? "enabled" : "disabled";
  localStorage.setItem("darkMode", modo);
}

function aplicarPreferenciaModoOscuro() {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }
}

// =====================
// Manejo del Historial
// =====================
function guardarHistorial() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversationHistory));
}

function limpiarHistorial() {
  localStorage.removeItem(STORAGE_KEY);
  conversationHistory = [];
  document.getElementById("chatbox").innerHTML = '';
  mostrarMensajesBienvenida();
  guardarHistorial();
}

function cargarHistorialConversacion() {
  const historial = localStorage.getItem(STORAGE_KEY);
  if (historial) {
    conversationHistory = JSON.parse(historial);
    conversationHistory.forEach(m => agregarMensaje(m.texto, m.tipo, false));
  } else {
    mostrarMensajesBienvenida();
    guardarHistorial();
  }
}

function mostrarMensajesBienvenida() {
  MENSAJES_BIENVENIDA.forEach(texto => {
    agregarMensaje(texto, "bot", false);
    conversationHistory.push({ texto, tipo: "bot" });
  });
}

// =====================
// Chat y UI
// =====================
function agregarMensaje(texto, tipo = "bot", animado = true) {
  const chatbox = document.getElementById("chatbox");
  const mensaje = document.createElement("div");
  mensaje.className = "mensaje " + tipo;

  if (tipo === "bot") {
    mensaje.innerHTML = parseMarkdown(texto);
  } else {
    mensaje.innerText = texto;
  }

  if (animado) mensaje.classList.add("fade-in");

  chatbox.appendChild(mensaje);
  chatbox.scrollTop = chatbox.scrollHeight;

  conversationHistory.push({ texto, tipo });
  guardarHistorial();
}

async function enviarPregunta() {
  const textarea = document.getElementById("pregunta");
  const pregunta = textarea.value.trim();

  if (!pregunta) {
    agregarMensaje("Por favor, escribe algo antes de enviar.", "bot");
    return;
  }

  agregarMensaje(pregunta, "user");
  textarea.value = "";
  mostrarIndicadorEscribiendo();

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pregunta })
    });

    const data = await response.json();
    ocultarIndicadorEscribiendo();
    agregarMensaje(data.respuesta, "bot");
  } catch (error) {
    ocultarIndicadorEscribiendo();
    agregarMensaje("Ocurrió un error al obtener la respuesta.", "bot");
    console.error(error);
  }
}

// =====================
// Indicador de "Escribiendo..."
// =====================
function mostrarIndicadorEscribiendo() {
  document.getElementById("typing-indicator").style.display = "flex";
  document.getElementById("chatbox").scrollTop = document.getElementById("chatbox").scrollHeight;
}

function ocultarIndicadorEscribiendo() {
  document.getElementById("typing-indicator").style.display = "none";
}

// =====================
// Markdown a HTML
// =====================
function parseMarkdown(markdownText) {
  let htmlText = markdownText
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/###\s*(.*)/g, '<h3>$1</h3>')
    .replace(/##\s*(.*)/g, '<h2>$1</h2>')
    .replace(/#\s*(.*)/g, '<h1>$1</h1>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>');

  const lines = htmlText.split('\n');
  let processedLines = [];
  let inOrderedList = false, inUnorderedList = false;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (/^\d+\.\s/.test(trimmed)) {
      if (!inOrderedList) {
        if (inUnorderedList) { processedLines.push("</ul>"); inUnorderedList = false; }
        processedLines.push("<ol>"); inOrderedList = true;
      }
      processedLines.push(`<li>${trimmed.replace(/^\d+\.\s/, "")}</li>`);
    } else if (/^(\*|\-)\s/.test(trimmed)) {
      if (!inUnorderedList) {
        if (inOrderedList) { processedLines.push("</ol>"); inOrderedList = false; }
        processedLines.push("<ul>"); inUnorderedList = true;
      }
      processedLines.push(`<li>${trimmed.replace(/^(\*|\-)\s/, "")}</li>`);
    } else {
      if (inOrderedList) { processedLines.push("</ol>"); inOrderedList = false; }
      if (inUnorderedList) { processedLines.push("</ul>"); inUnorderedList = false; }
      if (trimmed !== "") {
        processedLines.push(`<p>${trimmed}</p>`);
      }
    }
  });

  if (inOrderedList) processedLines.push("</ol>");
  if (inUnorderedList) processedLines.push("</ul>");

  return processedLines.join("\n").replace(/<p>(.*?)<\/p>/gs, (m, p1) => `<p>${p1.replace(/\n(?!<)/g, "<br>")}</p>`);
}