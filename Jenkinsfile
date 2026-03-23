pipeline {
    agent any

    parameters {
        // Dropdown menu allows user to select env in Jenkins UI
        choice(name: 'ENVIRONMENT', choices: ['qa', 'dev', 'preprod', 'prod'], description: 'Select the target environment')
    }

    environment {
        // Bind the selected UI option to process.env.ENV 
        ENV = "${params.ENVIRONMENT}"

        // Load DEV credentials
        // Use 'withCredentials' block or 'credentials' object notation
        // Be sure to create these inside the Jenkins Credentials vault
        DEV_URL = credentials('DEV_URL')
        DEV_USERNAME = credentials('DEV_USERNAME')
        DEV_PASSWORD = credentials('DEV_PASSWORD')

        // Load QA credentials
        QA_URL = credentials('QA_URL')
        QA_USERNAME = credentials('QA_USERNAME')
        QA_PASSWORD = credentials('QA_PASSWORD')

        // Load PREPROD credentials
        PREPROD_URL = credentials('PREPROD_URL')
        PREPROD_USERNAME = credentials('PREPROD_USERNAME')
        PREPROD_PASSWORD = credentials('PREPROD_PASSWORD')

        // Load PROD credentials
        PROD_URL = credentials('PROD_URL')
        PROD_USERNAME = credentials('PROD_USERNAME')
        PROD_PASSWORD = credentials('PROD_PASSWORD')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Installs modules without modifying package.json
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Run the test suite - env.config.ts will intercept the ENV parameter 
                // and map these Jenkins vault values dynamically!
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Publishes HTML reports securely (Publish HTML Jenkins Plugin required optionally)
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
        }
    }
}
