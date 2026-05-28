import json
import os
import urllib.request


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта в MAX бот"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    messenger = body.get('messenger', '')
    furniture = body.get('furniture', [])

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }

    token = os.environ['MAX_BOT_TOKEN']
    chat_id = int(os.environ['MAX_CHAT_ID'])

    furniture_text = ', '.join(furniture) if furniture else 'не указано'
    messenger_map = {'max': 'MAX', 'telegram': 'Telegram', 'vk': 'ВКонтакте'}
    messenger_text = messenger_map.get(messenger, messenger or 'не указано')

    text = (
        f"Новая заявка с сайта!\n\n"
        f"Имя: {name}\n"
        f"Телефон: {phone}\n"
        f"Способ связи: {messenger_text}\n"
        f"Интересует: {furniture_text}"
    )

    url = f"https://botapi.max.ru/messages?access_token={token}"
    payload = json.dumps({
        "recipient": {"chat_id": chat_id},
        "message": {"text": text}
    }).encode('utf-8')

    req = urllib.request.Request(
        url,
        data=payload,
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    with urllib.request.urlopen(req) as resp:
        resp.read()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }
