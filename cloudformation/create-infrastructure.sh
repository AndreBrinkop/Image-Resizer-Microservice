#!/bin/bash
REGION_CODE='us-east-1'

NETWORK_STACK_NAME='ImageResizerNetwork'
aws --region $REGION_CODE cloudformation create-stack --stack-name $NETWORK_STACK_NAME --template-body file://network.yml --parameters file://network-params.json
aws --region $REGION_CODE cloudformation wait stack-create-complete --stack-name $NETWORK_STACK_NAME

CLUSTER_STACK_NAME='ImageResizerCluster'
aws --region $REGION_CODE cloudformation create-stack --stack-name $CLUSTER_STACK_NAME --template-body file://cluster.yml --parameters file://cluster-params.json --capabilities CAPABILITY_NAMED_IAM
aws --region $REGION_CODE cloudformation wait stack-create-complete --stack-name $CLUSTER_STACK_NAME