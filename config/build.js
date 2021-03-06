const rollup = require( 'rollup' );
const path = require( 'path' );
const getInputOption = require( './inputOption' );
const getOutputOption = require( './outputOption' );
const colors = require( 'colors' );


async function build( moduleName, isIndex ) {

    let inputOption = await getInputOption( moduleName, isIndex );
    let outputOption = await getOutputOption( moduleName, isIndex );
    if ( !inputOption ) {
        await console.log( `${moduleName}没有找到对应index文件。请编写index.tsx、index.ts、index.jsx、index.js入口文件`.red );
        return false;
    }
    await console.log( `开始打包${moduleName}`.green );

    await rollup.rollup( inputOption ).then( async ( bundle ) => {
        // generate code and a sourcemap

        let modules = bundle.modules;
        for ( let i = 0; i < modules.length; i++ ) {
            if ( modules[i].resolvedIds ) {
                let { resolvedIds } = modules[i];
                for ( let key in resolvedIds ) {
                    if ( resolvedIds[key].indexOf( '.scss' ) != '-1' ) {
                        //添加css引用
                        outputOption.intro = "require('./style.css');";
                    }
                }
            }
        }

        const { code, map } = await bundle.generate( outputOption );
        await bundle.write( outputOption );
        await console.log( `完成打包${moduleName}`.green );
    } ).catch( ( err ) => {
        console.log( `打包${moduleName}失败`.red );
        console.log( `${err}`.red );
    } );

}

module.exports = build;



