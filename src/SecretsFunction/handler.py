import json
import boto3
import re
from urllib.parse import urlparse
ssm_client = boto3.client('ssm')
def build_response(status, data):
    return {
        "statusCode": status,
        "body": json.dumps(data),
        "headers": {
            "Content-Type": "application/json"
        }
    }
    
def proccess_post_event(body):
    if body['type'] == 'login':
        tags = []
        for key, value in body.items():
            if key != "password":
                tags.append({
                "Key": key.upper(),
                "Value": value
            })
        ssm_client.put_parameter(
            Name = "/" + body["vault"] + "/" + re.sub(r'\s', '_', body['name']),
            Description = body["description"] if body['description'] != "" else body['name'],
            Value = body["password"],
            Type='SecureString',
            Tags = tags
        )
    return "Login created success."
    

def handler(event, context):
    print(json.dumps(event))
    try:
        method = event['requestContext']['httpMethod']
        if method == 'POST':
            body = event['body'] if isinstance(event['body'], dict) and event['body'] is not None else json.loads(event['body'])
            data = proccess_post_event(body)
        
        return build_response(200, data)
    except Exception as e:
        return build_response(500, e)
        
        
    
    
    

    