pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['qa', 'dev', 'preprod', 'prod'], description: 'Select the target environment')
    }

    environment {
        ENV = "${params.ENVIRONMENT}"

        DEV_URL = credentials('DEV_URL')
        DEV_USERNAME = credentials('DEV_USERNAME')
        DEV_PASSWORD = credentials('DEV_PASSWORD')

        QA_URL = credentials('QA_URL')
        QA_USERNAME = credentials('QA_USERNAME')
        QA_PASSWORD = credentials('QA_PASSWORD')

        PREPROD_URL = credentials('PREPROD_URL')
        PREPROD_USERNAME = credentials('PREPROD_USERNAME')
        PREPROD_PASSWORD = credentials('PREPROD_PASSWORD')

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
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true

            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])
        }
    }
}