---
title: 'Powershell: How to recursively delete files based of file extension?'
categories:
  - Development
slug: powershell-how-to-recursively-delete-files-based-of-file-extension
updated: '2016-07-15 14:23:38'
pubDate: 2016-07-15 14:15:43
description: "How do you recursiviely delete files based off file extension in PowerShell?"
---

File this under "took me WAY too long to figure out how to do".

I just finished doing a Git merge, and ran into an issue where my working folder was polluted with .orig files.

I wanted to recursively delete all the .orig files.  That is apparently harder than it sounds, because it took me 15 minutes to figure out the correct command line.

So you don't go fumbling like I did:

```powershell
Get-ChildItem . -recurse -include *.orig | remove-item
```

Replace `.` and `*.orig` accordingly.  Have fun!