#!/bin/bash

# Login to Docker Hub
docker login

# Get a list of all stopped containers
containers=$(docker ps -aqf "status=exited")

# Loop through the containers and push their images to Docker Hub
for container in $containers
do
    # Get the image name for the container
    image=$(docker inspect --format='{{.Config.Image}}' $container)

    # Push the image to Docker Hub
    docker push $image
done
