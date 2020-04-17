pipeline {
  agent any
  environment {
    HOME="."
    IMAGE_NAME = "andrebrinkop/image-resizer-microservice"
  }
  stages {
    stage('Setup') {
      steps {
        sh 'npm install'
      }
    }
    stage('Linting') {
      steps {
        sh 'make lint'
      }
    }
    stage('Testing') {
      steps {
        sh 'make test'
      }
    }
    stage('Build image') {
      steps {
        script {
          docker.build("${env.IMAGE_NAME}:${env.BUILD_ID}")
        }
      }
    }
  }
}