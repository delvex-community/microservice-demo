# Container Networking Model Use-Cases

## Everything Under Same Bridge 
For Demonstration, we are only going to build and run  **Home, Auth & DB** containers.

 - Let's Start by Creating a network named **Upflairs** (By Default it
   creates with driver **bridge** )
   
       docker network create upflairs
 - We can Inspect the newly created network bridge by  
   
       docker network inspect upflairs

 

 - Output should look like this 
 <img src="https://github.com/delvex-community/microservice-demo/blob/bea8c4cdb114ae9ab9366cb995551333711547b3/demo/01-network.png"/>    

Now, Let's start building the Docker Images for the specified micro-services.
For Sake of time, we can run the script named *build.sh* present under *scripts* directory.

 - Making sure the permissions are correct 
  `chmod -R +x deploy-scripts/`
  
 - Execute build.sh
   `./deploy-scripts/build.sh`
   
 - The content of build script looks like this

    <img src="https://github.com/delvex-community/microservice-demo/blob/a4d3a4eebda56a4faee1eb54b385cd1d19f7d3ec/demo/02-script.png" />

 - After the images are built, you can cross-check images using  `docker
   images`
 - The output should contain the following images :- 
   - [ ] upflairs/auth-frontend
   - [ ] upflairs/home
   - [ ]  upflairs/db

### Starting the Containers

 - To start a container in the same network bridge that we created
   before, follow these steps :-
   
   `docker run -d --network=upflairs --name=home upflairs/home`
    `docker run -d --network=upflairs --name=auth-frontend upflairs/auth-frontend` 
   `docker run -d --network=upflairs --name=db upflairs/db`
 - Now let's cross-check if the containers are in up state
   Run `docker ps` and check 5th column of output :-
   
      - [ ] auth
      - [ ] home
      - [ ]  db

 - To cross-check if containers are created in *upflairs* network :-
	 `docker network inspect upflairs`
	<img src="https://github.com/delvex-community/microservice-demo/blob/a4d3a4eebda56a4faee1eb54b385cd1d19f7d3ec/demo/03-inspect.png"/>


## Checking Connectivity

Now that we've cross-verified the containers are in upflairs image, lets go into the containers and cross-check if we can connect using hostname 

1. Let's start by going inside home container 
	`docker exec -it home /bin/bash`

2. Inside the container, we can use `curl` to get the response
	`curl db:27017`
	`curl auth:80`
3. If you're able to see the response, that basically concludes that all containers are under same bridge and can communicate using hostname
4. Similarly, you can follow the above steps to check connectivity from other containers as well.
**NOTE :-** You can use `exit` command to come outside the container

## Container under different Bridge

Now, in order to cross-check if we can access the containers present under different bridge, lets start by creating a network first

 - Create *delvex* network

	`docker network create delvex`

- Lets create another *db* container but within *delvex* network.
	`docker run -d --network=delvex --name=db-in-delvex upflairs/db`

- You can cross-check the container present in *delvex* network and is in up and running state :-
`docker network inspect delvex`
 `docker ps`

### Checking Connectivity 

 In order to check if we can access container present in *delvex* bridge from the container present in *upflairs* bridge 

1. Let's go into home container using 
   `docker exec -it home /bin/bash`
   
2. Now let's try to make a curl request to *db-in-delvex* container on 27017 port number.
 `curl db-in-delvex:27017`

3. You won't be able to resolve the hostname and output should look like this 
 <img src="https://raw.githubusercontent.com/delvex-community/microservice-demo/0cdeeb8cc3c1751fa000e0947c85ca0e3a69680a/demo/04-connectivity.png"/>