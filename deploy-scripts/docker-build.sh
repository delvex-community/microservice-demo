#!/bin/bash
#Going into Project Directory
cd ../

#Building micro-service images (Home, DB & Auth)

docker build -t upflairs/home home/
docker build -t upflairs/auth-frontend auth/
docker build -t upflairs/db mongodb/


