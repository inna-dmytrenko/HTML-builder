const path = require('path')
const fsPromises = require('fs').promises

async function copyDir(src, dst) {
  const srcPath = path.join(__dirname, src)
  console.log(srcPath)
  const dstPath = path.join(__dirname, dst)
  console.log(dstPath)
  await fsPromises.mkdir(dstPath, { recursive: true })

  let files = await fsPromises.readdir(dstPath)
  console.log(files)
  for (let file of files) {
    await fsPromises.rm(path.join(dstPath, file))
  }
  files = await fsPromises.readdir(srcPath)

  for (let file of files) {
    await fsPromises.copyFile(
      path.join(srcPath, file),
      path.join(dstPath, file),
    )
  }
}
copyDir('files', 'files-copy')
