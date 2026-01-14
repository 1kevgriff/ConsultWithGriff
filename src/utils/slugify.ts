/**
 * Convert a string to a URL-safe slug
 * Handles special cases like C#, .NET, etc.
 */
export function slugify(str: string): string {
  return (
    str
      .toLowerCase()
      // Handle common programming terms
      .replace(/c#/g, 'csharp')
      .replace(/f#/g, 'fsharp')
      .replace(/\.net/g, 'dotnet')
      .replace(/c\+\+/g, 'cpp')
      // Replace special characters and spaces with hyphens
      .replace(/[^a-z0-9]+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '')
      // Remove consecutive hyphens
      .replace(/-+/g, '-')
  );
}
