#!/bin/bash

# Set up Git, because we’re not anonymous hackers.
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Git buffer size — bigger is better, right?
git config --global http.postBuffer 1048576000

# Fire up the SSH agent, like summoning your digital minions.
eval "$(ssh-agent -s)"

# Add your private key — don’t leave home without it.
chmod 600 /workspace/.devcontainer/github-ssh-key
ssh-add /workspace/.devcontainer/github-ssh-key

# Install Node dependencies automatically, because who has time for `npm install`?
if [ -f "package.json" ]; then
  npm install
fi

# 📝 Instructions:
# 1. Replace "Your Name" and "your.email@example.com" with your actual info.
# 2. Drop your private key in /workspace/.devcontainer/, and rename 'github-ssh-key' as needed.
# 3. Make sure your key's permissions are good (chmod 600).
# 4. This runs each time the container starts. You’re welcome.
