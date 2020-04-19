def dockerImage

pipeline {
  agent any
  environment {
    HOME="."
    IMAGE_NAME = "abrinkop/image-resizer-microservice"
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
      when {
        branch 'master'
      }
      steps {
        script {
          dockerImage = docker.build("${env.IMAGE_NAME}:${env.BUILD_ID}")
        }
      }
    }
    stage('Upload image') {
      when {
        branch 'master'
      }
      steps {
        script {
          docker.withRegistry('', 'docker-hub') {
            dockerImage.push()
          }
        }
      }
    }
    stage('Create/Update EKS Cluster') {
          when {
            branch 'master'
          }
          steps {
            withAWS(region:'us-east-1',credentials:'aws-eks-credentials') {
              dir('cloudformation') {
                sh 'create-or-update-infrastructure.sh'
              }
            }
          }
        }
  }
}