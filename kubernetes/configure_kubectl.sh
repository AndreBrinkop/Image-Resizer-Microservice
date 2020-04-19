#!/bin/bash
CLUSTER_NAME='ImageResizerMicroservice'
REGION_CODE='us-east-1'

echo "Setting up kubectl config"
aws eks --region $REGION_CODE update-kubeconfig --name $CLUSTER_NAME

echo "Deploy application and setup Load Balancer"
kubectl apply -f deployment.yml

echo ""
echo "Image Resizer Microservice (Load Balancer) Hostname:"
hostname=$(kubectl get services/image-resizer-service -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
echo $hostname