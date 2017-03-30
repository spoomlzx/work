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
    <link href="/plugin/datetime/bootstrap-datetimepicker.min.css" rel="stylesheet" type="text/css"/>
    <link href="/css/spoom.css" rel="stylesheet" type="text/css"/>
</head>
<body>
<#include "./sidebar.ftl"/>

<div class="container-content">
    <div class="center-container">
        <div class="panel panel-default work-list">
            <div class="form-inline">
                <input type="text" class="form-control" id="w-keyword" placeholder="输入关键词">
                <button class="btn btn-info right" id="w-search" data-unittypeid="${unitTypeId}" data-unitid="${unitId}">搜索</button>
            </div>
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
            <div class="alert alert-warning title">
                <label class="btn btn-danger left m-left-10 hidden" id="w-check">
                    <span class="fa fa-spinner check-state"></span> <span class="check-info">该项工作待完成</span>
                </label>
                <span id="p-name" style="padding-left: 10px">工作标题</span>
            </div>
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
        <div class="work-panel right work-log">
            <div class="panel panel-danger">
                <div class="panel-heading">工作日志</div>
                <div class="panel-body">
                    <ul class="list-group" id="l-list">
                    </ul>
                </div>
            </div>
            <div>
                <button href="#log-add-modal" data-toggle="modal" class="btn btn-success right hidden" id="l-add-btn">
                    <span class="fa fa-plus"></span> <span>添加日志</span>
                </button>
            </div>

        </div>
    </div>


</div>

<div class="modal fade" id="regulation-modal" tabindex="-1">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body regulation-content">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="log-show-modal" tabindex="-1">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">日志</h4>
            </div>
            <div class="modal-body">
                <ul class="list-group">
                    <li class="list-group-item">
                        <h4 class="list-group-item-heading col-md-4">时间:</h4>
                        <p class="list-group-item-text col-md-offset-4" id="l-show-time">List group item heading</p>
                    </li>
                    <li class="list-group-item">
                        <h4 class="list-group-item-heading col-md-4">责任人：</h4>
                        <p class="list-group-item-text col-md-offset-4" id="l-show-duty-person">List group item heading</p>
                    </li>
                    <li class="list-group-item">
                        <h4 class="list-group-item-heading col-md-4">参加人员类别：</h4>
                        <p class="list-group-item-text col-md-offset-4" id="l-show-person-type">List group item heading</p>
                    </li>
                    <li class="list-group-item">
                        <h4 class="list-group-item-heading col-md-4">人数：</h4>
                        <p class="list-group-item-text col-md-offset-4" id="l-show-count">List group item heading</p>
                    </li>
                    <li class="list-group-item">
                        <h4 class="list-group-item-heading col-md-4">工作情况描述：</h4>
                        <p class="list-group-item-text col-md-offset-4" id="l-show-describe">List group item heading</p>
                    </li>
                </ul>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="log-add-modal" tabindex="-1">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="modal-title">添加日志</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-body">
                        <div class="form-group">
                            <label class="col-md-3 control-label">时间</label>
                            <div class="input-group date form_datetime col-md-9" style="padding: 0px 15px">
                                <input class="form-control" type="text" id="l-time" value="" readonly>
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </div>
                            <input type="hidden" id="dtp_input1" value="" /><br/>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">责任人</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" id="l-duty-person" placeholder="责任人姓名">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">人员类别</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" id="l-person-type" placeholder="参加人员类别">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">人数</label>
                            <div class="col-md-9">
                                <input onkeydown="onlyNum();" style="ime-mode:Disabled" type="text" class="form-control" id="l-count" placeholder="人数">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">工作情况描述</label>
                            <div class="col-md-9">
                                <textarea class="form-control" rows="6" id="l-describe"></textarea>
                            </div>
                        </div>
                        <span class="input-message" id="l-add-error"></span>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success" id="l-add">添 加</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">关 闭</button>
            </div>
        </div>
    </div>
</div>


<script src="/plugin/jquery.min.js" type="text/javascript"></script>
<script src="/plugin/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/plugin/jquery.slimscroll.js" type="text/javascript"></script>
<script src="/plugin/datetime/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="/plugin/datetime/bootstrap-datetimepicker.zh-CN.js" type="text/javascript"></script>
<script src="/js/js-work.js" type="text/javascript"></script>
</body>
</html>