/* creat by sunhongkui */
let $ = (window as any).$;
class CreatTableMethod{
    vue:any;
    ele:String = "#tableContent";   //默认实例化table dom id
    dataName:String = "result"; //由于不同接口返回的字段名称不一致，特加此变量区分
    callback:any = null;    //如果需要回传data，则添加此回调方法
    tableOption:Object = {    //公共option
        striped: true,
        pagination : true,
        pageNumber:1,
        pageSize : 10,
    };

    constructor(param:any){
        this.vue = param.vue;
    }

    //实例化表格默认参数
    getDefaultOption(ele:String=null,dataName:any=null,callback:any=null):Object{
        if(!$(ele).length){
            console.warn("实例化table dom 对象有误");
        }
        let defaultOption:Object = {  //默认请求表格数据option
            method: 'post',
            dataType : "json",
            contentType: "application/x-www-form-urlencoded",
            ajaxOptions:(function(_this:any){
                return {
                    beforeSend: function(request) {
                        request.setRequestHeader("Authorization", "Bearer " + _this.vue.$store.state.token);
                    },
                }
            }(this)),
            sidePagination : "server", // 服务端处理分页
            responseHandler:(function(_this:any){
                return function(data:any){
                    if(data.status === 0){
                        if(data.pageNumber > data.totalPages && data.pageNumber > 1){   //删除最后一页的唯一数据时，自动刷新到前一页
                            $(ele).bootstrapTable("refreshOptions",{"pageNumber":data.totalPages});
                            return false;
                        }
                        if(callback && typeof callback == "function"){
                            callback(data);
                        }
                        return{
                            "total":data.data.totalElements,
                            "rows":data.data[dataName] || []
                        }
                    }else if(data.status == 61003){
                        _this.vue.$router.push("/login");
                    }else{
                        alert(data.message);
                        return{
                            "total":0,
                            "rows":[]
                        }
                    }
                }
            }(this)),
        };
        return defaultOption;
    }

    creatTableClient(obj:any):void{ //客户端分页 && 传数据进来

        let columnsArray:any = this.getColumnsArr(obj);
        let tableOption:Object = Object.assign({},this.tableOption,{
            data:obj.data,
            sidePagination:"client",
            columns:columnsArray
        })

        $(obj.ele).bootstrapTable('destroy');
        $(obj.ele).bootstrapTable(tableOption);
    }

    creatTable(obj:any):void{   //ajax请求数据

        let ele = obj.ele || this.ele;
        let dataName = obj.dataName || this.dataName;
        let callback = obj.callback || null;

        if(obj.defaultOption){
            Object.assign(this.tableOption,obj.defaultOption)
        }else{
            Object.assign(this.tableOption,this.getDefaultOption(ele,dataName,callback))
        }

        let columnsArray:any = this.getColumnsArr(obj);
        let tableOption:Object = Object.assign({},this.tableOption,{
            url: obj.url,
            queryParams:this.queryParams(obj.queryData,obj.isSearchObj),
            columns:columnsArray
        },obj.refreshOption || {})

        $(obj.ele).bootstrapTable('destroy');
        $(obj.ele).bootstrapTable(tableOption);
    }

    setColumnsObj(obj:any):Object{
        let columnsName:Array<string> = obj.columnsName;
        let fieldName:Array<string> = obj.fieldName;
        let columnsObj:any = obj.columnsObj || {};
        var _obj:any = {
            columnsName:columnsName,
            fieldName:fieldName,
            columnsObj:columnsObj
        }
        return _obj;
    }

    getColumnsArr(obj:any):Array<any>{
        let _obj:any = this.setColumnsObj(obj);
        let columnsArray:any = this.setColumnsArr(_obj);
        return columnsArray;
    }

    setColumnsArr(obj:any):Array<any>{
        let len:number = obj.columnsName.length;
        let arr:Array<Object> = [];
        for(var i=0; i<len; i++){
            let _o:any = {};
            _o.title = obj.columnsName[i];
            _o.field = obj.fieldName[i];
            _o.align = 'center';
            _o.valign = 'middle';
            if(obj.columnsObj[i]){
                _o.formatter = obj.columnsObj[i];
            }else{
                _o.formatter = function(value, row, index) { /*if(value === ""){ value = 0;}*/ return value}
            }
            arr.push(_o);
            _o = null;
        }
        return arr;
    }

    queryParams(searchObj:any = null,isSearchObj:any = null){  //配置参数
        var _this = this;
        return function(params:any){
            var temp:any = {
                pageNumber: (params.offset - params.limit)/params.limit+2,
                pageSize: params.limit,
            };

            if(searchObj){
                if(isSearchObj){
                    Object.assign(temp,searchObj,_this.vue.searchObj);
                }else{
                    Object.assign(temp,searchObj);
                }
            }else{
                Object.assign(temp,_this.vue.userInfo,_this.vue.searchObj);
            }
            return temp;
        }
    };
}

export {
    CreatTableMethod
}


