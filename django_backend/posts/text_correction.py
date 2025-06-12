import logging
import requests
from django.conf import settings

logger = logging.getLogger(__name__)

class TextCorrectionService:
    def __init__(self):
        self.api_key = settings.OPENROUTER_API_KEY
        self.api_url = settings.OPENROUTER_API_URL
        self.model = "deepseek/deepseek-chat-v3-0324:free"  
        logger.info(f"TextCorrectionService initialized with model: {self.model}")

    def correct_text(self, text):
        """
        Envoie le texte à l'API OpenRouter pour correction.
        """
        if not text:
            return text

        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:8000",
                "X-Title": "BlogChillDev"
            }

            payload = {
                "model": self.model,
                "messages": [
                    {
                        "role": "system",
                        "content": "Tu es un assistant spécialisé dans la correction orthographique et grammaticale de textes en français. Corrige le texte fourni en conservant son sens et sa structure. Réponds uniquement avec le texte corrigé, sans explications supplémentaires."
                    },
                    {
                        "role": "user",
                        "content": f"Corrige ce texte en français : {text}"
                    }
                ],
                "temperature": 0.3,
                "max_tokens": 100
            }

            logger.debug(f"Sending request to OpenRouter API for text of {len(text.split())} words")
            logger.debug(f"Request payload: {payload}")

            response = requests.post(self.api_url, headers=headers, json=payload)
            response.raise_for_status()

            logger.info(f"OpenRouter API response status: {response.status_code}")
            logger.debug(f"OpenRouter API response: {response.text}")

            result = response.json()
            corrected_text = result['choices'][0]['message']['content'].strip()

            logger.info(f"Original text: {text}")
            logger.info(f"Corrected text: {corrected_text}")

            return corrected_text

        except requests.exceptions.RequestException as e:
            logger.error(f"OpenRouter API error: {str(e)}")
            return text
        except Exception as e:
            logger.error(f"Unexpected error during text correction: {str(e)}")
            return text 