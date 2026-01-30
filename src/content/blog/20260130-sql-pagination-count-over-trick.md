---
title: "SQL Server Pagination with COUNT(*) OVER() Window Function"
date: 2026-01-30T00:00:00Z
permalink: sql-pagination-count-over-trick
description: 'Learn how to use COUNT(*) OVER() to get your total row count and paginated data in a single query instead of two separate round-trips.'
summary: 'Stop running two queries for paginated results. Use COUNT(*) OVER() to get everything in one shot.'
excerpt: 'A simple SQL Server trick that eliminates the need for separate count queries when building paginated APIs.'
tags:
  - sql
  - sql-server
  - performance
  - pagination
categories:
  - Development
---

If you've ever built a paginated API endpoint, you've probably written code that looks something like this:

```csharp
// Query 1: Get the total count
var totalCount = await connection.ExecuteScalarAsync<int>(
    "SELECT COUNT(*) FROM Products WHERE Category = @category",
    new { category });

// Query 2: Get the actual page of data
var products = await connection.QueryAsync<Product>(
    @"SELECT Id, Name, Price
      FROM Products
      WHERE Category = @category
      ORDER BY Name
      OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY",
    new { category, offset = (page - 1) * pageSize, pageSize });
```

Two queries. Two round-trips to the database. The same WHERE clause executed twice.

It works, but it's wasteful. And on large tables or complex queries, that waste adds up fast.

## The Fix: COUNT(*) OVER()

SQL Server has a window function that solves this elegantly: `COUNT(*) OVER()`.

When you add this to your SELECT, it calculates the total count of rows that match your WHERE clause *before* pagination is applied — but returns it alongside your paginated data in a single query.

```sql
SELECT
    Id,
    Name,
    Price,
    TotalCount = COUNT(*) OVER()
FROM Products
WHERE Category = @category
ORDER BY Name
OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
```

Every row in your result set now includes a `TotalCount` column with the same value — the total number of matching rows. You grab it from the first row and you're done.

## The C# Side

Here's how you'd consume this with Dapper:

```csharp
var results = (await connection.QueryAsync<dynamic>(sql, parameters)).AsList();

// Every row has the same TotalCount — just grab it from the first one
var totalCount = (int?)results.FirstOrDefault()?.TotalCount ?? 0;

var products = results.Select(r => new Product
{
    Id = r.Id,
    Name = r.Name,
    Price = r.Price
}).ToList();

return new PagedResult<Product>
{
    Items = products,
    TotalCount = totalCount,
    Page = page,
    PageSize = pageSize
};
```

If you prefer strong typing (and you should), create a DTO that includes the count:

```csharp
private record ProductWithCount(int Id, string Name, decimal Price, int TotalCount);

var results = (await connection.QueryAsync<ProductWithCount>(sql, parameters)).AsList();
var totalCount = results.FirstOrDefault()?.TotalCount ?? 0;
var products = results.Select(r => new Product(r.Id, r.Name, r.Price)).ToList();
```

## Why This Matters

| Approach         | Queries | Round-trips | WHERE Evaluated |
|------------------|---------|-------------|-----------------|
| Separate COUNT   | 2       | 2           | Twice           |
| COUNT(*) OVER()  | 1       | 1           | Once            |

For simple queries on small tables, you might not notice the difference. But when you're dealing with:

- Complex WHERE clauses with multiple JOINs
- Large tables with millions of rows
- High-traffic API endpoints
- CTEs or subqueries that are expensive to compute

...that second query execution starts to hurt.

## One Gotcha: Empty Results

When your query returns zero rows, there's no "first row" to grab the count from. That's why the null-coalescing is important:

```csharp
var totalCount = (int?)results.FirstOrDefault()?.TotalCount ?? 0;
```

No results? Total count is zero. Which is exactly correct.

## When NOT to Use This

This technique isn't always the right choice:

1. **When you only need the count** — If you're just checking "are there any results?" without fetching data, a simple `SELECT COUNT(*)` or `EXISTS` is still better.

2. **When count accuracy is critical** — In high-concurrency scenarios, the count might be slightly stale by the time you render the page. For most applications this doesn't matter, but if you need an exact count, consider your isolation level.

3. **When you're returning huge pages** — If your page size is 10,000 rows, you're duplicating that `TotalCount` value 10,000 times over the wire. The overhead is minimal, but it exists.

## The Takeaway

Next time you're building a paginated endpoint and reaching for that separate COUNT query, pause. Add `COUNT(*) OVER()` to your SELECT instead, and cut your database work in half.

It's one of those small optimizations that costs nothing to implement but pays dividends every time the query runs.

## Further Reading

- [OVER Clause (Transact-SQL)](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-over-clause-transact-sql?WT.mc_id=DOP-MVP-4029061) — Microsoft's official documentation on window functions and the OVER clause.
- [How to get total row count from OFFSET / FETCH NEXT](https://raresql.com/2015/03/30/sql-server-how-to-get-total-row-count-from-offset-fetch-next-paging/) — A deep dive into pagination techniques in SQL Server.
- [Using OFFSET and FETCH with Window Functions for Efficient Pagination](https://dev.to/frederik_vl/using-sqls-offset-and-fetch-with-window-functions-for-efficient-pagination-and-total-count-1pki) — A practical walkthrough of combining these techniques.
