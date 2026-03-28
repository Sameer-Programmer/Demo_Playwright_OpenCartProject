pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
    steps {
        withCredentials([file(credentialsId: 'ENV_FILE', variable: 'ENV_FILE')]) {
            bat '''
                copy "%ENV_FILE%" .env
                npx playwright test
            '''
        }
    }
    
}