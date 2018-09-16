pipeline {
	agent any
	stages {
		stage('Clone') {
			steps {
				sh "Clone the deployed Code."
			}
		}
		stage("Build") {
			steps {
				sh "Build the project to ship for production."
			}
		}
		stage('Deploy') {
			steps {
				sh "Deploy the build code."
			}
		}
	}
}
