pipeline {
	agent any
	stages {
		stage('Clone') {
			steps {
				sh "echo Clone the deployed Code."
			}
		}
		stage("Build") {
			steps {
				sh "echo Build the project to ship for production."
			}
		}
		stage('Deploy') {
			steps {
				sh "echo Deploy the build code."
			}
		}
	}
}
