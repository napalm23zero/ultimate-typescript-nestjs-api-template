# ┌─────────────────────────────────────┐
# │  The Dark Side of Devcontainers     │
# │                                     │
# │  For dev and study use ONLY.        │
# │  Deploy this to production?         │
# │  I will personally find you,        │
# │  and trust me, you won’t like it.   │
# │                                     │
# │  *You've been warned, apprentice.*  │
# └─────────────────────────────────────┘

# If you’re gonna cache, do it right with Redis 6.2, Alpine style because minimalism is key
FROM redis:6.2-alpine

# Guess who's in charge of this madness...
LABEL maintainer="Rodrigo Dantas"
LABEL email="rodrigo.dantas@hustletech.dev"

# Make sure Redis doesn't throw a fit if it can't find the config, so let's create one
RUN mkdir -p /usr/local/etc/redis/ && \
    echo "Creating default redis.conf" && \
    echo "bind 0.0.0.0" > /usr/local/etc/redis/redis.conf

# Set the workspace directory, even though Redis won't really care
WORKDIR /workspace

# Start Redis like a true Sith Lord, with a password because we’re not just handing out cache to everyone
CMD ["redis-server", "/usr/local/etc/redis/redis.conf", "--requirepass", "darkSideRedis"]

# We like sharing, but only through the right channel. Exposing the default Redis port
EXPOSE 6379

## devcontainers is for fun, so do not use this in production, please!
