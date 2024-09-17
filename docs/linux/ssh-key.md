---
sidebar_position: 3
---

# ساخت SSH Key

- برای ساخت `SSH Key` دستور زیر را در `CMD` ویندوز خود وارد کنید.

```shell
ssh-keygen -b 2048 -t rsa -C "your_username" -f filename
```

- سپس دو فایل در دایرکتوری که در `CMD` مشاهده می‌کنید ایجاد خواهد شد و فایلی که پسوند `Pub` دارد را باید در سایت دیتاسنتر مورد نظر خود وارد کنید همچنین `Private Key` را باید در کلاینت `SSH` خود قرار دهید.


:::note نکته
برای مطالعه توضیحات کامل در خصوص ساخت `SSH Key` این [**مطلب**](https://learn.microsoft.com/en-us/viva/glint/setup/sftp-ssh-key-gen) را دنبال کنید، هر چند توضیحات بالا کفایت می‌کند.
:::
