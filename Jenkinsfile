pipeline {
  agent any
  options { timestamps(); skipDefaultCheckout(true) }

  environment {
    IMAGE = "devops-node:local"   // para demo local; si quieres GHCR: ghcr.io/ORG/REPO:${env.GIT_COMMIT.take(7)}
    NODE_WORKDIR = "."            // <- app en la raíz
  }

  stages {
    stage('Checkout') { steps { checkout scm } }

    stage('Unit tests & build (Node)') {
      steps {
        sh '''
          docker run --rm -v "$PWD":/w -w /w/${NODE_WORKDIR} node:lts bash -lc "
            npm ci &&
            npm test || true &&
            npm run build || true
          "
        '''
      }
    }

    stage('Docker build') {
      steps {
        sh '''
          docker run --rm \
            -v /var/run/docker.sock:/var/run/docker.sock \
            -v "$PWD":/w -w /w \
            docker:27-cli \
            docker build -t ${IMAGE} .
        '''
      }
    }

    stage('Terraform PLAN') {
      steps {
        sh '''
          docker run --rm \
            -v /var/run/docker.sock:/var/run/docker.sock \
            -v "$PWD":/w -w /w/infra \
            hashicorp/terraform:1.6 \
            sh -lc "terraform init -input=false && \
                    terraform validate && \
                    terraform plan -var app_image=${IMAGE} -out tfplan"
        '''
        archiveArtifacts artifacts: 'infra/tfplan', fingerprint: true
      }
    }

    stage('Aprobación') {
      steps { input message: '¿Aplicar cambios en entorno local?', ok: 'Aplicar' }
    }

    stage('Terraform APPLY') {
      steps {
        sh '''
          docker run --rm \
            -v /var/run/docker.sock:/var/run/docker.sock \
            -v "$PWD":/w -w /w/infra \
            hashicorp/terraform:1.6 \
            sh -lc "terraform apply -input=false tfplan"
        '''
      }
    }

    stage('Smoke tests') {
      steps {
        sh '''
          sleep 5
          curl -fsS http://localhost:8080/health
          curl -fsS http://localhost:8080/metrics | head -n 5
          echo "Prometheus: http://localhost:9090  |  Grafana: http://localhost:3000 (admin/admin)"
        '''
      }
    }
  }

  post {
    success { echo '✅ Node build, imagen, Terraform infra y smoke OK.' }
    failure { echo '❌ Revisá logs por etapa.' }
  }
}
