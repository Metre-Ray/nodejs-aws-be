const tsconfig = require('./tsconfig.paths.json');
const paths = tsconfig.compilerOptions.paths;

const moduleNameMapper = Object.keys(paths).reduce((acc, curr) => {
    // format for moduleNameMapper: "@functions/(.*)": ["<rootDir>/src/functions/$1"],
    return {
        ...acc,
        [curr.replace('*', '(.*)')]: ['<rootDir>' + paths[curr][0].replace('*', '$1')]
    }
}, {});

module.exports = {
    moduleNameMapper,
}
