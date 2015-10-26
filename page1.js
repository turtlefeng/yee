http = require 'http'  
url = require 'url'  
qs = require 'querystring'  
fs = require 'fs'  
  
server = http.createServer (req,res)->  
   urlData = url.parse req.url,true  
   action = urlData.pathname  
   publicPath = __dirname + "\\public\\"  
  
   if action is "/Signup"  
      if req.method is "POST"  
       formData = ''  
       msg = ''  
       req.on 'data',(data)->  
         formData += data  
           
         req.on 'end', ->  
           user = qs.parse formData             
           user.id = "123456"  
           msg = JSON.stringify user  
           res.writeHead 200,{"Content-Type":"application/json","Content-Length":msg.length}  
           res.end msg  
           
      else  
       form = publicPath + "ajaxSignupForm.html"  
       fs.readFile form,(err,contents) ->  
         #檔案如果沒發生錯誤，就把讀取進來的內容送出去，否則送出500這個錯誤狀態碼  
         if err isnt true  
           res.writeHead 200,"Content-Type":"text/html"  
           res.end(contents)  
         else  
           res.writeHead 500  
           res.end  
  
   else  
      res.writeHead 200,"Content-Type":"text/html"  
      res.end "<h1>歡迎光臨Node.js菜鳥筆記</h1><p><a href=\"/Signup\">註冊</a></p>"  
        
server.listen 3000  
  
console.log "Server跑起來了，現在時間是" + new Date() 
