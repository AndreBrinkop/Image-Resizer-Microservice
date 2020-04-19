#!/bin/bash
REGION_CODE='us-east-1'

NETWORK_STACK_NAME='ImageResizerNetwork'
CLUSTER_STACK_NAME='ImageResizerCluster'

echo "Deleting Stack: $CLUSTER_STACK_NAME"
aws --region $REGION_CODE cloudformation delete-stack --stack-name $CLUSTER_STACK_NAME
aws --region $REGION_CODE cloudformation wait stack-delete-complete --stack-name $CLUSTER_STACK_NAME

echo "Deleting Stack: $NETWORK_STACK_NAME"
aws --region $REGION_CODE cloudformation delete-stack --stack-name $NETWORK_STACK_NAME
aws --region $REGION_CODE cloudformation wait stack-delete-complete --stack-name $NETWORK_STACK_NAME
