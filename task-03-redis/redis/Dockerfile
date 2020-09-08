FROM redis

COPY conf/redis.conf /redis.conf
CMD ["redis-server","/redis.conf","--bind","0.0.0.0", "--port","6379"]