---
sidebar_position: 2
---

# تغییر پورت SSH 

- در صورتی که فایروال سرور شما روشن است اول پورت مورد نظر را باز کنید.

```shell
sudo ufw allow PORT
```

- سپس با دستور زیر فایل کانفیگ سرویس `SSH` را بازکنید و پورت `22` را که کامنت شده است را با پاک کردن هشتگ اول آن از حالت کامنت در بیاورید و پورت مورد نظر را قرار دهید.

```shell
sudo nano /etc/ssh/sshd_config
```

- در نهایت سرویس `SSH` را ریستارت کنین.

```shell
sudo service ssh restart 
```

:::note نکته
توجه داشته باشید اگر پورت مورد نظر شما در فایروال بسته باشد و شما بدون توجه به این موضوع پورت را تغییر دهید به احتمال زیاد مجبور به `Rebuild` کردن سرور خود خواهید شد مگر آنکه بتوانید از `VNC` استفاده کنید.
:::