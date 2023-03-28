# microservices
it is basically a web app that working in microservices architecture in ec2 in which i have used different docker container for each services running on seperate container
#THIS IS TEST CHECK

Step 1: Install Nginx

Copy code
yum install nginx -y
Step 2: Configure Nginx for reverse proxy

Using this below cmd:
cd /etc/nginx
vim nginx.conf
Then, paste the following content into the nginx.conf file:

bash
Copy code
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    server {
        listen       80;
        listen       [::]:80;
        server_name test-123.com;

        location / {
            proxy_pass  http://13.235.51.128:8083/;
        }

        location /aboutus {
            proxy_pass  http://13.235.51.128:8083/;
        }

        location /home {
            proxy_pass  http://13.235.51.128:8080/;
        }

        location /contact/ {
            proxy_pass  http://13.235.51.128:8081/;
        }

        location /courses/ {
            proxy_pass  http://13.235.51.128:8082/;
        }

        location /login {
            proxy_pass  http://13.235.51.128:8084/;
        }

        location /register {
            proxy_pass  http://13.235.51.128:8084/register.html;
        }

        location /exam {
            proxy_pass  http://13.235.51.128:8088/;
        }

        location /sucess {
            proxy_pass  http://13.235.51.128:8086/;
        }

    }
}
Note: Please replace the IP address in each proxy_pass directive with your own IP address. Do not change the port number.

Save the changes and exit the editor by pressing ESC and then typing :wq.

Restart Nginx using the following command:

Copy code
service nginx restart
Step 4: Pull Docker containers from loveyogi2000

bash
Copy code
docker pull loveyogi2000/mongodb
docker pull loveyogi2000/nodeapp
docker pull loveyogi2000/sucess
docker pull loveyogi2000/login
docker pull loveyogi2000/courses
docker pull loveyogi2000/contact
docker pull loveyogi2000/about
docker pull loveyogi2000/home
Step 5: Run Docker containers

lua
Copy code
docker network create mynetwork

docker run --name mongodb -d -p 27017:27017 --net mynetwork loveyogi2000/mongodbcontainer
docker run --name nodeapp -d -p 3000:3000



Love yogi
docker run --name home -d -p 8080:80 home 
docker run --name contact -d -p 8081:80 contact 
docker run --name courses -d -p 8082:80 courses 
docker run --name about -d -p 8083:80 about
docker run --name login -d -p 8080:84 login
add thi in step5
Thank you for the correction. Here's the updated Step 5 with the additional command:

Step 5: Run all containers

Pull all containers from loveyogi2000:

bash
Copy code
docker pull loveyogi2000/home
docker pull loveyogi2000/contact
docker pull loveyogi2000/courses
docker pull loveyogi2000/about
docker pull loveyogi2000/login
Run the containers using the following commands:

bash
Copy code
docker run --name home -d -p 8080:80 loveyogi2000/home
docker run --name contact -d -p 8081:80 loveyogi2000/contact
docker run --name courses -d -p 8082:80 loveyogi2000/courses
docker run --name about -d -p 8083:80 loveyogi2000/about
docker run --name login -d -p 8084:80 loveyogi2000/login
Create a network for the containers to communicate:

lua
Copy code
docker network create mynetwork
Run the MongoDB container:

css
Copy code
docker run --name mongodb -d -p 27017:27017 --net mynetwork mongo
Run the Node.js application container:

css
Copy code
docker run --name nodeapp -d -p 3000:3000 --net mynetwork loveyogi2000/nodeapp
Once all containers are running, you can access the web app using http://your-ec2-instance-ip/home.

