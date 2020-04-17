pipeline {
  agent {
    docker {
      image 'node:12.16.2-stretch'
      args '-p 3000:3000'
    }
  }
  environment { HOME="." }
  stages {
    stage('Build') {
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
  }
}