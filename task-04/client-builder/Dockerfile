FROM node:12.13.0-alpine

COPY entrypoint/start.sh /start.sh
RUN chmod +x /start.sh

ENTRYPOINT ["/start.sh"]
