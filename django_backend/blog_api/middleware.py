from django.utils.deprecation import MiddlewareMixin
from django.template import context

# Correctif temporaire pour la compatibilité avec Python 3.14
original_copy = context.Context.__copy__

def patched_copy(self):
    try:
        return original_copy(self)
    except AttributeError:
        # Créer une copie manuellement
        new_context = context.Context()
        for d in self:
            new_context.push(d.copy())
        return new_context

# Appliquer le correctif
context.Context.__copy__ = patched_copy

class CompatibilityMiddleware(MiddlewareMixin):
    """Middleware pour assurer la compatibilité avec Python 3.14"""
    
    def __init__(self, get_response=None):
        super().__init__(get_response)
        # Le correctif est déjà appliqué lors de l'importation 