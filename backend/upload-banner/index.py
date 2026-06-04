import json
import os
import urllib.request
import boto3


def handler(event: dict, context) -> dict:
    '''Переносит картинки баннера со стороннего сайта на наш CDN'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    sources = [
        ('https://master-mebel42.ru/wp-content/uploads/2022/10/calc-banner-bg-1.jpg',
         'banner/calc-banner-bg-1.jpg', 'image/jpeg'),
        ('https://master-mebel42.ru/wp-content/uploads/2023/04/tablet-kitch.png',
         'banner/tablet-kitch.png', 'image/png'),
    ]

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

    key_id = os.environ['AWS_ACCESS_KEY_ID']
    result = {}
    for url, key, ctype in sources:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = resp.read()
        s3.put_object(Bucket='files', Key=key, Body=data, ContentType=ctype)
        result[key] = f'https://cdn.poehali.dev/projects/{key_id}/bucket/{key}'

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': json.dumps(result),
    }
