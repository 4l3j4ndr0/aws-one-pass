import json
import boto3
import re
from urllib.parse import urlparse
ssm_client = boto3.client('ssm')
def build_response(status, data):
    return {
        "statusCode": status,
        "body": json.dumps(data),
        'headers': {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods': 'GET,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers':'Content-Type'
        },
    }
    
def proccess_post_event(body):
    print(body)
    tags = []
    for key, value in body.items():
        if key != "content" and key != "description":
            tags.append({
            "Key": key.upper(),
            "Value": value
        })
            
    ssm_client.put_parameter(
        Name = "/" + body['vault'] + "/" + re.sub(r'\s', '_', body['name']),
        Value = body["content"],
        Type='SecureString',
        Tags = tags
    )
    
    message = "Parameter created success."
    return message

def proccess_put_event(body):
    tags = []
    for key, value in body.items():
        if key != "content" and key != "description" and key != "name":
            tags.append({
            "Key": key.upper(),
            "Value": value
        })
            
    ssm_client.put_parameter(
        Name = "/" + body['vault'] + "/" + re.sub(r'\s', '_', body['name']),
        Value = body["content"],
        Type ='SecureString',
        Overwrite = True
    )
    
    ssm_client.add_tags_to_resource(
        ResourceType="Parameter",
        ResourceId= "/" + body['vault'] + "/" + re.sub(r'\s', '_', body['name']),
        Tags=tags
    )
    
    
    message = "Parameter updated success."
        
    return message
    
def proccess_get_event(params):
    parameters = []
    if params["action"] == "getAll":
        parameters = ssm_client.describe_parameters(MaxResults=50)
    elif params["action"] == "getByFilter":
        parameters = ssm_client.describe_parameters(ParameterFilters=[
            {
                'Key': 'Name',
                'Option': 'Contains',
                'Values': [
                    params['filter'],
                ]
            }
        ])
    elif params['action'] == "getOne":
        parameter = ssm_client.get_parameter(
            Name=params["id"],
            WithDecryption=True
        )
        tags = ssm_client.list_tags_for_resource(
            ResourceType="Parameter",
            ResourceId=parameter["Parameter"]["Name"]
        )
        new_tags = {}
        for item in tags["TagList"]:
            new_tags.update(
                {
                    item["Key"].lower(): item["Value"]
                }
            )
        
    response = [
        {
            "id": item['Name'],
            "vault": item['Name'].split('/')[1],
            "name": item['Name'].split('/')[2].replace("_", " "),
            "updated_at": item["LastModifiedDate"].strftime("%Y-%m-%d %H:%M:%S")
        }
        for item in parameters["Parameters"]
    ] if parameters else {
            "id": parameter['Parameter']["Name"],
            "vault": parameter['Parameter']["Name"].split('/')[1],
            "name": parameter['Parameter']["Name"].split('/')[2].replace("_", " "),
            'content': parameter['Parameter']['Value'],
            "updated_at": parameter['Parameter']["LastModifiedDate"].strftime("%Y-%m-%d %H:%M:%S"),
            **new_tags
        }
    return response

def handler(event, context):
    print(event)
    try:
        method = event['requestContext']['httpMethod']
        if method == 'POST':
            body = event['body'] if isinstance(event['body'], dict) and event['body'] is not None else json.loads(event['body'])
            data = proccess_post_event(body)
        elif method == "PUT":
            body = event['body'] if isinstance(event['body'], dict) and event['body'] is not None else json.loads(event['body'])
            data = proccess_put_event(body)
        elif method == "GET":
            query_params = event['queryStringParameters'] if  event['queryStringParameters'] != None and event['queryStringParameters'] != "None" else None
            data = proccess_get_event(query_params)
        
        return build_response(200, data)
    except Exception as e:
        print(e)
        return build_response(500, "Error to proccess the request")
        
        
    
    
    

    