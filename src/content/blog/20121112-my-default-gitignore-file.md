---
title: 'My Default .gitignore File'
date: 2012-11-12T10:37:23Z
permalink: base-gitignore
description: 'A comprehensive .gitignore file template for Visual Studio projects and common development artifacts.'
summary: 'A comprehensive .gitignore file template for Visual Studio projects and common development artifacts.'
tags:
  - Git
  - Visual Studio
  - Development
  - Version Control
categories:
  - Development
---

Every time I create a new Git repo, I always have to go look for a previous copy of my .gitignore file.  I thought it would be a great idea to just post it up for all to find, in case they were looking for it.  This particular file is built around Visual Studio projects.

```markdown
# Ignore file for Visual Studio

# use glob syntax

syntax: glob

# Ignore Config files with keys and passwords

#ServiceConfiguration*.cscfg
#Web*.config
#App\*.config

# Ignore Visual Studio files

_.obj #_.exe #_.pdb
_.user
_.aps
_.pch
_.vspscc
_.vshost.\*
_\_i.c
_\_p.c
_.ncb
_.suo
_.tlb
_.tlh
_.bak
_.cache
_.ilk
_.log
_.lib
_.sbr
_.scc
_.orig
UpgradeLog*.*
UpgradeReport*.*
[Bb]in
[Dd]ebug*/
obj/
[Rr]elease*/
\_ReSharper*/
[Tt]est[Rr]esult*
[Bb]uild[Ll]og.\*
_.[Pp]ublish.xml
glob:_.vs10x
\*.ReSharper
[Pp]ublish
[Rr]eleaseFiles
[Cc]sx/
[Bb]ackup1/
[Pp]ackages/

# Mac Files

.DS*Store
\*.DS_Store
.*\*
```
