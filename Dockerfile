# this is the node:10 image with python, pip, aws-cli and vue-cli installed
FROM alexharding/node_python:latest
COPY ./ /app
WORKDIR /app