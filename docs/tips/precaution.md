---
sidebar_position: 10
---

# پیش از ایجاد تغییرات

- در این بخش راجع به مواردی صحبت می‌کنیم که بهتره قبل از ایجاد هر گونه تغییر مانند آپدیت کردن پنل‌تون و یا تغییر دیتابیس که همیشه امکان وجود درصدی باگ ناشناخته وجود دارد، انجام بدید.

- اول پکیج زیپ را روی سرور خود نصب کنید.

```shell
sudo apt install zip; apt install unzip
```

- خیلی ساده با دستور زیر دایرکتوری‌های مرزبان را زیپ کنید.

```shell
zip -r marzban.zip marzban/
```

- دقت کنید دستور رو باید در دو دایرکتوری `opt` و `/var/lib` وارد کنید. حالا می‌توانید برای آپدیت کردن یا تغییر دیتابیس اقدام کنید و چنانچه با باگی موجه شدین که رفع کردن آن به زمان بیشتری احتیاج داشت خیلی راحت دایرکتوری های مرزبان را پاک کرده و با دستور زیر فایل‌های زیپ را از حالت زیپ در بیاورید.

```shell
unzip marzban.zip
```

🔖 دقت داشته باشید اگر تعداد کاربران شما بالاست و حجم دیتابیس شما بسیار بالاست زیپ کردن دایرکتوری مرزبان در `/var/lib` باعث پر شدن فضای هارد سرور شما خواهد شد، از این رو اول از حجم دایرکتوری مرزبان و فضای خالی هارد سرور خود اطمینان حاصل کنید.

- با دستورهای زیر حجم دایرکتوری‌های مرزبان را ببینید.

```shell
du -sh /opt/marzban
```

```shell
du -sh /var/lib/marzban
```

- همچنین با دستور زیر مشخصات سرور خود را ببینید که فضای خالی هارد سرور شما نیز نمایش داده خواهد شد.

```bash
wget -qO- bench.sh | bash 
```

- اگر فضای کافی در هارد سرور شما وجود دارد با خیال راحت موارد بالا را طی کنید. 

:::note نکته مهم
دقت داشته باشید اگر برای ایجاد تغییرات بعد از زیپ کردن دایرکتوری‌ها همه چیز خوب پیش رفت، فراموش نکنید که فایل‌های زیپ را پاک کنید تا فضای اضافی از سرور پر نشود.  همچنین اگر باگ خاصی پیش اومد و از فایل‌های زیپ استفاده کردین بعد از جایگزین فایل‌ها، فایل‌های زیپ رو پاک کنید.
:::
