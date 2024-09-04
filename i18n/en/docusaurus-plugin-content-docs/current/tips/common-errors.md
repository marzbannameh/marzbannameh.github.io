---
sidebar_position: 2
---

# ارورهای متداول

در این قسمت سعی می‌کنیم ارورهای متداولی که اکثرا به خاطر دقت پایین عزیزان هست ور لیست کنیم.

## مسیر اشتباه SSL سرتیفیکت

- همان طور که از تیتر بالا پیداست اگر ارور زیر رو در لاگ مرزبان مشاهده می‌کنین به علت مسیر اشتباه `SSL` سرتیفیکت شماست.

```log
marzban-1 exited with code 0

marzban-1  | INFO  [alembic.runtime.migration] Context impl SQLiteImpl.
marzban-1  | INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
marzban-1  | INFO  [alembic.runtime.migration] Context impl SQLiteImpl.
marzban-1  | INFO  [alembic.runtime.migration] Will assume non-transactional DDL.
```

## ریستارت شدن Xray

- اگر ارور زیر رو توی لاگ مرزبان مشاهده می‌کنین چند احتمال وجود داره.

```log
marzban-marzban-1  | WARNING:  Restarting Xray core...
marzban-marzban-1  | WARNING:  Xray core 1.8.11 started
marzban-marzban-1  | WARNING:  Restarting Xray core...
marzban-marzban-1  | WARNING:  Xray core 1.8.11 started
```

1. داشتن دو اینباند با پورت تکراری

2. درگیر بودن پورت یکی از اینباندها توسط سرویس دیگری روی سرور

3. اشتباه بودن اینباندی که توی `Core` گذاشتین

4. اگر توی `Routing` قسمت `Rules` به صورت زیر باشه همین اتفاق میوفته:

```json
{
     "outboundTag": "sample",
     "domain": []
}
```

- این قسمت `domain` باید توش حداقل یک دامنه باشه یا کلا این بخش و نزارین اگه نیاز ندارین.