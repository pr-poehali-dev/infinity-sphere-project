import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту msm.nk42@yandex.ru"""

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

    email_from = 'msm.nk42@yandex.ru'
    email_to = 'msm.nk42@yandex.ru'
    password = os.environ['EMAIL_PASSWORD']

    furniture_text = ', '.join(furniture) if furniture else 'не указано'
    messenger_map = {'max': 'MAX', 'telegram': 'Telegram', 'vk': 'ВКонтакте'}
    messenger_text = messenger_map.get(messenger, messenger or 'не указано')

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a1a; border-bottom: 2px solid #ffa800; padding-bottom: 10px;">
        Новая заявка с сайта — Кухни на заказ
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 10px; color: #666; width: 40%;">Имя:</td>
          <td style="padding: 10px; font-weight: bold; color: #1a1a1a;">{name}</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 10px; color: #666;">Телефон:</td>
          <td style="padding: 10px; font-weight: bold; color: #1a1a1a;">
            <a href="tel:{phone}" style="color: #ffa800;">{phone}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; color: #666;">Способ связи:</td>
          <td style="padding: 10px; font-weight: bold; color: #1a1a1a;">{messenger_text}</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 10px; color: #666;">Интересует:</td>
          <td style="padding: 10px; color: #1a1a1a;">{furniture_text}</td>
        </tr>
      </table>
      <p style="margin-top: 24px; color: #999; font-size: 12px;">
        Заявка отправлена с сайта мастерской современной мебели
      </p>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка: {name} — {phone}'
    msg['From'] = email_from
    msg['To'] = email_to
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(email_from, password)
        server.sendmail(email_from, email_to, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }
