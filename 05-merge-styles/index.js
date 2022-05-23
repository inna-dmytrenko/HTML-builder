const path = require('path')
const fsPromises = require('fs').promises
const styles = []

;(async function merge(src, dst) {
  const srcPath = path.join(__dirname, src)
  const dstPath = path.join(__dirname, dst, 'bundle.css')

  let files = await fsPromises.readdir(srcPath)
  for (let file of files) {
    const stats = await fsPromises.stat(path.join(srcPath, file))

    if (stats.isFile() && path.extname(file) === '.css') {
      let stylesBuffer = await fsPromises.readFile(path.join(srcPath, file))
      styles.push(stylesBuffer)
    }
  }

  let start = true
  for (let style of styles) {
    if (start) {
      await fsPromises.writeFile(dstPath, style)
      start = false
    } else {
      await fsPromises.writeFile(dstPath, style, { flag: 'a' })
    }
  }
})('styles', 'project-dist')
