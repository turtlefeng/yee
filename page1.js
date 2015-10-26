(function() {  
  var fs, http, qs, server, url;  
  
  http = require('http');  
  
  url = require('url');  
  
  qs = require('querystring');  
  
  fs = require('fs');  
  
  server = http.createServer(function(req, res) {  
    var action, form, formData, msg, publicPath, urlData;  
    urlData = url.parse(req.url, true);  
    action = urlData.pathname;  
    publicPath = __dirname + "\\public\\";  
    if (action == "/Signup") {  
      if (req.method == "POST") {  
        formData = '';  
        msg = '';  
        return req.on('data', function(data) {  
          formData += data;  
          return req.on('end', function() {  
            var user;  
            user = qs.parse(formData);  
            user.id = "123456";  
            msg = JSON.stringify(user);  
            res.writeHead(200, {  
              "Content-Type": "application/json",  
              "Content-Length": msg.length  
            });  
            return res.end(msg);  
          });  
        });  
      } else {  
        form = publicPath + "ajaxSignupForm.html";  
        return fs.readFile(form, function(err, contents) {  
          if (err != true) {  
            res.writeHead(200, {  
              "Content-Type": "text/html"  
            });  
            return res.end(contents);  
          } else {  
            res.writeHead(500);  
            return res.end;  
          }  
        });  
      }  
    } else {  
      res.writeHead(200, {  
        "Content-Type": "text/html"  
      });  
      return res.end("<h1>歡迎光臨Node.js菜鳥筆記</h1><p><a href=\"/Signup\">註冊</a></p>");  
    }  
  });  
  
  server.listen(3000);  
  
  console.log("Server跑起來了，現在時間是" + new Date());  
  
}).call(this);
