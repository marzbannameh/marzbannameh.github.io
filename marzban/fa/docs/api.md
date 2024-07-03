   ```yaml ~/Marzban-node/docker-compose.yml
    services:
      marzban-node:
        image: gozargah/marzban-node:latest
        restart: always
        network_mode: host

        volumes:
          - /var/lib/marzban-node:/var/lib/marzban-node
          - /var/lib/marzban:/var/lib/marzban

        environment:
          SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert.pem"
          SERVICE_PROTOCOL: rest
          XRAY_EXECUTABLE_PATH: "/var/lib/marzban/xray-core/xray"

    ```
