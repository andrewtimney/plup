import Promise from "bluebird"
import pro from 'child_process'
import path from 'path'

export function createThumbnailProcess(filepath){
    return new Promise((resolve, reject)=>{
        
        var crt = pro.spawn('node', [path.join(__dirname, 'thumbnail-process.js'), filepath], { stdio: ['pipe'] });
        
        crt.stdout.on('data', function(buffer){
            console.log('data', buffer);
        });
        
        crt.stdout.on('end', function(){
            console.log('END', arguments);
        });
    });
}

 export function createThumbnailProcessAll(){
    return new Promise((resolve, reject)=>{
        
        var crt = pro.spawn('node', [path.join(__dirname, 'thumbnail-process-ar.js')], { stdio: ['pipe'] });
        let processed = [];
        
        crt.stdout.on('data', function(buffer){
            console.log('data');
            let processedStr = buffer.toString();
            try{
                processed.push(JSON.parse(processedStr));
            }
            catch(er){
            }
        });
        
        crt.stdout.on('end', function(){
            console.log('END', arguments);
            resolve(processed);
        });
    });
}