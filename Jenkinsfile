pipeline {
  agent any
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
  }
}