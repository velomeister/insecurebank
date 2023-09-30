terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "insecurebank-tf-state"
    key = "insecurebank.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
    region = "us-east-1"
}

resource "aws_ecr_repository" "insecurebank_ecr_web_repo" {
    name = "insecurebank-web"  
}

resource "aws_ecr_repository" "insecurebank_ecr_db_repo" {
    name = "insecurebank-db"  
}