---
title: راه‌اندازی همه چیز روی یک پورت
---

# یک پورت برای همه
به کمک این آموزش می‌توانید تمام ارتباطات با سرور خود (پنل، کانفیگ‌های TLSدار و کانفیگ‌های REALITY) را از طریق یک (یا دو) پورت انجام دهید.
هدف از این کار، طبیعی‌تر شدن ارتباطات سرور، دور زدن محدودیت‌های روی یک پورت یا مواردی از این دست است.


::: tip نکته
اگر پورت پنل خود را در طی زمان عوض کرده‌اید و می‌خواهید لینک‌های سابسکریپشن قبلی همچنان کار کنند هم می‌توانید با این آموزش، HAProxy را روی پورت قدیمی listen کرده و ترافیک ورودی را به پورت لوکال جدید بفرستید تا هر دو لینک سابسکریپشن کار کنند. برای این کار فقط کافیست پورت قبلی خود هم مثل پورت ۴۴۳ اضافه کنید.
:::


ما در این آموزش از ابزار HAProxy برای رسیدن به هدف خود استفاده می‌کنیم. در ادامه آموزش، فرض می‌شود که ساب‌دامنه‌ی پنل panel.example.com،
ساب‌دامنه‌ی مربوط به کانفیگ‌های TLSدار sub.example.com و آدرس SNI استفاده شده در کانفیگ ریلیتی reality.com است.

پس در ادامه‌ی این آموزش ابتدا HAProxy را نصب و پیکربندی کرده و سپس تغییرات لازم را در کانفیگ‌ها و پنل ایجاد می‌کنیم تا تمام ترافیک را روی یک پورت قبول کنند. در آخر هم برخی نکات اضافی آمده است.


::: warning توجه
چنان‌چه قبلا از HAProxy برای گرفتن SSL برای پنل خود استفاده کرده‌اید، باید از یک روش دیگر (پیشنهاد ما UNIVCORN) برای پنل SSL بگیرید تا با این تنظیمات تداخل پیدا نکند
:::


## نصب و پیکربندی HAProxy

::: tip نکته
ما در این آموزش HAProxy را به صورت مستقیم روی سرور نصب می‌کنیم؛ چنانچه تمایل داشتید می‌توانید خودتان آن را در داکر هم نصب کنید.

همچنین اگر در آینده قصد اعمال ruleهای پیچیده‌تر خواهید داشت، فراموش نکنید که HAProxy را از مخزن اصلی خود نصب کنید و نه از مخازن لینوکس.
:::


ابتدا برای نصب دستورات زیر را بزنید:

```bash
apt update
apt install -y haproxy
```

پس از نصب، فایل پیکربندی HAProxy در آدرس `/etc/haproxy/haproxy.cfg` قرار می‌گیرد. این فایل را با `nano` برای ویرایش باز کنید.

حال، پیکربندی زیر را پس از تغییر طبق توضیحات به انتهای فایل پیکربندی اضافه کرده و سیو کنید.


::: code-group
```[haproxy.cfg]
listen front
 mode tcp
 bind *:443

 tcp-request inspect-delay 5s
 tcp-request content accept if { req_ssl_hello_type 1 }

 use_backend panel if { req.ssl_sni -m end panel.example.com }
 use_backend reality if { req.ssl_sni -m end reality.com }
 default_backend fallback

backend panel
 mode tcp
 server srv1 127.0.0.1:10000

backend fallback
 mode tcp
 server srv1 127.0.0.1:11000

backend reality
 mode tcp
 server srv1 127.0.0.1:12000 send-proxy

```
:::


پیکربندی‌های HAProxy شامل یک یا چند frontend و یک یا چند backend هستند. هر frontend بر اساس قوانینی که در آن تعریف می‌شود ترافیک را به سمت یکی از backendها می‌فرستد. فهم این دو بخش در پیکربندی بهتر HAProxy به ما کمک می‌کند.

با دقت در این پیکربندی می‌توانید متوجه شوید که با آن، HAProxy بر روی پورت ۴۴۳ سرور گوش داده و تمام ترافیک را دریافت می‌کند. سپس بر اساس sni ترافیک دریافتی، آن را روی یک پورت «لوکال» سرور فوروارد می‌کند و از این طریق می‌توانیم بین ترافیک‌های مختلف تفاوت قائل شویم.


::: tip نکته
در این پیکربندی یک backend پیش‌فرض با استفاده از default_backend تعریف شده است که اگر ترافیک ورودی مربوط به هر چیزی بجز دو sni تعریف شده بود، آن را به این backend می‌فرستد. شما می‌توانید این تکه از کد را بردارید تا ترافیک‌های غیر از sniهای مشخص شده مسدود شوند.
:::

پس از جای‌گذاری دامنه‌های خود و قراردادن این پیکربندی در انتهای فایل گفته شده، با دستور زیر HAProxy را ریستارت کرده تا کار ما با آن در این مرحله تمام شود.

```bash
systemctl restart haproxy
```

## آماده‌سازی کانفیگ‌ها
### آماده‌سازی کانفیگ REALITY
 فرض کنید که شما می‌خواهید چند اینباند مختلف برای هر نود خود یا چند اینباند مختلف با sniهای مختلف داشته باشید. اگر صرفاً این اینباندها را زیر هم قرار داده و پورت آن‌ها را یکسان کنید، اتصال با اختلال روبرو می‌شود و عملا امکان برقراری ارتباط وجود ندارد.

 تک پورت کردن کانفیگ‌ها این مشکل را حل می‌کند. برای این کار، تنظیمات کانفیگ‌های خود را باید به شکل زیر تغییر دهید (به خط‌های ۳ و ۴ و ۱۳ توجه کنید):

::: code-group
```json{3-4,13} [xray_config.json]
{
  "tag": "VLESS_TCP_REALITY",
  "listen": "127.0.0.1",
  "port": 12000,
  "protocol": "vless",
  "settings": {
    "clients": [],
    "decryption": "none"
  },
  "streamSettings": {
    "network": "tcp",
    "tcpSettings": {
      "acceptProxyProtocol": true
    },
    "security": "reality",
    "realitySettings": {
      "show": false,
      "dest": "x",
      "xver": 0,
      "serverNames": [
        "reality.com"
      ],
      "privateKey": "x",
      "shortIds": [
        ""
      ]
    }
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls"
    ]
  }
}
```
:::


با این تغییرات، اینباند شما بجای گوش دادن روی 0.0.0.0، روی 127.0.0.1 یا همان لوکال، گوش می‌دهد و می‌توانید هر تعداد اینباند که می‌خواهید به این شکل ساخته (با پورت‌های لوکال متفاوت) و در HAProxy براساس sni بین آن‌ها تفکیک قائل شوید.

### آماده‌سازی کانفیگ‌های TLSدار
برای اینکه تمام انواع کانفیگ‌های TLSدار را روی یک پورت داشته باشیم، از فالبک استفاده می‌کنیم (اگر پیش از این از فالبک برای تک‌پورت کردن استفاده کرده‌اید، این مرحله را بگذرید و فقط پورت کانفیگ فالبک خود را با HAProxy یکسان کنید)

ما ابتدا به یک اینباند فالبک نیاز داریم. به این منظور می‌توانید از اینباند زیر به عنوان نمونه استفاده کنید:

::: code-group
```json{3-4,13} [xray_config.json]
{
    "tag": "TROJAN_FALLBACK_INBOUND",
    "port": 11000,
    "protocol": "trojan",
    "settings": {
        "clients": [],
        "decryption": "none",
        "fallbacks": [
            {
                "path": "/lw",
                "dest": "@vless-ws",
                "xver": 2
            },
            {
                "path": "/mw",
                "dest": "@vmess-ws",
                "xver": 2
            },
            {
                "path": "/tw",
                "dest": "@trojan-ws",
                "xver": 2
            }
        ]
    },
    "streamSettings": {
        "network": "tcp",
        "security": "tls",
        "tlsSettings": {
            "serverName": "SERVER_NAME",
            "certificates": [
                {
                    "ocspStapling": 3600,
                    "certificateFile": "/var/lib/marzban/certs/fullchain.pem",
                    "keyFile": "/var/lib/marzban/certs/key.pem"
                }
            ],
            "minVersion": "1.2",
            "cipherSuites": "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
            "alpn": [
                "http/1.1"
            ]
        }
    },
    "sniffing": {
        "enabled": true,
        "destOverride": [
            "http",
            "tls"
        ]
    }
},
```
:::


برای استفاده‌ی بهتر از این امکان، خوب است مفهوم و کارکرد آن را یاد بگیریم. فالبک به‌طور کلی به این صورت عمل می‌کند که اگر ترافیک ورودی مطابق با این اینباند بود آن را قبول کرده و اگر نبود، برحسب path آن را به دیگر اینباندها می‌دهد. پس، بعد از قرار دادن اینباند بالا با فالبک، حال چند اینباند دیگر هریک با path گفته شده در اینباند فالبک تعریف می‌کنیم (اگر از قبل چنین اینباندهایی دارید کافی‌ست مقدار listen آن‌ها را فقط به مقدارهای تعریف‌شده (@vless-ws و @vmess-ws و @trojan-ws) تغییر داده و path آن‌ها هم در اینباند فالبک قرار دهید.

پس اینباند فالبک براساس path هریک از ترافیک‌های ورودی را به سمت دیگر اینباندها می‌فرستد:

```
path = /lw     ->    listen: "@vless-ws"
path = /mw     ->    listen: "@vmess-ws"
path = /tw     ->    listen: "@trojan-ws"
```

پس طبق مثال بالا کافی‌ست بخش‌های listen و path اینباندهای خود را با فالبک همسان کنید تا تمام کانفیگ‌ها روی یک پورت اجرا شوند.


::: tip نکته
استفاده از فالبک، بار پردازشی سرور را افزایش می‌دهد. شما می‌توانید برای هر کانفیگ خود یک ساب دامنه متفاوت تعیین کرده و با استفاده از همان HAProxy و بدون نیاز به فالبک، کانفیگ‌های TLSدار را هم تک‌پورت کنید.
:::


::: warning توجه
توجه کنید که در اینباندهایی که مقدار listen آن‌ها به شکل @xxx هست و در فالبک استفاده شده‌اند، خط مربوط به port را پاک کنید
:::


حال اگر با استفاده از این روش فالبک اینباندها را تک‌پورت کرده‌اید، وارد فایل `.env` شده و متغیر زیر را مساوی با تگ اینباند فالبک خود قرار دهید:

```
XRAY_FALLBACKS_INBOUND_TAG = "TROJAN_FALLBACK_INBOUND"
```

## آماده‌سازی پنل
همان‌طور که گفته شد هدف ما داشتن تمام ارتباطات از جمله پنل (لینک سابسکریپشن) بر روی یک پورت است. پیش‌تر تنظیمات مربوط به پنل را در پیکربندی HAProxy وارد کردیم و در این مرحله کافیست تا پورتی که پنل روی آن گوش می‌دهد را با HAProxy همسان کنیم. پس برای اینکار کافی‌ست با ویرایش فایل `.env` متغیرهای زیر را برابر با مقدار تعریف‌شده (یا هرچیزی که در HAProxy وارد کرده‌اید) کنید:


```
UVICORN_HOST = "127.0.0.1"
UVICORN_PORT = 10000
```


حال مرزبان را ریستارت کنید:

```bash
marzban restart
```

## آماده‌سازی هاست ستینگز
چون پورتی که در اینباند قرار داده‌اید یک پورت لوکال بوده و در اصل تمام ترافیک از پورت ۴۴۳ به سرور شما می‌رسد، لازم است که در قسمت هاست ستینگز کانفیگ‌هایی که ساخته‌اید خودتان پورت را به ۴۴۳ تغییر دهید وگرنه به صورت پیش‌فرض پورت‌های لوکال برای کانفیگ‌ها تعیین می‌شود.

## نکات جانبی:
::: warning توجه
تنظیمات مربوط به HAProxy باید در تمام سرورهای نود هم انجام شوند، یا اینکه می‌توانید برای برخی سرورهای نود اینباند جدا تعریف کرده و مستقیم روی `0.0.0.0` لیسن کنید.
:::


::: tip توجه
در پیکربندی قرارداده‌شده برای HAProxy تمام ترافیکی که با یکی از sniهای panel.example.com و reality.com هم‌خوانی نداشته باشد به سمت اینباند فالبک منتقل می‌شود و در نتیجه با اینکار جلوی سواستفاده از آی‌پی شما به عنوان آی‌پی تمیز کلادفلر گرفته می‌شود
:::


::: warning هشدار
چنان‌چه از محدودکننده‌ی آی‌پی استفاده می‌کنید، باید عبارت `send-proxy` را در انتهای هر سرور backend از HAProxy اضافه کنید و همچنین مقدار `"acceptProxyProtocol": true` را در کانفیگ اینباند خود، مطابق نمونه‌ی قرارداده‌شده برای REALITY در بالا قرار دهید. اگر کانفیگی `send-proxy` داشته ولی `"acceptProxyProtocol": true` نداشته باشد متصل نمی‌شود.
:::

