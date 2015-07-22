var fs = require('fs');
fs.readdir("./tpl",function(err,file){
	var HTMLfileFilter=[];
	var TPLfileFilter=[];
	var fileArr=file;
	var HTMLreg=/.*\.html$/;
	var TPLreg=/.*\.tpl$/;
	var page = fs.existsSync("./page");
	var dataFIS;
	if(!page){
		fs.mkdir('./page',function(err){
			if(err){
				console.log('文件夹创建出错')
			}
		})
	}
	//var INCLUDEreg=/^%\s*inc=\'(.*\..*)\'\s*%$/   //{% inc='footer.tpl' %}
	var write=[];
	/*过滤*/
	for(var i=0;i<fileArr.length;i++){
		if(HTMLreg.test(fileArr[i])){
			HTMLfileFilter.push(fileArr[i])
		}
		if(TPLreg.test(fileArr[i])){
			TPLfileFilter.push(fileArr[i])
		}
	}
	/*写入读取*/
	for(var i=0;i<HTMLfileFilter.length;i++){
		var filenames= "./tpl/"+HTMLfileFilter[i];
		dataFIS=fs.readFileSync("./tpl/"+HTMLfileFilter[i]);
		for (j in TPLfileFilter){
			Tpldata=fs.readFileSync("./tpl/"+TPLfileFilter[j]);
			console.log("模板tpl:"+TPLfileFilter[j]);
			dataFIS = dataFIS.toString().replace(new RegExp("{%.*inc='"+TPLfileFilter[j]+"'.*%}","g"),Tpldata.toString());
		}
		console.log("页面HTML:"+HTMLfileFilter[i]);
		fs.writeFile("./page/"+HTMLfileFilter[i],dataFIS,function(err){});
		console.log("-----------"+HTMLfileFilter[i]+"写入成功-----------");
	}
})