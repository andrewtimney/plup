import Promise from "bluebird"
import pro from 'child_process'
import path from 'path'

export function createThumbnailProcess(filepath){
    return new Promise((resolve, reject)=>{
        
        var crt = pro.spawn('node', [path.join(__dirname, 'thumbnail-process.js'), filepath], { stdio: ['pipe'] });
        let thumbnailPath;
        crt.stdout.on('data', function(buffer){
            thumbnailPath = buffer.toString();
        });
        
        crt.stdout.on('end', function(){
            console.log('END', arguments);
            resolve(thumbnailPath);
        });
    });
}

 export function createThumbnailProcessAll(event){
    return new Promise((resolve, reject)=>{
        
        var crt = pro.spawn('node', [path.join(__dirname, 'thumbnail-process-ar.js')], { stdio: ['pipe'] });
        let processed = [];
        
        crt.stdout.on('data', function(buffer){
            event.sender.send('log', 'data');
          
            let processedStr = buffer.toString();
                
            try{
                processed.push(JSON.parse(processedStr));
            }
            catch(er){
                event.sender.send('log','P:'+ processedStr)
            }
        });
        
        crt.stdout.on('end', function(){
            event.sender.send('log', 'END '+processed.length);
            resolve(processed);
        });
    });
}