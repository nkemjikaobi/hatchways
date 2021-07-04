#!/bin/bash

# This script will start a single "disposable" instance and connect the caller to it.
IMAGE_NAME="hatchways_evaluation"

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT="$(dirname "${SCRIPT_DIR}")"

echo " ----- Starting Up Infrastructure Containers -----"

docker-compose -p hatchways_evaluation up -d

echo " ----- Starting Disposable Docker Container -----"

# Now,  link them into our disposable container.
echo " ----- Starting up hatchways_evaluation Container -----"
docker run \
    -i \
    -t \
    -p 3000:3000 \
    -v ${ROOT}:/var/www \
    --env-file=${ROOT}/.env \
    --network=${IMAGE_NAME}_main_network \
    ${IMAGE_NAME} \
    sh -c "npm start"

echo " ----- EXITED from disposable container -----"
echo " ----- Removing Exited Containers. -----"

# Now grep through all containers and stop those that have been "exited". 
docker ps -a | grep Exited | awk '{ print $1,$2 }' | \
grep ${IMAGE_NAME} |  awk '{print $1 }' | xargs -I {} docker rm {}
