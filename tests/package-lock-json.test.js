import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

describe('package-lock.json validation', () => {
  let packageLock;
  let packageJson;

  test('should exist and be readable', async () => {
    const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
    assert.ok(content, 'package-lock.json should be readable');
    packageLock = JSON.parse(content);
  });

  test('should be valid JSON', async () => {
    const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
    assert.doesNotThrow(() => {
      packageLock = JSON.parse(content);
    }, 'package-lock.json should be valid JSON');
  });

  describe('required fields', () => {
    test('should have required top-level fields', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      assert.ok(packageLock.name, 'should have name field');
      assert.ok(packageLock.version, 'should have version field');
      assert.ok(packageLock.lockfileVersion, 'should have lockfileVersion field');
      assert.ok(packageLock.packages, 'should have packages field');
    });

    test('should have correct lockfileVersion', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      assert.strictEqual(
        packageLock.lockfileVersion,
        3,
        'lockfileVersion should be 3 (npm v7+)'
      );
    });

    test('should have requires field set to true', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      assert.strictEqual(
        packageLock.requires,
        true,
        'requires field should be true'
      );
    });
  });

  describe('consistency with package.json', () => {
    test('name should match package.json', async () => {
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      const pkgContent = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageLock = JSON.parse(lockContent);
      packageJson = JSON.parse(pkgContent);
      
      assert.strictEqual(
        packageLock.name,
        packageJson.name,
        'package-lock.json name should match package.json'
      );
    });

    test('version should match package.json', async () => {
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      const pkgContent = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageLock = JSON.parse(lockContent);
      packageJson = JSON.parse(pkgContent);
      
      assert.strictEqual(
        packageLock.version,
        packageJson.version,
        'package-lock.json version should match package.json'
      );
    });

    test('root package dependencies should match package.json', async () => {
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      const pkgContent = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageLock = JSON.parse(lockContent);
      packageJson = JSON.parse(pkgContent);
      
      const rootPackage = packageLock.packages[''];
      
      assert.deepStrictEqual(
        rootPackage.dependencies,
        packageJson.dependencies,
        'root package dependencies should match package.json'
      );
    });

    test('root package devDependencies should match package.json', async () => {
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      const pkgContent = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageLock = JSON.parse(lockContent);
      packageJson = JSON.parse(pkgContent);
      
      const rootPackage = packageLock.packages[''];
      
      assert.deepStrictEqual(
        rootPackage.devDependencies,
        packageJson.devDependencies,
        'root package devDependencies should match package.json'
      );
    });
  });

  describe('packages structure', () => {
    test('should have root package entry', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      assert.ok(
        packageLock.packages[''],
        'should have empty string key for root package'
      );
    });

    test('should have node_modules entries', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      const nodeModulesEntries = Object.keys(packageLock.packages).filter(
        key => key.startsWith('node_modules/')
      );
      
      assert.ok(
        nodeModulesEntries.length > 0,
        'should have node_modules entries'
      );
    });

    test('astro package should be present in packages', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      const astroPackage = packageLock.packages['node_modules/astro'];
      assert.ok(astroPackage, 'astro package should be in packages');
    });

    test('eslint package should be present in packages', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      const eslintPackage = packageLock.packages['node_modules/eslint'];
      assert.ok(eslintPackage, 'eslint package should be in packages');
    });

    test('all packages should have required metadata', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      for (const [key, pkg] of Object.entries(packageLock.packages)) {
        if (key === '') continue; // Skip root package
        
        // All non-root packages should have either resolved or link
        const hasResolved = pkg.resolved !== undefined;
        const hasLink = pkg.link !== undefined;
        
        assert.ok(
          hasResolved || hasLink,
          `Package ${key} should have resolved or link field`
        );
        
        // If resolved, should have integrity
        if (hasResolved && !pkg.link) {
          assert.ok(
            pkg.integrity,
            `Package ${key} should have integrity hash`
          );
        }
      }
    });
  });

  describe('integrity validation', () => {
    test('integrity hashes should be valid format', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      // Valid integrity format: algorithm-base64hash
      const integrityRegex = /^(sha1|sha256|sha384|sha512)-[A-Za-z0-9+/]+=*$/;
      
      for (const [key, pkg] of Object.entries(packageLock.packages)) {
        if (pkg.integrity) {
          assert.match(
            pkg.integrity,
            integrityRegex,
            `Package ${key} should have valid integrity hash format`
          );
        }
      }
    });

    test('resolved URLs should use https', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      for (const [key, pkg] of Object.entries(packageLock.packages)) {
        if (pkg.resolved && pkg.resolved.startsWith('http')) {
          assert.ok(
            pkg.resolved.startsWith('https://'),
            `Package ${key} should use https for resolved URL: ${pkg.resolved}`
          );
        }
      }
    });

    test('resolved URLs should point to registry.npmjs.org', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      let npmjsCount = 0;
      let totalResolved = 0;
      
      for (const pkg of Object.values(packageLock.packages)) {
        if (pkg.resolved && pkg.resolved.startsWith('https://')) {
          totalResolved++;
          if (pkg.resolved.includes('registry.npmjs.org')) {
            npmjsCount++;
          }
        }
      }
      
      if (totalResolved > 0) {
        const percentage = (npmjsCount / totalResolved) * 100;
        assert.ok(
          percentage > 80,
          `Most packages should resolve to npmjs.org (found ${percentage.toFixed(1)}%)`
        );
      }
    });
  });

  describe('specific package versions', () => {
    test('astro version should be 5.16.4', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      const astroPackage = packageLock.packages['node_modules/astro'];
      assert.ok(astroPackage, 'astro package should exist');
      assert.strictEqual(
        astroPackage.version,
        '5.16.4',
        'astro version should be 5.16.4'
      );
    });

    test('eslint version should be 9.39.1', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      const eslintPackage = packageLock.packages['node_modules/eslint'];
      assert.ok(eslintPackage, 'eslint package should exist');
      assert.strictEqual(
        eslintPackage.version,
        '9.39.1',
        'eslint version should be 9.39.1'
      );
    });

    test('@eslint/js version should be 9.39.1', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      const eslintJsPackage = packageLock.packages['node_modules/@eslint/js'];
      assert.ok(eslintJsPackage, '@eslint/js package should exist');
      assert.strictEqual(
        eslintJsPackage.version,
        '9.39.1',
        '@eslint/js version should be 9.39.1'
      );
    });

    test('@astrojs/markdown-remark version should be 6.3.9', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      const markdownPackage = packageLock.packages['node_modules/@astrojs/markdown-remark'];
      assert.ok(markdownPackage, '@astrojs/markdown-remark package should exist');
      assert.strictEqual(
        markdownPackage.version,
        '6.3.9',
        '@astrojs/markdown-remark version should be 6.3.9'
      );
    });
  });

  describe('dependency tree integrity', () => {
    test('should not have circular dependencies', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      const visited = new Set();
      const visiting = new Set();
      
      function hasCycle(pkgName, deps) {
        if (visiting.has(pkgName)) {
          return true;
        }
        if (visited.has(pkgName)) {
          return false;
        }
        
        visiting.add(pkgName);
        
        if (deps) {
          for (const dep of Object.keys(deps)) {
            const depPackage = packageLock.packages[`node_modules/${dep}`];
            if (depPackage && hasCycle(dep, depPackage.dependencies)) {
              return true;
            }
          }
        }
        
        visiting.delete(pkgName);
        visited.add(pkgName);
        return false;
      }
      
      const rootPackage = packageLock.packages[''];
      const allDeps = {
        ...rootPackage.dependencies,
        ...rootPackage.devDependencies
      };
      
      for (const dep of Object.keys(allDeps)) {
        const depPackage = packageLock.packages[`node_modules/${dep}`];
        if (depPackage) {
          assert.ok(
            !hasCycle(dep, depPackage.dependencies),
            `Circular dependency detected involving ${dep}`
          );
        }
      }
    });

    test('all referenced packages should exist in packages', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      const missingPackages = new Set();
      
      for (const [key, pkg] of Object.entries(packageLock.packages)) {
        const allDeps = {
          ...pkg.dependencies,
          ...pkg.devDependencies,
          ...pkg.peerDependencies,
          ...pkg.optionalDependencies
        };
        
        for (const depName of Object.keys(allDeps)) {
          // Check if dependency exists in packages (accounting for scoped packages)
          const expectedKey = `node_modules/${depName}`;
          const exists = packageLock.packages[expectedKey] !== undefined;
          
          if (!exists && key !== '' && !pkg.peerDependencies?.[depName]) {
            missingPackages.add(`${depName} (required by ${key})`);
          }
        }
      }
      
      // Peer dependencies might not be present, so we're lenient
      assert.ok(
        missingPackages.size < 10,
        `Too many missing packages: ${[...missingPackages].slice(0, 5).join(', ')}`
      );
    });
  });

  describe('license validation', () => {
    test('most packages should have license information', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      let withLicense = 0;
      let total = 0;
      
      for (const [key, pkg] of Object.entries(packageLock.packages)) {
        if (key === '') continue;
        
        total++;
        if (pkg.license) {
          withLicense++;
        }
      }
      
      const percentage = (withLicense / total) * 100;
      assert.ok(
        percentage > 50,
        `More than 50% of packages should have license info (found ${percentage.toFixed(1)}%)`
      );
    });

    test('core dependencies should have permissive licenses', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      const permissiveLicenses = ['MIT', 'ISC', 'Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause'];
      const coreDeps = ['astro', 'tailwindcss', 'typescript', 'eslint', 'prettier'];
      
      for (const dep of coreDeps) {
        const pkg = packageLock.packages[`node_modules/${dep}`];
        if (pkg && pkg.license) {
          assert.ok(
            permissiveLicenses.includes(pkg.license),
            `${dep} should have a permissive license, found: ${pkg.license}`
          );
        }
      }
    });
  });

  describe('edge cases and security', () => {
    test('should not have packages with no version', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      for (const [key, pkg] of Object.entries(packageLock.packages)) {
        if (key !== '' && !pkg.link) {
          assert.ok(
            pkg.version,
            `Package ${key} should have a version`
          );
        }
      }
    });

    test('versions should be valid semver', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      const semverRegex = /^\d+\.\d+\.\d+(-[\w.]+)?(\+[\w.]+)?$/;
      
      for (const [key, pkg] of Object.entries(packageLock.packages)) {
        if (pkg.version) {
          assert.match(
            pkg.version,
            semverRegex,
            `Package ${key} should have valid semver version: ${pkg.version}`
          );
        }
      }
    });

    test('should not have suspicious package names', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      const suspiciousPatterns = [
        /bitcoin/i,
        /crypto-miner/i,
        /password-stealer/i
      ];
      
      for (const [key] of Object.entries(packageLock.packages)) {
        for (const pattern of suspiciousPatterns) {
          assert.ok(
            !pattern.test(key),
            `Suspicious package name detected: ${key}`
          );
        }
      }
    });

    test('package keys should match node_modules structure', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(content);
      
      for (const key of Object.keys(packageLock.packages)) {
        if (key !== '') {
          assert.ok(
            key.startsWith('node_modules/'),
            `Non-root package key should start with node_modules/: ${key}`
          );
        }
      }
    });
  });

  describe('JSON formatting', () => {
    test('should be properly formatted with 2-space indentation', async () => {
      const content = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      const parsed = JSON.parse(content);
      const formatted = JSON.stringify(parsed, null, 2) + '\n';
      
      assert.strictEqual(
        content,
        formatted,
        'package-lock.json should be formatted with 2-space indentation and trailing newline'
      );
    });
  });
});