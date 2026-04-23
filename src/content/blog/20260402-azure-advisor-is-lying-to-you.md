---
title: "Your Azure Advisor Score Is Lying to You"
date: 2026-04-02T00:00:00Z
permalink: azure-advisor-is-lying-to-you
description: "Azure Advisor catches some cost issues but misses orphaned disks, deallocated VM waste, and stale reservations. Here's what to check manually to find the money Advisor leaves on the table."
summary: "Azure Advisor is a good starting point for cost optimization, but it misses entire categories of waste. Here's what it catches, what it doesn't, and the manual checks that fill the gaps."
excerpt: "Advisor flagged two right-sizing opportunities but completely missed $525/mo in orphaned and deallocated disk waste sitting right next to them."
tags:
  - azure
  - cost-optimization
  - azure-advisor
categories:
  - Azure
---

Let's be honest. Most of us check Azure Advisor once, feel good about our score, and then don't think about it for six months. I was guilty of this too. Then I actually sat down and did a proper cost audit, and the results were... educational.

Azure Advisor found some real savings. It also missed a lot of money sitting on the floor.

## What Advisor Got Right

Advisor flagged two VMs for right-sizing. Both were legitimate recommendations:

**Our logging server** was running a Standard_E8s_v6 (8 vCPUs, 64GB RAM). Advisor said to drop to E4s_v6 based on 7-day P95 utilization. CPU was at 34% peak, memory at 10%. That's an overprovisioned box. We resized it and saved $212/mo immediately.

Advisor also flagged an unattached managed disk. Knew the name, the resource group, the SKU. Medium impact. Fair enough.

And it had reserved instance recommendations. Fifteen of them, actually. We'll come back to that.

## What Advisor Completely Missed

In the same subscription, sitting in the same resource groups, Advisor didn't flag any of these:

**Three deallocated VMs burning $57/mo in disk costs.** These VMs were stopped. Not running. But their managed disks were still billing us. Advisor doesn't look at deallocated VMs as a cost problem. It only evaluates running VMs for right-sizing. If the VM is off, Advisor doesn't care about its disks.

**A GPU VM that probably doesn't need to be a GPU VM.** We have a Standard_NV16as_v4 running as a tools box. That's a $714/mo GPU-accelerated VM with an AMD Radeon Instinct MI25. If it's just being used for remote desktop, a D4as_v4 at $140/mo does the same job. Advisor didn't flag this because the VM was "utilized" in the sense that it was on and doing things. It doesn't ask *what* it's doing or whether the SKU matches the workload.

**Twelve failed and cancelled reservation orders.** Our reservation list had 15 entries. Only 3 were active. Five had failed provisioning. Four were cancelled. Advisor was still recommending new reserved instances without acknowledging the graveyard of old ones.

## The Gaps Are Structural

This isn't an Advisor bug. It's a scope limitation. Here's the mental model:

| What Advisor Checks | What Advisor Misses |
|---|---|
| Running VM utilization | Deallocated VM disk costs |
| Unattached managed disks | Whether a VM SKU matches its workload |
| Reserved instance opportunities | Failed/stale reservation cleanup |
| Right-sizing recommendations | Workload-appropriate SKU selection |

Advisor answers "is this resource efficient?" It doesn't answer "should this resource exist?"

## The Manual Checks That Fill the Gap

I run these every month now. Takes about 15 minutes total.

### 1. Find deallocated VMs and their disks

```bash
# Deallocated VMs
az vm list -d --query "[?powerState=='VM deallocated'].{Name:name, RG:resourceGroup, Size:hardwareProfile.vmSize}" -o table

# Disks attached to stopped VMs
az disk list --query "[?diskState=='Reserved'].{Name:name, RG:resourceGroup, SizeGB:diskSizeGb}" -o table
```

If a VM has been deallocated for more than 60 days, it's probably safe to delete. Snapshot the disk first if you're nervous.

### 2. Find unattached disks (Advisor catches *some* of these)

```bash
az disk list --query "[?diskState=='Unattached'].{Name:name, RG:resourceGroup, SizeGB:diskSizeGb, SKU:sku.name}" -o table
```

### 3. Audit your reservation inventory

```bash
# List all reservation orders
az rest --method get --url "https://management.azure.com/providers/Microsoft.Capacity/reservationOrders?api-version=2022-11-01" --query "value[].name" -o tsv
```

Then check each one for status. You might be surprised how many are failed, cancelled, or expired. Clean house before buying new ones.

### 4. Question every GPU and specialty VM

Filter your VM list for NV, NC, ND, and other GPU-series SKUs:

```bash
az vm list -d --query "[?contains(hardwareProfile.vmSize,'NV') || contains(hardwareProfile.vmSize,'NC')].{Name:name, Size:hardwareProfile.vmSize, State:powerState}" -o table
```

For each one, ask: does this workload actually need a GPU? Remote desktop doesn't. Dev tools don't. If the answer is "we provisioned it years ago and never changed it," that's a right-sizing candidate Advisor will never catch.

## The Results

Between what Advisor found and what it missed, our 30-minute audit turned up $737/mo in savings. $8,844/yr. Advisor was responsible for about $212 of that. The other $525 was hiding in plain sight.

| Source | Found By | Savings |
|---|---|---|
| Logging server right-size | Advisor | $212/mo |
| Orphaned data disk | Manual check | $468/mo |
| Deallocated VM disks | Manual check | $57/mo |
| **Total** | | **$737/mo** |

And we still have a $714/mo GPU VM to investigate. Advisor thinks it's fine.

## Don't Trust the Score

Azure Advisor is a good *starting point*. It catches real issues and the right-sizing recommendations are usually solid. But if you're relying on it as your only cost optimization strategy, you're leaving money on the table.

Run the manual checks. Question the SKUs. Audit your reservations. The stuff Advisor misses tends to be the stuff that's been quietly billing you for months.

I'd love to hear what you find in your subscription. Hit me up on X, Bluesky, or LinkedIn.
