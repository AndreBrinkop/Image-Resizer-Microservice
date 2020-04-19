# Image Resizer Microservice

## Project Overview
This project contains a Node.JS microservice that allows users to resize images using an HTTP Post endpoint.\
It contains the source code to the Node.JS app and all the necessary files and scripts to operationalize the Microservice  using an automated CI/CD Pipeline implemented in Jenkins that builds a Docker image and deploys an AWS EKS (Kubernetes) cluster that will be used to run the Docker container.

The CI/CD Pipeline takes care of the following steps:
1. Checkout SCM
2. Setup: Installing necessary dependencies of the Node.js app
3. Linting: Analyze the JavaScript code and the Dockerfile for potential errors
4. Testing: Run integration tests on the Node.js app
5. Build image: Deploy the Node.js app inside a Docker image
6. Upload image: Upload the created image to Docker Hub
7. Create/Update EKS Cluster: Create respectively update the EKS Cluster and the connected AWS infrastructure using CloudFormation templates
8. Deploy Container to EKS: Deploy the Docker container to the EKS Cluster using `kubectl`

---

## Repository Content

* `src/` contains the code for the Image Resizer Node.js app
* `test/` contains the integration tests for the Image Resizer Node.js app
* `cloudformation/` contains CloudFormation templates to create a network and an EKS cluster on top of that network as well as scripts to automatically create/update/delete stacks using those templates
* `kubernetes/` contains the `kubectl` config as well as a script to automatically deploy the application to the EKS cluster

---

## Setup the Environment

* Create a virtualenv and activate it
* Run `make install` to install the necessary dependencies

### Running

1. Standalone:  `Make all`
2. Run in Docker:  `docker build --tag=image-resizer . && docker run -p 80:3000 image-resizer`
