FROM node


COPY entrypoint/start.sh  /start.sh 

EXPOSE 3000 3001 3002 9222

RUN chmod +x /start.sh 

ENTRYPOINT ["/start.sh"]
