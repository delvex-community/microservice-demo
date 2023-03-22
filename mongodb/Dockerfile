FROM mongo:latest

# Expose default MongoDB port
EXPOSE 27017

# Create data directory
RUN mkdir -p /data/db

# Set permissions for data directory
RUN chown -R mongodb:mongodb /data/db

# Start MongoDB service
CMD ["mongod"]

