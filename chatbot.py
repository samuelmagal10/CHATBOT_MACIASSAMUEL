from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from config import PROMPT_SISTEMA
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
import os

# Cargar variables de entorno
load_dotenv()

API_KEY = os.getenv("API_KEY")
BASE_URL = os.getenv("BASE_URL")

client = OpenAI(api_key=API_KEY, base_url=BASE_URL)

# Inicializar FastAPI
app = FastAPI()

# Servir archivos estáticos
app.mount("/static", StaticFiles(directory="static"), name="static")


# Modelo de entrada
class Pregunta(BaseModel):
    pregunta: str

# Ruta principal de la API
@app.post("/chat")
def obtener_respuesta(p: Pregunta):
    try:
        response = client.chat.completions.create(
            model="mistralai/mistral-small-3.1-24b-instruct:free",
            messages=[
                {"role": "system", "content": PROMPT_SISTEMA},
                {"role": "user", "content": p.pregunta}
            ],
            stream=False
        )

        respuesta = response.choices[0].message.content.strip()
        if not respuesta:
            respuesta = "No estoy seguro de cómo responder a eso. ¿Puedes reformular la pregunta?"

        return {"respuesta": respuesta}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/", response_class=HTMLResponse)
def servir_index():
    return FileResponse("static/index.html")

@app.get("/style.css")
def servir_css():
    return FileResponse("static/style.css", media_type="text/css")

@app.get("/script.js")
def servir_js():
    return FileResponse("static/script.js", media_type="application/javascript")
