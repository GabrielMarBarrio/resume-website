const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {

    if(request.url){

        const file = request.url == '/' ? './WWW/index.html' : `./WWW${request.url}`;

        fs.readFile(file, (err, data) => {
        	
            if(err){
                response.writeHead(404, {"Content-Type": "text/html"});
                response.write("NOT FOUND");
            }else{
                if(file.split('.').pop() == 'png'){
                    response.writeHead(200, {"Content-Type": "image/jpg"}); 
                }else if(file.split('.').pop() == 'pdf'){
                    response.writeHead(200, {"Content-Type": "application/pdf"}); 
                }else if(file.split('.').pop() == 'css'){
                    response.writeHead(200, {"Content-Type": "text/css"}); 
                }else{
                    response.writeHead(200, {"Content-Type": "text/html"}); 
                }
                response.write(data);
            }
            response.end();
        });
    }

}).listen(process.env.PORT || 4000);