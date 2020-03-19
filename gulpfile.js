const { src, dest, parallel } = require('gulp')
const typescript = require('gulp-typescript')
const through = require('through2')
const merge = require('merge2')

const tsProject = typescript.createProject('tsconfig.json')

function buildTypescript() {
    const tsResult = tsProject.src().pipe(tsProject())
    return merge([tsResult.js.pipe(dest('es')), tsResult.dts.pipe(dest('es'))])
}

function pngToBase64String() {
    return src('src/**/*.png')
        .pipe(
            through.obj((file, encoding, callback) => {
                if (file.isBuffer()) {
                    file.path = `${file.path}.js`
                    file.contents = Buffer.from(
                        `export default "data:image/png;base64,${file.contents.toString(
                            'base64'
                        )}"`
                    )
                }
                callback(null, file)
            })
        )
        .pipe(dest('es'))
}

exports.default = parallel(buildTypescript, pngToBase64String)
