#!/usr/bin/env node

const { spawn } = require('child_process');

// Read required environment variables
const { DATABASE_URL, PROJECT_TOKEN, PROJECT_ID } = process.env;

const missing = [];
if (!DATABASE_URL) missing.push('DATABASE_URL');
if (!PROJECT_TOKEN) missing.push('PROJECT_TOKEN');
if (!PROJECT_ID) missing.push('PROJECT_ID');

if (missing.length) {
  console.log('\nMissing the following environment variables:\n');
  missing.forEach(v => console.log(`- ${v}`));
  console.log('\nSet them using Railway CLI, for example:');
  missing.forEach(v => {
    console.log(`  railway variables set ${v} <value>`);
  });
  console.log('\nAfter setting the variables, run this script again.');
  process.exit(1);
}

(async () => {
  try {
    if (!(await run('railway', ['login', '--token', PROJECT_TOKEN], 'Logged in to Railway.'))) process.exit(1);
    if (!(await run('railway', ['link', PROJECT_ID], 'Project linked.'))) process.exit(1);
    if (!(await run('railway', ['up'], 'Deployment started.'))) process.exit(1);
    console.log('\n✅ Deployment commands finished successfully.');
  } catch (err) {
    console.error('\n❌ An unexpected error occurred:', err.message || err);
    process.exit(1);
  }
})();

function run(cmd, args, successMsg) {
  return new Promise(resolve => {
    console.log(`\n> ${cmd} ${args.join(' ')}`);
    const proc = spawn(cmd, args, { stdio: 'inherit', shell: true });
    proc.on('close', code => {
      if (code === 0) {
        if (successMsg) console.log(successMsg);
        resolve(true);
      } else {
        console.error(`Command failed with exit code ${code}`);
        resolve(false);
      }
    });
  });
}
