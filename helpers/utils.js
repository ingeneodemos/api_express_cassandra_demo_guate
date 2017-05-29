module.exports.getUrlApi=function(name){
    const url = config.apiName+config.apiVersion+"/"+name;
    log.info("service : "+url);
    return url;
}

module.exports.error=function(error){
    return {"success":false,error:error}
}

module.exports.ok=function(){
    return {"success":true,"result":"ok"}
}


module.exports.validateArgs=function(){
    for(var i=0;i<arguments.length;i+=2){
        if(arguments[i]==null)
            return arguments[i+1];
    }
    return null;
}

//pasar nombre, tipo, valor
module.exports.validateTypeArgs=function(){
    for(var i=0;i<arguments.length;i+=3){
        if(arguments[i+1]=="number" && isNaN(arguments[i+2])){
//        if(arguments[i+1]!=null && typeof(arguments[i+2])!=arguments[i+1]){
            return global.msg.incorrec_type+arguments[i];
        }
    }
    return null;
}

module.exports.replaceParameters=function(){
    var str=arguments[0];
    for(var i=1;i<arguments.length;i+=2){
        str=str.replace("@"+arguments[i],arguments[i+1])
    }
    return str;
}

module.exports.logSql=function(query){
    if(config.logSql)
        log.info(query)
}