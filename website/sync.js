const fs = require("fs")
const path = require("path")

// reference: https://stackoverflow.com/questions/13786160/copy-folder-recursively-in-node-js
/**
 * Look ma, it's cp -R.
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
const copyRecursiveSync = function(src, dest) {
    let exists = fs.existsSync(src);
    let stats = exists && fs.statSync(src);
    let isDirectory = exists && stats.isDirectory();
    if(fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true, force: true });
    }
    // delete directory: reference: https://stackoverflow.com/questions/18052762/remove-directory-which-is-not-empty
    if (isDirectory) {
      fs.mkdirSync(dest);
      fs.readdirSync(src).forEach(function(childItemName) {
        copyRecursiveSync(path.join(src, childItemName),
                          path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
};

const fileTransformMap = [
    {
        origin: '../README.md',
        target: './docs/index.md',
        type: 'file',
    },
    {
        origin: '../resource',
        target: './docs/resource',
        type: 'dir',
    }
]

fileTransformMap.forEach(item=>{
    if(item.type === 'dir') {
        copyRecursiveSync(item.origin, item.target)
    }else if(item.type === 'file'){
        fs.copyFile(item.origin, item.target, (err) => {
            if (err) throw err;
           });
    }
})