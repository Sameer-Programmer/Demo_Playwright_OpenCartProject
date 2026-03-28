pipeline {
    agent any

    parameters {
        choice(name: 'ENV', choices: ['dev', 'qa', 'preprod', 'prod'], description: 'Select Environment')
        choice(name: 'HEADLESS', choices: ['true', 'false'], description: 'Run in headless mode')
        choice(name: 'SUITE', choices: ['sanity', 'regression', 'master', 'datadriven'], description: 'Select test suite')
    }

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
                    script {
                        def exitCode = bat(
                            script: """
                                echo Selected ENV: %ENV%
                                echo Headless Mode: %HEADLESS%
                                echo Running Suite: %SUITE%

                                copy "%ENV_FILE%" .env

                                echo ENV=%ENV%> temp.env
                                echo HEADLESS=%HEADLESS%>> temp.env
                                type .env >> temp.env
                                move /Y temp.env .env

                                npm run test:%SUITE%
                            """,
                            returnStatus: true
                        )

                        if (exitCode != 0) {
                            currentBuild.result = 'UNSTABLE'
                            echo "⚠️ Some tests failed"
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Generating Allure Report..."

            allure includeProperties: false,
                   jdk: '',
                   commandline: 'Allure',
                   results: [[path: 'allure-results']],
                   report: 'allure-report'
        }
    }
}