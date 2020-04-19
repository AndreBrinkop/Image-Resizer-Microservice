#!/bin/bash -e
REGION_CODE='us-east-1'

NETWORK_STACK_NAME='ImageResizerNetwork'
CLUSTER_STACK_NAME='ImageResizerCluster'

if ! aws cloudformation describe-stacks --region $REGION_CODE --stack-name $NETWORK_STACK_NAME ; then
    echo "Creating Stack: $NETWORK_STACK_NAME"
    aws --region $REGION_CODE cloudformation create-stack --stack-name $NETWORK_STACK_NAME --template-body file://network.yml --parameters file://network-params.json
    aws --region $REGION_CODE cloudformation wait stack-create-complete --stack-name $NETWORK_STACK_NAME
else
    echo "Updating Stack: $NETWORK_STACK_NAME"
    set +e
    command_output=$(aws --region $REGION_CODE cloudformation update-stack --stack-name $NETWORK_STACK_NAME --template-body file://network.yml --parameters file://network-params.json  2>&1)
    if [[ $? -ne 0 && $command_output == *'No updates are to be performed.' ]] ; then
      echo "No updates are to be performed."
      set -e
    elif [ $? -ne 0 ] ; then
      echo "Updating Stack failed: $command_output"
      exit 1
    else
    set -e
      aws --region $REGION_CODE cloudformation wait stack-update-complete --stack-name $NETWORK_STACK_NAME
    fi
fi
echo "Stack Details:"
echo aws cloudformation describe-stacks --region $REGION_CODE --stack-name $NETWORK_STACK_NAME


if ! aws cloudformation describe-stacks --region $REGION_CODE --stack-name $CLUSTER_STACK_NAME ; then
    echo "Creating Stack: $CLUSTER_STACK_NAME"
    aws --region $REGION_CODE cloudformation create-stack --stack-name $CLUSTER_STACK_NAME --template-body file://cluster.yml --parameters file://cluster-params.json --capabilities CAPABILITY_NAMED_IAM
    aws --region $REGION_CODE cloudformation wait stack-create-complete --stack-name $CLUSTER_STACK_NAME
else
    echo "Updating Stack: $CLUSTER_STACK_NAME"
    set +e
    command_output=$(aws --region $REGION_CODE cloudformation update-stack --stack-name $CLUSTER_STACK_NAME --template-body file://cluster.yml --parameters file://cluster-params.json --capabilities CAPABILITY_NAMED_IAM  2>&1)
    if [[ $? -ne 0 && $command_output == *'No updates are to be performed.' ]] ; then
      echo "test >${?}< >${command_output}<
      echo "No updates are to be performed."
      set -e
    elif [ $? -ne 0 ] ; then
      echo "Updating Stack failed: $command_output"
      exit 1
    else
    set -e
      aws --region $REGION_CODE cloudformation wait stack-update-complete --stack-name $CLUSTER_STACK_NAME
    fi
fi
echo "Stack Details:"
echo $(aws cloudformation describe-stacks --region $REGION_CODE --stack-name $CLUSTER_STACK_NAME)