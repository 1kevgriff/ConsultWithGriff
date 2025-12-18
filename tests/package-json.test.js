import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

describe('package.json validation', () => {
  let packageJson;

  test('should exist and be readable', async () => {
    const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
    assert.ok(content, 'package.json should be readable');
    packageJson = JSON.parse(content);
  });

  test('should be valid JSON', async () => {
    const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
    assert.doesNotThrow(() => {
      packageJson = JSON.parse(content);
    }, 'package.json should be valid JSON');
  });

  describe('required fields', () => {
    test('should have a name field', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      assert.ok(packageJson.name, 'package.json should have a name field');
      assert.strictEqual(typeof packageJson.name, 'string', 'name should be a string');
    });

    test('should have a valid name', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      assert.strictEqual(packageJson.name, 'tidal-transit', 'package name should be tidal-transit');
      assert.match(packageJson.name, /^[a-z0-9-]+$/, 'package name should be lowercase with hyphens');
    });

    test('should have a version field', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      assert.ok(packageJson.version, 'package.json should have a version field');
      assert.strictEqual(typeof packageJson.version, 'string', 'version should be a string');
    });

    test('should have a valid semver version', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      const semverRegex = /^\d+\.\d+\.\d+(-[\w.]+)?(\+[\w.]+)?$/;
      assert.match(packageJson.version, semverRegex, 'version should follow semver format');
    });

    test('should have a type field for ES modules', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      assert.ok(packageJson.type, 'package.json should have a type field');
      assert.strictEqual(packageJson.type, 'module', 'type should be "module" for ES modules');
    });
  });

  describe('scripts validation', () => {
    test('should have a scripts object', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      assert.ok(packageJson.scripts, 'package.json should have a scripts field');
      assert.strictEqual(typeof packageJson.scripts, 'object', 'scripts should be an object');
    });

    test('should have required build scripts', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      const requiredScripts = ['dev', 'build', 'preview'];
      
      for (const script of requiredScripts) {
        assert.ok(packageJson.scripts[script], `should have ${script} script`);
      }
    });

    test('should have astro-related scripts', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      assert.ok(packageJson.scripts.dev.includes('astro'), 'dev script should use astro');
      assert.ok(packageJson.scripts.build.includes('astro'), 'build script should use astro');
      assert.ok(packageJson.scripts.preview.includes('astro'), 'preview script should use astro');
    });

    test('should have code quality scripts', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      assert.ok(packageJson.scripts.format, 'should have format script');
      assert.ok(packageJson.scripts['format:check'], 'should have format:check script');
      assert.ok(packageJson.scripts.lint, 'should have lint script');
      assert.ok(packageJson.scripts['lint:fix'], 'should have lint:fix script');
      assert.ok(packageJson.scripts['type-check'], 'should have type-check script');
    });

    test('should have custom utility scripts', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      assert.ok(packageJson.scripts['migrate:content'], 'should have migrate:content script');
      assert.ok(packageJson.scripts['validate:images'], 'should have validate:images script');
      assert.ok(packageJson.scripts['generate:search'], 'should have generate:search script');
    });

    test('utility scripts should reference correct files', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      assert.ok(
        packageJson.scripts['migrate:content'].includes('scripts/migrate-content.js'),
        'migrate:content should reference correct script file'
      );
      assert.ok(
        packageJson.scripts['validate:images'].includes('scripts/validate-images.js'),
        'validate:images should reference correct script file'
      );
      assert.ok(
        packageJson.scripts['generate:search'].includes('scripts/generate-search-index.js'),
        'generate:search should reference correct script file'
      );
    });

    test('all script values should be non-empty strings', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      for (const [name, script] of Object.entries(packageJson.scripts)) {
        assert.strictEqual(typeof script, 'string', `script ${name} should be a string`);
        assert.ok(script.trim().length > 0, `script ${name} should not be empty`);
      }
    });
  });

  describe('dependencies validation', () => {
    test('should have dependencies object', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      assert.ok(packageJson.dependencies, 'package.json should have dependencies');
      assert.strictEqual(typeof packageJson.dependencies, 'object', 'dependencies should be an object');
    });

    test('should include astro framework', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      assert.ok(packageJson.dependencies.astro, 'should include astro dependency');
    });

    test('should have correct astro version', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      assert.strictEqual(packageJson.dependencies.astro, '^5.16.4', 'astro should be version ^5.16.4');
    });

    test('should include tailwindcss', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      assert.ok(packageJson.dependencies.tailwindcss, 'should include tailwindcss');
      assert.ok(packageJson.dependencies['@tailwindcss/vite'], 'should include @tailwindcss/vite');
    });

    test('should include remark and rehype plugins', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      const remarkPlugins = [
        'remark-gfm',
        'remark-external-links',
        'remark-frontmatter',
        'remark-youtube'
      ];
      
      const rehypePlugins = [
        'rehype-slug',
        'rehype-autolink-headings',
        'rehype-shiki'
      ];
      
      for (const plugin of remarkPlugins) {
        assert.ok(packageJson.dependencies[plugin], `should include ${plugin}`);
      }
      
      for (const plugin of rehypePlugins) {
        assert.ok(packageJson.dependencies[plugin], `should include ${plugin}`);
      }
    });

    test('all dependency versions should be valid', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      const versionRegex = /^[\^~]?\d+\.\d+\.\d+(-[\w.]+)?$/;
      
      for (const [name, version] of Object.entries(packageJson.dependencies)) {
        assert.match(
          version,
          versionRegex,
          `${name} should have a valid semver version: ${version}`
        );
      }
    });

    test('should not have duplicate dependencies in devDependencies', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      const deps = Object.keys(packageJson.dependencies);
      const devDeps = Object.keys(packageJson.devDependencies || {});
      const duplicates = deps.filter(dep => devDeps.includes(dep));
      
      assert.strictEqual(
        duplicates.length,
        0,
        `Dependencies should not be duplicated in devDependencies: ${duplicates.join(', ')}`
      );
    });
  });

  describe('devDependencies validation', () => {
    test('should have devDependencies object', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      assert.ok(packageJson.devDependencies, 'package.json should have devDependencies');
      assert.strictEqual(typeof packageJson.devDependencies, 'object', 'devDependencies should be an object');
    });

    test('should include typescript', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      assert.ok(packageJson.devDependencies.typescript, 'should include typescript');
    });

    test('should include eslint', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      assert.ok(packageJson.devDependencies.eslint, 'should include eslint');
    });

    test('should have correct eslint version', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      assert.strictEqual(packageJson.devDependencies.eslint, '^9.39.1', 'eslint should be version ^9.39.1');
    });

    test('should include astro-specific dev tools', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      assert.ok(packageJson.devDependencies['@astrojs/check'], 'should include @astrojs/check');
      assert.ok(packageJson.devDependencies['eslint-plugin-astro'], 'should include eslint-plugin-astro');
    });

    test('should include prettier', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      assert.ok(packageJson.devDependencies.prettier, 'should include prettier');
      assert.ok(packageJson.devDependencies['prettier-plugin-astro'], 'should include prettier-plugin-astro');
    });

    test('all devDependency versions should be valid', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      const versionRegex = /^[\^~]?\d+\.\d+\.\d+(-[\w.]+)?$/;
      
      for (const [name, version] of Object.entries(packageJson.devDependencies)) {
        assert.match(
          version,
          versionRegex,
          `${name} should have a valid semver version: ${version}`
        );
      }
    });
  });

  describe('version consistency checks', () => {
    test('should have matching tailwindcss versions', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      const tailwindVersion = packageJson.dependencies.tailwindcss;
      const tailwindViteVersion = packageJson.dependencies['@tailwindcss/vite'];
      
      assert.strictEqual(
        tailwindVersion,
        tailwindViteVersion,
        'tailwindcss and @tailwindcss/vite should have matching versions'
      );
    });

    test('should use caret ranges for most dependencies', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };
      
      let caretCount = 0;
      let totalCount = 0;
      
      for (const version of Object.values(allDeps)) {
        if (version.startsWith('^')) {
          caretCount++;
        }
        totalCount++;
      }
      
      const caretPercentage = (caretCount / totalCount) * 100;
      assert.ok(
        caretPercentage > 50,
        `Most dependencies should use caret (^) ranges. Found ${caretPercentage.toFixed(1)}%`
      );
    });
  });

  describe('JSON formatting', () => {
    test('should be properly formatted with 2-space indentation', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      const parsed = JSON.parse(content);
      const formatted = JSON.stringify(parsed, null, 2) + '\n';
      
      assert.strictEqual(
        content,
        formatted,
        'package.json should be formatted with 2-space indentation and trailing newline'
      );
    });

    test('should not have trailing commas', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      assert.ok(!content.includes(',\n}'), 'should not have trailing commas before closing braces');
      assert.ok(!content.includes(',\n]'), 'should not have trailing commas before closing brackets');
    });
  });

  describe('edge cases and error handling', () => {
    test('should not have empty dependency objects', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      if (packageJson.dependencies) {
        assert.ok(
          Object.keys(packageJson.dependencies).length > 0,
          'dependencies object should not be empty if present'
        );
      }
      
      if (packageJson.devDependencies) {
        assert.ok(
          Object.keys(packageJson.devDependencies).length > 0,
          'devDependencies object should not be empty if present'
        );
      }
    });

    test('should not have wildcard or latest versions', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };
      
      for (const [name, version] of Object.entries(allDeps)) {
        assert.ok(
          version !== '*' && version !== 'latest',
          `${name} should not use wildcard or 'latest' version`
        );
      }
    });

    test('should not have git URLs in dependencies', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };
      
      for (const [name, version] of Object.entries(allDeps)) {
        assert.ok(
          !version.includes('git+'),
          `${name} should not use git URLs: ${version}`
        );
      }
    });

    test('should not have file: protocol dependencies', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };
      
      for (const [name, version] of Object.entries(allDeps)) {
        assert.ok(
          !version.startsWith('file:'),
          `${name} should not use file: protocol: ${version}`
        );
      }
    });

    test('dependency names should be valid npm package names', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(content);
      
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };
      
      // Valid npm package name regex (simplified)
      const validNameRegex = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
      
      for (const name of Object.keys(allDeps)) {
        assert.match(
          name,
          validNameRegex,
          `${name} should be a valid npm package name`
        );
      }
    });
  });
});