import json
import os
import smtplib
import urllib.request
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import psycopg2


def send_email(name: str, phone: str, contact_method: str, furniture: str):
    password = os.environ.get('EMAIL_PASSWORD', '')
    if not password:
        return
    email = 'msm.nk42@yandex.ru'
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта: {name}'
    msg['From'] = email
    msg['To'] = email
    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:500px;padding:24px;border:1px solid #e5e5e5">
      <h2 style="margin:0 0 16px;font-size:20px">Новая заявка с сайта</h2>
      <p style="margin:8px 0"><b>Имя:</b> {name}</p>
      <p style="margin:8px 0"><b>Телефон:</b> {phone}</p>
      <p style="margin:8px 0"><b>Мебель:</b> {furniture or 'не указано'}</p>
      <p style="margin:8px 0"><b>Способ связи:</b> {contact_method or 'не указано'}</p>
    </div>
    """
    msg.attach(MIMEText(html, 'html'))
    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login('msm.nk42@yandex.ru', password)
        server.sendmail(email, email, msg.as_string())


def send_max(text: str):
    token = os.environ.get('MAX_BOT_TOKEN', '')
    chat_id = os.environ.get('MAX_CHAT_ID', '')
    if not token or not chat_id:
        return
    url = f'https://botapi.max.ru/messages?access_token={token}'
    data = json.dumps({'recipient': {'chat_id': int(chat_id)}, 'message': {'text': text}}).encode()
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    try:
        urllib.request.urlopen(req, timeout=5)
    except Exception:
        pass


def handler(event: dict, context) -> dict:
    """Сохранение заявок и отправка email-уведомлений на msm.nk42@yandex.ru."""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Session-Id',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    method = event.get('httpMethod', 'GET')
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if method == 'GET':
        cur.execute("SELECT id, name, phone, contact_method, furniture, created_at FROM leads ORDER BY created_at DESC")
        rows = cur.fetchall()
        leads = [
            {'id': r[0], 'name': r[1], 'phone': r[2], 'contact_method': r[3], 'furniture': r[4], 'created_at': r[5].isoformat()}
            for r in rows
        ]
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'leads': leads})}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    contact_method = body.get('contact_method', '').strip()
    furniture_raw = body.get('furniture', '')
    if isinstance(furniture_raw, list):
        furniture = ', '.join(furniture_raw)
    else:
        furniture = str(furniture_raw).strip()

    if not name or not phone:
        cur.close()
        conn.close()
        return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Имя и телефон обязательны'})}

    cur.execute(
        "INSERT INTO leads (name, phone, contact_method, furniture) VALUES (%s, %s, %s, %s) RETURNING id",
        (name, phone, contact_method, furniture)
    )
    lead_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    try:
        send_email(name, phone, contact_method, furniture)
        print("EMAIL OK")
    except Exception as e:
        print(f"EMAIL ERROR: {e}")

    send_max(
        f"Новая заявка с сайта!\n\n"
        f"Имя: {name}\n"
        f"Телефон: {phone}\n"
        f"Мебель: {furniture or 'не указано'}\n"
        f"Связь: {contact_method or 'не указано'}"
    )

    return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'ok': True, 'id': lead_id})}