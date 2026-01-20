---
title: 'My Default .gitignore File'
date: 2012-11-12T10:37:23Z
updated: 2025-01-19T00:00:00Z
permalink: base-gitignore
description: 'A comprehensive .gitignore file template for .NET, Node.js, and modern development projects - updated for 2025.'
summary: 'A comprehensive .gitignore file template for modern development projects - updated for 2025.'
tags:
  - Git
  - Visual Studio
  - Development
  - Version Control
  - dotnet
categories:
  - Development
---

Every time I create a new Git repo, I always have to go look for a previous copy of my .gitignore file. I thought it would be a great idea to just post it up for all to find. This template covers .NET, Node.js, and common development artifacts.

**Update 2025**: I've completely rewritten this for modern development workflows. The original 2012 version had patterns for Visual Studio 2010 - we've come a long way!

## Quick Start

For most projects, I recommend using [gitignore.io](https://gitignore.io) to generate a tailored .gitignore. But here's my default starting point:

```gitignore
# Build outputs
[Bb]in/
[Oo]bj/
[Dd]ebug/
[Rr]elease/
x64/
x86/
build/
dist/
out/

# .NET specific
*.user
*.suo
*.userosscache
*.sln.docstates
*.userprefs
project.lock.json
.vs/
*.nupkg
*.snupkg

# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-store/

# IDE and editors
.idea/
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
*.swp
*.swo
*~

# Environment and secrets
.env
.env.local
.env.*.local
*.local.json
appsettings.Development.json
secrets.json

# OS generated
.DS_Store
.DS_Store?
Thumbs.db
ehthumbs.db
Desktop.ini

# Testing
[Tt]est[Rr]esults/
coverage/
*.coverage
*.coveragexml
.nyc_output/

# Logs
logs/
*.log

# Package managers
packages/
.nuget/

# Temporary files
*.tmp
*.temp
*.bak
*.cache
```

## Why These Patterns?

**Build outputs** (`bin/`, `obj/`, `dist/`): These are generated files that should never be committed. They bloat your repo and cause merge conflicts.

**Environment files** (`.env`): Never commit secrets! Use `.env.example` files to document required variables instead.

**IDE folders** (`.vs/`, `.idea/`): Personal IDE settings shouldn't be shared. Exception: I do commit shared VSCode settings for team consistency.

**Node modules**: At 500MB+, this folder is the reason `node_modules` became a meme. Always ignore it.

## Pro Tips

1. **Use global gitignore** for personal patterns:
   ```bash
   git config --global core.excludesfile ~/.gitignore_global
   ```

2. **Check what's being ignored**:
   ```bash
   git status --ignored
   ```

3. **Stop tracking a file that was already committed**:
   ```bash
   git rm --cached <file>
   ```

For more development tips, check out my PowerShell guide on [recursively deleting files by extension](/powershell-how-to-recursively-delete-files-based-of-file-extension) or learn about [building better connection strings](/building-better-connectionstrings-with-connectionstringbuilder) in .NET.
