headers = {
    'Origin': 'https://catering.zesty.com',
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Accept-Language': 'en-US,en;q=0.8,nl;q=0.6,ru;q=0.4,de;q=0.2',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
    'Accept': 'application/json; version=2',
    'Referer': 'https://catering.zesty.com/',
    'Connection': 'keep-alive',
    'X-HASTY-API-KEY': '7f2e945f9eef4527ee6aa2be0a130718',
    'Cache-Control': 'max-age=0',
}

requests.get('https://api.hastyapp.com/catering_clients/54d43eabe6159099b10002e4', headers=headers)
