---
title: "Your Deallocated Azure VMs Are Still Costing You Money"
date: 2026-04-02T00:00:00Z
permalink: deallocated-azure-vms-still-cost-money
description: "Stopping a VM in Azure doesn't stop the billing. Deallocated VMs still pay for managed disks, public IPs, and storage. Here's how to find them and what to do about it."
summary: "Deallocated doesn't mean free. Your stopped Azure VMs are still billing you for managed disks every single month."
excerpt: "I found three deallocated VMs quietly burning $57/mo in disk costs. They'd been sitting there for over a year."
tags:
  - azure
  - cost-optimization
  - virtual-machines
categories:
  - Azure
---

I was doing a cost audit on our Azure subscription last week. The usual stuff. Pull up Advisor, check for orphaned resources, see what's burning money unnecessarily.

I found an unattached disk called `temp-data-export`. Premium V2 SSD, 300GB, sitting in a resource group by itself. $468/mo. It had been there for over a year. Sixteen months of billing for a disk nobody was using. That one hurt.

But here's the one that surprised me more.

## Deallocated Does Not Mean Free

We had three VMs in a deallocated state. Stopped. Not running. No compute charges. I assumed they were costing us nothing.

Wrong.

Every one of those VMs still had managed OS disks attached. And Azure bills you for managed disks whether the VM is running or not. The disk exists, you pay for it. Doesn't matter if nobody has logged into that VM in a year.

Here's what I found:

| VM | SKU | State | Disk Cost |
|---|---|---|---|
| dev-tools-linux | D2s_v3 | Deallocated | ~$19/mo |
| build-agent-02 | D4s_v3 | Deallocated | ~$19/mo |
| test-runner-03 | NV4as_v4 | Deallocated | ~$19/mo |

$57/mo. Not a lot individually, but these VMs had been sitting there doing absolutely nothing. That's $684/year in pure waste. And honestly, I only caught them because I was specifically looking.

## How to Find Your Zombie VMs

One command. That's all it takes:

```bash
az vm list -d --query "[?powerState=='VM deallocated'].{Name:name, ResourceGroup:resourceGroup, Size:hardwareProfile.vmSize}" -o table
```

The `-d` flag is important. Without it, you don't get the power state. Ask me how I know.

Then check what disks those VMs are holding onto:

```bash
az disk list --query "[?diskState=='Reserved'].{Name:name, ResourceGroup:resourceGroup, SizeGB:diskSizeGb, SKU:sku.name}" -o table
```

A disk with `diskState` of `Reserved` means it's attached to a VM that exists but isn't running. You're paying for it, but nobody's using it.

## What to Do About It

You've got two options:

**Option 1: Delete the VM.** If you're sure the VM isn't coming back, just delete it. This releases the managed disk too. If you're nervous, snapshot the disk first, then delete. Snapshots are dramatically cheaper than keeping a full managed disk alive.

**Option 2: Detach and downgrade the disk.** If you might need the data but not the VM, detach the disk and convert it to Standard HDD. You'll go from ~$19/mo to a few bucks.

Here's the thing. If a VM has been deallocated for more than a couple months and nobody's asked about it, it's almost certainly safe to delete. We deleted all three of ours without a second thought.

## The Unattached Disk Problem

While you're at it, check for fully unattached disks too:

```bash
az disk list --query "[?diskState=='Unattached'].{Name:name, ResourceGroup:resourceGroup, SizeGB:diskSizeGb, SKU:sku.name}" -o table
```

That's how we found `temp-data-export`. $468/mo, just sitting there. Premium V2 SSD that wasn't attached to anything. Someone created it for a one-time data migration and never cleaned it up. Temporary disk that became a very expensive permanent fixture.

## The Numbers

In about 30 minutes of poking around, we saved $525/mo:

| Item | Monthly Savings |
|---|---|
| temp-data-export (unattached) | $468 |
| 3 deallocated VM disks | $57 |
| **Total** | **$525/mo ($6,300/yr)** |

And that was just the disk cleanup. We found another $212/mo in right-sizing opportunities on top of that.

## Do This Today

Seriously. Run those two commands. You'll either find nothing and feel good about your subscription hygiene, or you'll find money sitting on the floor.

```bash
# Deallocated VMs
az vm list -d --query "[?powerState=='VM deallocated']" -o table

# Unattached disks
az disk list --query "[?diskState=='Unattached']" -o table
```

Five minutes. I'd bet money you find at least one surprise.

I'd love to hear what you find. Hit me up on X, Bluesky, or LinkedIn.
