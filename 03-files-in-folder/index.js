const path = require('path')
const fs = require('fs')

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  for (let file of files) {
    fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
      if (!stats.isDirectory()) {
        const name = path.basename(file, path.extname(file))
        const extension = path.extname(file).split('.')[0]
        const weight = stats.size / 1000
        console.log(`${name} - ${extension} - ${weight}kb`)
      }
    })
  }
})
