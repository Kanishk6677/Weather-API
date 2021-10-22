const http=require("http")
const fs=require('fs');
var requests=require('requests')
const homeFile=fs.readFileSync('home.html',"utf-8");
const replaceVal=(tempVal,orgVal)=>{
let temperature=tempVal.replace("{%tempval%}",orgVal.main.temp);
 temperature=temperature.replace("{%tempmin%}",orgVal.main.temp_min);
 temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max);
 temperature=temperature.replace("{%location%}",orgVal.name);
 temperature=temperature.replace("{%country%}",orgVal.sys.country);
 temperature=temperature.replace("{%tempStatus%}",orgVal.weather[0].main);
 return temperature;

}
const server=http.createServer((req,res)=>{
if(req.url=='/') {
   
requests("http://api.openweathermap.org/data/2.5/weather?q=Patna&appid=7ba41939f11bd1dfcf24ae3f75bb3f07")
.on("data",(chunk)=>{
    const objectData=JSON.parse(chunk)
    const arrData=[objectData]
    // console.log(arrData[0].main.temp); 
    const realTimeData=arrData.map((val)=>replaceVal(homeFile,val)).join(""); 
   
    res.write(realTimeData);
    
})
.on("end",(err)=>{
    if(err)     return console.log(err);
    console.log('end');
})

}
// else
// res.end("File not found")
})
server.listen(8000,"127.0.0.1")