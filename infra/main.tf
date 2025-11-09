terraform {
  required_providers {
    docker = { source = "kreuzwerker/docker", version = "~> 3.0" }
  }
}

provider "docker" {}

# Red local para que se resuelvan por nombre
resource "docker_network" "demo" { name = "devops_demo_net" }

variable "app_image" {
  type        = string
  default     = "devops-node:local"  # tag local para la demo
}

resource "docker_container" "app" {
  name  = "devops-demo-app"
  image = var.app_image
  networks_advanced { name = docker_network.demo.name }
  ports { internal = 8080, external = 8080 }  # cambia si usas otro puerto
  must_run = true
}

# Prometheus (scrapea la app)
resource "docker_container" "prometheus" {
  name  = "devops-demo-prometheus"
  image = "prom/prometheus:latest"

  networks_advanced { name = docker_network.demo.name }

  ports { internal = 9090, external = 9090 }

  volumes {
    host_path      = "${path.module}/prometheus.yml"
    container_path = "/etc/prometheus/prometheus.yml"
    read_only      = true
  }

  depends_on = [docker_container.app]
}

# Grafana
resource "docker_container" "grafana" {
  name  = "devops-demo-grafana"
  image = "grafana/grafana:latest"

  networks_advanced { name = docker_network.demo.name }

  env = [
    "GF_SECURITY_ADMIN_USER=admin",
    "GF_SECURITY_ADMIN_PASSWORD=admin",
  ]

  ports { internal = 3000, external = 3000 }

  depends_on = [docker_container.prometheus]
}
