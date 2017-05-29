var express=require("express");
var router=express.Router();

router.get("/", function(req, res){
    const query=global.queries.get_agents;    
    global.utils.logSql(query)
    global.cli.execute(query, function(err, resp){
        if(err)     {
            log.error("Error al realizar la consulta en cassandra");
            res.status(global.msg.error_code);
            res.json(global.utils.error("Error al obtener los agentes"));
        }else{
            res.send(resp.rows);
        }
    });
})

router.get("/:id", function(req, res){
    const query=global.utils.replaceParameters(global.queries.get_agent, "id", req.params.id);
    global.utils.logSql(query)
    global.cli.execute(query, function(err, resp){
        if(err)     {
            log.error("Error al realizar la consulta en cassandra");
            res.status(global.msg.error_code);
            res.json(global.utils.error("Error al obtener el agente"));
        }else{
            if(resp.rows && resp.rows.length>0){
                res.send(resp.rows[0]);
            }else{
                res.status(global.msg.error_code);
                res.json(global.utils.error("No se encuentra el agente"));
            }
        }
    });
})


router.put("/", function(req, res){

    const msgValidacion=global.utils.validateArgs(req.body.pin, global.msg.pin_required, req.body.name, global.msg.name_required,req.body.lastname, global.msg.lastname_required,req.body.email, global.msg.email_required,req.body.msisdn, global.msg.msisdn_required,req.body.company, global.msg.company_required,req.body.balance, global.msg.balance_required)
    if(msgValidacion){
        res.status(global.msg.error_query_code);
        res.json(global.utils.error(msgValidacion));
        return;
    }

    const msgTypeValidacion=global.utils.validateTypeArgs("id","string",req.body.id, "pin","number",req.body.pin, "name","string",req.body.name, "lastname","string",req.body.lastname, "email", "string",req.body.email, "msisdn","number",req.body.msisdn, "company", "string", req.body.company,"balance", "number", req.body.balance);
    if(msgTypeValidacion){
        res.status(global.msg.error_query_code);
        res.json(global.utils.error(msgTypeValidacion));
        return;
    }

    const query=global.utils.replaceParameters(global.queries.update_agent,"pin",req.body.pin,"name",req.body.name,"lastname",req.body.lastname,"email",req.body.email,"msisdn",req.body.msisdn,"company",req.body.company,"balance",req.body.balance,"id",req.body.id);
    global.utils.logSql(query)
    global.cli.execute(query, function(err){
        if(err){
            log.error("Error al actualizar el agente");
            res.status(global.msg.error_code);
            res.json(global.utils.error("Error al insertar el agente"));
        }else{
            res.json(global.utils.ok());            
        }
    });
})

router.post("/", function(req, res){
    const msgValidacion=global.utils.validateArgs(req.body.pin, global.msg.pin_required, req.body.name, global.msg.name_required,req.body.lastname, global.msg.lastname_required,req.body.email, global.msg.email_required,req.body.msisdn, global.msg.msisdn_required,req.body.company, global.msg.company_required,req.body.balance, global.msg.balance_required)
    if(msgValidacion){
        res.status(global.msg.error_query_code);
        res.json(global.utils.error(msgValidacion))
        return;
    }

    const msgTypeValidacion=global.utils.validateTypeArgs("pin","number",req.body.pin, "name","string",req.body.name, "lastname","string",req.body.lastname, "email", "string",req.body.email, "msisdn","number",req.body.msisdn, "company", "string", req.body.company,"balance", "number", req.body.balance);
    if(msgTypeValidacion){
        res.status(global.msg.error_query_code);
        res.json(global.utils.error(msgTypeValidacion))
        return;
    }

    const query=global.utils.replaceParameters(global.queries.insert_agent,"pin",req.body.pin,"name",req.body.name,"lastname",req.body.lastname,"email",req.body.email,"msisdn",req.body.msisdn,"company",req.body.company,"balance",req.body.balance);
    global.utils.logSql(query)
    global.cli.execute(query, function(err){
        if(err){
            log.error("Error al insertar el agente");
            res.status(global.msg.error_code);
            res.json(global.utils.error("Error al insertar el agente"));
        }else{
            res.json(global.utils.ok());            
        }
    })
})


router.delete("/:id",function(req, res){
    const query=global.utils.replaceParameters(global.queries.delete_agent, "id", req.params.id);
    global.utils.logSql(query)
    global.cli.execute(query, function(err){
        if(err)     {
            log.error("Error al realizar la consulta en cassandra");
            res.status(global.msg.error_code);
            res.json(global.utils.error("Error al eliminar el agente"));
        }else{
            res.json(global.utils.ok());
        }
    });    
})

module.exports = router;