# AWS One Pass

## Local Development
1. Install [asdf](https://asdf-vm.com/guide/getting-started.html)
    1. Install the nodejs plugin with `asdf plugin-add nodejs`
    2. Configure the [asdf-direnv](https://github.com/asdf-community/asdf-direnv) plugin
    3. Run `asdf install` from the repo root
    4. Run `direnv allow`

## Deploy
### Using the AWS CLI
```
aws cloudformation deploy \
--stack-name one-pass-stack \
--template-file template.yaml \
--capabilities CAPABILITY_NAMED_IAM \
--profile <your_aws_local_profile>
```
### Using the AWS SAM CLI
```
sam deploy --stack-name one-pass-stack \
--template-file template.yaml \
--capabilities CAPABILITY_NAMED_IAM \
--resolve-s3 \
--profile <your_aws_local_profile>
```

