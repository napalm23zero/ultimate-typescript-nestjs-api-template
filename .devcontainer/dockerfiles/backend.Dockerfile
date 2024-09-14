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
FROM node:22-slim

# Who’s the boss? 
LABEL maintainer="Rodrigo Dantas" 
LABEL email="rodrigo.dantas@hustletech.dev"

# Get the essentials, because we like to keep it clean
RUN apt-get update && \
    apt-get install -y git curl lsof procps && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Setting up a workspace, project must have aspecial place to live
WORKDIR /workspace

# Install the NestJS CLI globally, because this is a NestJS project, duh!
RUN npm install -g @nestjs/cli

# This is the port what you want to expose to the outside world
EXPOSE 3000 

# We use this because this is a devcontainer, and you don’t want the container to exit
CMD ["tail", "-f", "/dev/null"]