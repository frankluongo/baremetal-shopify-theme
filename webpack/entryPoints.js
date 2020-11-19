const glob = require('glob')

function getEntrypoints() {
  const scripts = {};
  const files = glob.sync('./src/assets/*.js');
  files.forEach(file => {
    const name = getName(file)
    scripts[name] = file;
  });
  return scripts;
}

function getName(file) {
  return file.split('./src/assets/')[1].replace('.js', '')
}

exports.entry = getEntrypoints();
