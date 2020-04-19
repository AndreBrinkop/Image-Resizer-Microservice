# Image Resizer Microservice
This project contains a simple microservice to resize images and the necessary CI/CD Pipeline and Infrastructure as Code (CloudFormation) templates to completely automtically operationalize this microservice. The provided automation scripts can easily be adapted to work with other services as well.

## Project Overview
This project contains a Node.js microservice that allows users to resize images using an HTTP Post endpoint.\
It contains the source code to the Node.JS app and all the necessary files and scripts to operationalize the Microservice  using an automated CI/CD Pipeline implemented in Jenkins that builds a Docker image and deploys an AWS EKS (Kubernetes) cluster that will be used to run the Docker container.

The CI/CD Pipeline takes care of the following steps:
1. Checkout SCM
1. Setup: Installing necessary dependencies of the Node.js app
1. Linting: Analyze the JavaScript code and the Dockerfile for potential errors
1. Testing: Run integration tests on the Node.js app
1. Build image: Deploy the Node.js app inside a Docker image
1. Upload image: Upload the created image to Docker Hub
1. Create/Update EKS Cluster: Create respectively update the EKS Cluster and the connected AWS infrastructure using CloudFormation templates
1. Deploy Container to EKS: Deploy the Docker container to the EKS Cluster using `kubectl`

---

## Image Resizer Microservice
The app is providing endpoints that can be used to resize image and to retrieve size information from uploaded images.\
The processing of images is done by using `sharp`(https://github.com/lovell/sharp) and can easily be extended to include additional functionalities.

The implemented app provides the following endpoints:

```
POST /image-details

Description:
Returns the format and the size information (width and height) for the provided image.

Parameters:
* image: image file

Responses:
* 200 - successful operation:
  {
        name: string
        format: string,
        width: integer,
        height: integer
  }
* 400 - invalid request: request body does not contain an image
* 422 - invalid request content: the provided file is not supported
```

```
POST /resize-image

Description:
Resizes a provided image to the specified dimensions.
If the specified dimensions do have a different aspect ratio as the original picture letterboxing
is being used to prevent the image from being clinched/streteched.

Parameters:
* image: image file
* height: integer (desired height in px)
* width: integer (desired width in px)

Responses:
* 200 - successful operation: returns the provided image file adjusted to the desired size
* 400 - invalid request: request body does not contain an image
* 422 - invalid request content: the provided file is not supported
```

---

## Repository Content

* `src/` contains the code for the Image Resizer Node.js app
* `test/` contains the integration tests for the Image Resizer Node.js app
* `cloudformation/` contains CloudFormation templates to create a network and an EKS cluster on top of that network as well as scripts to automatically create/update/delete stacks using those templates
* `kubernetes/` contains the `kubectl` config as well as a script to automatically deploy the application to the EKS cluster

---

## Setup the Environment

* Install `Node.js` and `npm`
* Run `make install` to install the necessary dependencies

### Running

1. Standalone:  `make run`
1. Docker:  `docker build --tag=image-resizer . && docker run -p 80:3000 image-resizer`
