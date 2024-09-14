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

# This is the best and most recent version of mysql that I could find (on todays date)
FROM mysql:8.0-debian

# Who's the boss?
LABEL maintainer="Rodrigo Dantas"
LABEL email="rodrigo.dantas@hustletech.dev"

# Because even databases need some modern tools. And hey, why not?
RUN apt-get update && apt-get install -y \
    git curl zip unzip

# Set the working directory just in case
WORKDIR /workspace

# Expose the MySQL default port
EXPOSE 3306

## devcontainers is for fun, so do not use this in production, please!