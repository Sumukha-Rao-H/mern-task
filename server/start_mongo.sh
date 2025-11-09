#!/bin/bash
set -e

# Load environment variables from .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo ".env file not found!"
  exit 1
fi

# Default values
MONGO_IMAGE="mongo:7"
CONTAINER_NAME="mern_mongo"
VOLUME_NAME="mern_mongo_data"

# Extract host, port, dbname from MONGO_URI
# Example: mongodb://localhost:27017/mern_auth_db
URI_NO_PREFIX="${MONGO_URI#mongodb://}"         # remove scheme
HOST_PORT_DB=$(echo "$URI_NO_PREFIX" | cut -d'/' -f1,2)
HOST_PORT=$(echo "$HOST_PORT_DB" | cut -d'/' -f1)
DB_NAME=$(echo "$URI_NO_PREFIX" | cut -d'/' -f2)
HOST=$(echo "$HOST_PORT" | cut -d':' -f1)
PORT=$(echo "$HOST_PORT" | cut -d':' -f2)

# Default fallbacks
HOST=${HOST:-localhost}
PORT=${PORT:-27017}
DB_NAME=${DB_NAME:-mern_auth_db}

echo "Starting MongoDB container..."
echo "→ Image: $MONGO_IMAGE"
echo "→ Container name: $CONTAINER_NAME"
echo "→ Volume: $VOLUME_NAME"
echo "→ Port: $PORT"
echo "→ Database: $DB_NAME"

# Check if container already running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  echo "MongoDB container already running."
  exit 0
fi

# Remove old container if exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
  echo "Removing old MongoDB container..."
  docker rm -f $CONTAINER_NAME
fi

# Create volume if not exists
if ! docker volume inspect $VOLUME_NAME >/dev/null 2>&1; then
  docker volume create $VOLUME_NAME
fi

# Run MongoDB container
docker run -d \
  --name $CONTAINER_NAME \
  -p ${PORT}:27017 \
  -v ${VOLUME_NAME}:/data/db \
  $MONGO_IMAGE

echo "MongoDB started on mongodb://localhost:${PORT}/${DB_NAME}"
