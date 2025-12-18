import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

describe('package.json and package-lock.json consistency', () => {
  let packageJson;
  let packageLock;

  test('both files should exist', async () => {
    await assert.doesNotReject(
      fs.access(path.join(ROOT_DIR, 'package.json')),
      'package.json should exist'
    );
    await assert.doesNotReject(
      fs.access(path.join(ROOT_DIR, 'package-lock.json')),
      'package-lock.json should exist'
    );
  });

  describe('metadata consistency', () => {
    test('package name should match', async () => {
      const pkgContent = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageJson = JSON.parse(pkgContent);
      packageLock = JSON.parse(lockContent);
      
      assert.strictEqual(packageLock.name, packageJson.name, 'package names should match');
      assert.strictEqual(packageLock.name, 'tidal-transit', 'package name should be tidal-transit');
    });

    test('package version should match', async () => {
      const pkgContent = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageJson = JSON.parse(pkgContent);
      packageLock = JSON.parse(lockContent);
      
      assert.strictEqual(packageLock.version, packageJson.version, 'package versions should match');
      assert.strictEqual(packageLock.version, '0.0.1', 'package version should be 0.0.1');
    });
  });

  describe('dependency consistency', () => {
    test('all package.json dependencies should be in package-lock.json', async () => {
      const pkgContent = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageJson = JSON.parse(pkgContent);
      packageLock = JSON.parse(lockContent);
      
      const rootPackage = packageLock.packages[''];
      
      for (const depName of Object.keys(packageJson.dependencies || {})) {
        assert.ok(
          rootPackage.dependencies[depName],
          `Dependency ${depName} from package.json should be in package-lock.json`
        );
      }
    });

    test('all package.json devDependencies should be in package-lock.json', async () => {
      const pkgContent = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageJson = JSON.parse(pkgContent);
      packageLock = JSON.parse(lockContent);
      
      const rootPackage = packageLock.packages[''];
      
      for (const depName of Object.keys(packageJson.devDependencies || {})) {
        assert.ok(
          rootPackage.devDependencies[depName],
          `DevDependency ${depName} from package.json should be in package-lock.json`
        );
      }
    });

    test('dependency version ranges should match', async () => {
      const pkgContent = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageJson = JSON.parse(pkgContent);
      packageLock = JSON.parse(lockContent);
      
      const rootPackage = packageLock.packages[''];
      
      const allPkgDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };
      
      const allLockDeps = {
        ...rootPackage.dependencies,
        ...rootPackage.devDependencies
      };
      
      for (const [name, version] of Object.entries(allPkgDeps)) {
        assert.strictEqual(
          allLockDeps[name],
          version,
          `Version range for ${name} should match between package.json and package-lock.json`
        );
      }
    });
  });

  describe('specific version validations', () => {
    test('astro version should be ^5.16.4 in both files', async () => {
      const pkgContent = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageJson = JSON.parse(pkgContent);
      packageLock = JSON.parse(lockContent);
      
      assert.strictEqual(
        packageJson.dependencies.astro,
        '^5.16.4',
        'astro version should be ^5.16.4 in package.json'
      );
      
      const rootPackage = packageLock.packages[''];
      assert.strictEqual(
        rootPackage.dependencies.astro,
        '^5.16.4',
        'astro version should be ^5.16.4 in package-lock.json'
      );
    });

    test('eslint version should be ^9.39.1 in both files', async () => {
      const pkgContent = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageJson = JSON.parse(pkgContent);
      packageLock = JSON.parse(lockContent);
      
      assert.strictEqual(
        packageJson.devDependencies.eslint,
        '^9.39.1',
        'eslint version should be ^9.39.1 in package.json'
      );
      
      const rootPackage = packageLock.packages[''];
      assert.strictEqual(
        rootPackage.devDependencies.eslint,
        '^9.39.1',
        'eslint version should be ^9.39.1 in package-lock.json'
      );
    });

    test('locked astro version should satisfy package.json range', async () => {
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(lockContent);
      
      const astroPackage = packageLock.packages['node_modules/astro'];
      assert.ok(astroPackage, 'astro should be in lockfile');
      assert.strictEqual(astroPackage.version, '5.16.4', 'locked astro version should be 5.16.4');
    });

    test('locked eslint version should satisfy package.json range', async () => {
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(lockContent);
      
      const eslintPackage = packageLock.packages['node_modules/eslint'];
      assert.ok(eslintPackage, 'eslint should be in lockfile');
      assert.strictEqual(eslintPackage.version, '9.39.1', 'locked eslint version should be 9.39.1');
    });
  });

  describe('dependency tree validation', () => {
    test('all direct dependencies should have corresponding node_modules entries', async () => {
      const pkgContent = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageJson = JSON.parse(pkgContent);
      packageLock = JSON.parse(lockContent);
      
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };
      
      for (const depName of Object.keys(allDeps)) {
        const nodeModulesKey = `node_modules/${depName}`;
        assert.ok(
          packageLock.packages[nodeModulesKey],
          `${depName} should have a node_modules entry in package-lock.json`
        );
      }
    });

    test('transitive dependencies of astro should be present', async () => {
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(lockContent);
      
      const astroPackage = packageLock.packages['node_modules/astro'];
      assert.ok(astroPackage, 'astro package should exist');
      
      // Check for known astro dependencies
      const expectedDeps = [
        '@astrojs/compiler',
        '@astrojs/markdown-remark',
        '@astrojs/telemetry'
      ];
      
      for (const dep of expectedDeps) {
        const depExists = packageLock.packages[`node_modules/${dep}`] !== undefined;
        assert.ok(
          depExists,
          `Astro dependency ${dep} should be present in lockfile`
        );
      }
    });

    test('transitive dependencies of eslint should be present', async () => {
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(lockContent);
      
      const eslintPackage = packageLock.packages['node_modules/eslint'];
      assert.ok(eslintPackage, 'eslint package should exist');
      
      // Check for known eslint dependencies
      const expectedDeps = [
        '@eslint/js',
        '@eslint/eslintrc'
      ];
      
      for (const dep of expectedDeps) {
        const depExists = packageLock.packages[`node_modules/${dep}`] !== undefined;
        assert.ok(
          depExists,
          `ESLint dependency ${dep} should be present in lockfile`
        );
      }
    });
  });

  describe('integrity checks', () => {
    test('no package.json dependency should be missing from lockfile', async () => {
      const pkgContent = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageJson = JSON.parse(pkgContent);
      packageLock = JSON.parse(lockContent);
      
      const allDeps = new Set([
        ...Object.keys(packageJson.dependencies || {}),
        ...Object.keys(packageJson.devDependencies || {})
      ]);
      
      const missingDeps = [];
      for (const dep of allDeps) {
        if (!packageLock.packages[`node_modules/${dep}`]) {
          missingDeps.push(dep);
        }
      }
      
      assert.strictEqual(
        missingDeps.length,
        0,
        `Dependencies missing from lockfile: ${missingDeps.join(', ')}`
      );
    });

    test('lockfile should not have unresolved packages', async () => {
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(lockContent);
      
      const unresolved = [];
      
      for (const [key, pkg] of Object.entries(packageLock.packages)) {
        if (key === '') continue; // Skip root
        
        // Packages should have either resolved URL or be a link
        if (!pkg.resolved && !pkg.link) {
          unresolved.push(key);
        }
      }
      
      assert.strictEqual(
        unresolved.length,
        0,
        `Unresolved packages found: ${unresolved.slice(0, 5).join(', ')}`
      );
    });
  });

  describe('version downgrade validation', () => {
    test('astro downgrade from 5.16.5 to 5.16.4 should be intentional', async () => {
      const pkgContent = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(pkgContent);
      
      // This test documents that we intentionally downgraded to 5.16.4
      assert.strictEqual(
        packageJson.dependencies.astro,
        '^5.16.4',
        'Astro should be at version ^5.16.4 (downgraded from ^5.16.5)'
      );
    });

    test('eslint downgrade from 9.39.2 to 9.39.1 should be intentional', async () => {
      const pkgContent = await fs.readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8');
      packageJson = JSON.parse(pkgContent);
      
      // This test documents that we intentionally downgraded to 9.39.1
      assert.strictEqual(
        packageJson.devDependencies.eslint,
        '^9.39.1',
        'ESLint should be at version ^9.39.1 (downgraded from ^9.39.2)'
      );
    });

    test('downgraded versions should have valid lockfile entries', async () => {
      const lockContent = await fs.readFile(path.join(ROOT_DIR, 'package-lock.json'), 'utf-8');
      packageLock = JSON.parse(lockContent);
      
      const astroPackage = packageLock.packages['node_modules/astro'];
      assert.strictEqual(astroPackage.version, '5.16.4', 'Locked astro should be 5.16.4');
      assert.ok(astroPackage.resolved, 'Astro should have resolved URL');
      assert.ok(astroPackage.integrity, 'Astro should have integrity hash');
      
      const eslintPackage = packageLock.packages['node_modules/eslint'];
      assert.strictEqual(eslintPackage.version, '9.39.1', 'Locked eslint should be 9.39.1');
      assert.ok(eslintPackage.resolved, 'ESLint should have resolved URL');
      assert.ok(eslintPackage.integrity, 'ESLint should have integrity hash');
    });
  });
});