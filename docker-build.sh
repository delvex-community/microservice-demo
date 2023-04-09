#!/bin/bash

# Recurse through all subdirectories in the current directory
for dir in */ ; do
  # Extract the directory name to use as the image tag and remove the trailing slash
  tag=${dir%/}

  # Build the Docker image with the tag
  docker build -t amiharsh/msvc:$tag $dir

  # Push the Docker image to the Docker Hub repository
  docker push amiharsh/msvc:$tag
done