#!/usr/bin/env bash
# set -eo pipefail

# -------------------------
# Configuration
# -------------------------
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PLUGINS_DIR="$PROJECT_ROOT/src"
CUSTOM_INI="$PROJECT_ROOT/conf/custom.ini"
DOCKER_COMPOSE_FILE="$PROJECT_ROOT/docker-compose.yml"
GRAFANA_SERVICE_NAME="grafana"   
PORT=${PORT:-3000}

# -------------------------
# Helper Functions
# -------------------------
function cleanup() {
    echo "Stopping any existing Grafana containers..."
    docker-compose -f "$DOCKER_COMPOSE_FILE" stop "$GRAFANA_SERVICE_NAME" || true
    docker-compose -f "$DOCKER_COMPOSE_FILE" rm -f "$GRAFANA_SERVICE_NAME" || true
}

function start_grafana() {
    echo "Starting Grafana container with plugins..."
    docker-compose -f "$DOCKER_COMPOSE_FILE" up -d "$GRAFANA_SERVICE_NAME"
}

# -------------------------
# Main
# -------------------------
echo "Project root: $PROJECT_ROOT"
echo "Plugins directory: $PLUGINS_DIR"
echo "Custom ini: $CUSTOM_INI"

cleanup

# Ensure plugins directory exists
if [ ! -d "$PLUGINS_DIR" ]; then
    echo "Error: Plugins directory not found: $PLUGINS_DIR"
    exit 1
fi

# Start Grafana
start_grafana

echo "Grafana is starting on port $PORT..."
echo "Waiting for Grafana to be ready..."

# Wait until Grafana API responds
until curl -s -f -u admin:admin "http://localhost:$PORT/api/health" >/dev/null; do
    echo -n "."
    sleep 2
done

echo
echo "Grafana is up and running!"
echo "Access it at http://localhost:$PORT"