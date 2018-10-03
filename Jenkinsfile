pipeline {
	agent any
	stages {
		stage('Clean') {
			sh 'docker container rm $(docker ps -q -f status=exited)'
		}
		stage("Build") {
			steps {
				sh "echo Build the project to ship for production."
				sh 'docker-compose build'
			}
		}
		stage('Deploy') {
			steps {
				sh "echo Deploy the build code."
				sh 'docker-compose up -d'
			}
		}
	}
	post {
		success {
			sh 'echo Successfully deployed build'
		}
	}
}
