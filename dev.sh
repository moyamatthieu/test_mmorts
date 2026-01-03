#!/bin/bash
# Script de lancement du serveur de développement Vite
# Vérifie et libère le port 5173 avant de lancer le serveur

PORT=5173

# Vérifier si un processus utilise le port 5173
echo "Vérification du port $PORT..."

# Essayer avec fuser (plus fiable sur Linux)
if command -v fuser &> /dev/null; then
    PID=$(fuser $PORT/tcp 2>/dev/null | tr -s ' ' '\n' | tail -1)
    if [ -n "$PID" ]; then
        echo "Processus trouvé sur le port $PORT (PID: $PID). Arrêt en cours..."
        kill $PID 2>/dev/null
        sleep 1
        # Vérifier si le processus est vraiment arrêté
        if fuser $PORT/tcp &> /dev/null; then
            echo "Forçage de l'arrêt..."
            kill -9 $PID 2>/dev/null
            sleep 1
        fi
    fi
# Fallback sur lsof si fuser n'est pas disponible
elif command -v lsof &> /dev/null; then
    PID=$(lsof -ti:$PORT 2>/dev/null)
    if [ -n "$PID" ]; then
        echo "Processus trouvé sur le port $PORT (PID: $PID). Arrêt en cours..."
        kill $PID 2>/dev/null
        sleep 1
        # Vérifier si le processus est vraiment arrêté
        if lsof -ti:$PORT &> /dev/null; then
            echo "Forçage de l'arrêt..."
            kill -9 $PID 2>/dev/null
            sleep 1
        fi
    fi
else
    echo "Avertissement: ni fuser ni lsof n'est disponible. Le port ne sera pas être nettoyé automatiquement."
fi

echo "Lancement du serveur de développement sur le port $PORT..."
exec node ./node_modules/vite/bin/vite.js --port $PORT
