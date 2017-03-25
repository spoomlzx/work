<!DOCTYPE html>
<html>
<head>
    <title>工作清单</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <link href="/plugin/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"/>
    <link href="/plugin/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css"/>
    <link href="/css/spoom.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<#include "./sidebar.ftl"/>

<div class="container-content">

    <div class="toolbar">
        <input style="width: 12%" type="text" class="form-control left" id="w-keyword" placeholder="输入关键词">
        <button class="btn btn-info left" id="w-search" data-unittypeid="${unitTypeId}" data-unitid="${unitId}">搜索</button>
        <button class="btn btn-warning left m-left-10" id="w-check">
            <span class="fa fa-spinner check-state"></span> <span class="check-info">该项工作待完成</span>
        </button>
        <button class="btn btn-info left" id="w-workid">0</button>
    <#if currentUser?? && currentUser.role == "ADMIN">

        <button class="btn btn-success right" id="w-edit">
            <span class="fa fa-edit"></span> 修改工作
        </button>
        <button class="btn btn-warning right" id="w-add">
            <span class="fa fa-plus"></span> 添加工作
        </button>
        <div class="right">
            <select class="form-control" id="w-type-select">
                <#list unitTypes as type>
                    <option value="${type.unitTypeId}" <#if type.unitTypeId==unitTypeId>selected="selected"</#if>>${type.name}</option>
                </#list>
            </select>
        </div>
    </#if>
    </div>
    <div class="center-container">
        <div class="panel panel-default work-list">
            <div class="panel-heading">工作列表</div>
            <div class="panel-group search-result" id="accordion" role="tablist" aria-multiselectable="true">
            <#list typelist as type>
                <div class="panel panel-default panel-worktype search-show">
                    <a class="panel-container" data-toggle="collapse" data-parent="#accordion" href="#collapse-${type_index}">
                        <div class="panel-heading title-${type_index}">
                        ${type}
                            <span class="badge" id="w-badge-${type_index}"></span>
                        </div>
                    </a>
                    <div id="collapse-${type_index}" class="panel-collapse collapse">
                        <ul class="list-group" id="w-ul-${type_index}">
                        </ul>
                    </div>
                </div>
            </#list>
            </div>
        </div>
        <div class="work-detail">
            <div class="alert alert-warning title" id="p-name">工作标题</div>
            <div>
                <div class="work-panel" style="width: 60%">
                    <div class="panel panel-success">
                        <div class="panel-heading">工作内容</div>
                        <div class="panel-body" id="p-content">
                            详细工作内容
                        </div>
                    </div>
                </div>
                <div class="work-panel" style="width: 40%">
                    <div class="panel panel-danger">
                        <div class="panel-heading">法规依据</div>
                        <div class="panel-body" id="p-basis">
                            法规条目依据
                        </div>
                    </div>
                </div>
            </div>
            <div style="padding-left: 10px">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="active"><a href="#p-regulations" data-toggle="tab">引用法规</a></li>
                    <li><a href="#p-flowchart" data-toggle="tab">流程图</a></li>
                    <li><a href="#p-tips" data-toggle="tab">注意事项</a></li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content" style="background-color: #ffffff">
                    <div class="tab-pane active" id="p-regulations">
                        <ul>

                        </ul>
                    </div>
                    <div class="tab-pane" id="p-flowchart">

                    </div>
                    <div class="tab-pane" id="p-tips">
                    </div>
                </div>
            </div>
        </div>
        <div class="work-panel" style="width: 24%;float: right;padding-left: 10px">
            <div class="panel panel-danger">
                <div class="panel-heading">工作日志</div>
                <div class="panel-body">
                    法规条目依据
                </div>
            </div>
        </div>
    </div>


</div>

<div class="modal fade" id="regulation-modal" tabindex="-1">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Modal title</h4>
            </div>
            <div class="modal-body regulation-content">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>


<script src="/plugin/jquery.min.js" type="text/javascript"></script>
<script src="/plugin/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/plugin/fullcalendar/moment.min.js" type="text/javascript"></script>
<script src="/plugin/jquery.slimscroll.js" type="text/javascript"></script>
<script src="/js/js-work.js" type="text/javascript"></script>
</body>
</html>