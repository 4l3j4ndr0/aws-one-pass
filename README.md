
# Deploy using AWS CLI

aws cloudformation deploy \
--stack-name one-pass-stack \
--template-file template.yaml \
--capabilities CAPABILITY_NAMED_IAM \
--profile <your_aws_local_profile>

# Deploy using AWS SAM CLI

sam deploy --stack-name one-pass-stack \
--template-file template.yaml \
--capabilities CAPABILITY_NAMED_IAM \
--resolve-s3 \
--profile <your_aws_local_profile>