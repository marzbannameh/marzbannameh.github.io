---
sidebar_position: 3
---

# انواع گواهی‌های SSL

گواهی‌های SSL دو دسته هستند

## 1. سینگل-دامین

دسته اول که سینگل-دامین هستند یعنی ما برای یک ساب دامین از دامنه اصلی‌مون گواهی SSL می‌سازیم. 

- مثلا: www.MarzbanNameh.xxx 

- در این مثال گواهی SSL ما فقط برای این ساب دامین صدق می‌کنه ولاغیر.


## 2. وایلدکارد

دسته دوم که وایلدکارد هستند به این معناست که گواهی SSL ما برای همه ساب دامین‌ها صدق می‌کنه، مثلا:

- MarzbanNameh.xxx

- MarzbanNameh.xxx.*

## 3. مولتی‌-دامین

- دسته سوم که مولتی‌-دامین هست یک گواهی SSL برای دو یا چند دامنه است که هم میتونه از نوع اول باشه هم از نوع دوم.

- کافیه توی کامند چندتا دامنه رو پشت‌ سر هم بگذارین مثلاً:

```shell
acme.sh --issue -d '*.domain1.xxx'  -d '*.domain2.xxx' -d 'domain3.xxx' --dns dns_cf
```

:::note
آموزش ساخت گواهی SSL بصورت وایلدکارد در [**داکیومنت مرزبان**](https://gozargah.github.io/marzban/fa/examples/wild-card-ssl) وجود دارد.
:::