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
    <link href="/plugin/select2/css/select2.css" rel="stylesheet" type="text/css"/>
    <link href="/css/spoom.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" charset="utf-8" src="/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="/ueditor/ueditor.all.js"></script>
</head>
<body>
<#include "../sidebar.ftl"/>

<div class="container-content">
    <div class="center-container">
        <div class="panel panel-default work-list" style="width: 20%">
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
                            <span class="badge" data-type="${type}工作"></span>
                        </div>
                    </a>
                    <div id="collapse-${type_index}" class="panel-collapse collapse <#if type=='年度'>in</#if>">
                        <ul class="list-group" data-type="${type}工作">
                        </ul>
                    </div>
                </div>
            </#list>
            </div>
        </div>
        <div class="work-detail" style="width: 80%">
            <div class="panel panel-default title">
                <input class="form-control left" placeholder="工作标题" id="w-e-name" style="width:40%">
                <select class="form-control left" id="w-e-type" style="width: 10%">
                    <option value="年度">年度</option>
                    <option value="半年">半年</option>
                    <option value="季度">季度</option>
                    <option value="月度">月度</option>
                    <option value="周">周</option>
                    <option value="日">日</option>
                    <option value="按需">按需</option>
                </select>
                <div class="right">
                    <button type="button" class="btn btn-primary hidden" id="w-edit-btn">编辑</button>
                    <button href="/addWork" type="button" class="btn btn-warning" id="w-add-btn">添加</button>
                    <button href="#delete-modal" data-toggle="modal" type="button" class="btn btn-danger" id="w-delete-btn">删除</button>
                </div>
            </div>
            <div class="work-panel">
                <div class="panel panel-success">
                    <div class="panel-heading">工作内容</div>
                    <div class="panel-body edit" style="overflow: hidden">
                        <script id="w-e-content" type="text/plain"></script>
                    </div>
                </div>
            </div>
            <div class="work-panel">
                <div class="panel panel-warning">
                    <div class="panel-heading">法规依据</div>
                    <div class="panel-body edit" style="overflow: hidden">
                        <script id="w-e-basis" type="text/plain"></script>
                    </div>
                </div>
            </div>
            <div class="work-panel">
                <div class="panel panel-danger">
                    <div class="panel-heading">注意事项</div>
                    <div class="panel-body edit" style="overflow: hidden">
                        <script id="w-e-tips" type="text/plain"></script>
                    </div>
                </div>
            </div>
            <div class="work-panel">
                <div class="panel panel-primary">
                    <div class="panel-heading">引用法规</div>
                    <div class="panel-body">
                        <select class="regulation-select form-control" multiple="multiple">
                        <#list regulations as regulation>
                            <option value="${regulation.reguId}">${regulation.title}</option>
                        </#list>
                        </select>
                    </div>
                </div>
            </div>

            <div class="work-panel" style="margin-bottom: 400px">
                <div class="panel panel-primary">
                    <div class="panel-heading">流程图</div>
                    <div class="panel-body">
                        <input type="file" value="sdgsdg" id="img_input" />
                        <p id="img_area" style="margin-top: 10px;padding: 10px"></p>
                    </div>
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

<div class="modal fade" id="delete-modal" tabindex="-1">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="form-group notice-msg">
                    删除后无法恢复,确定删除这项工作吗?
                </div>
                <div class="form-group notice-btn">
                    <button class="btn btn-danger" id="w-delete">删 除</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">关 闭</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="/plugin/jquery.min.js" type="text/javascript"></script>
<script src="/plugin/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/plugin/select2/js/select2.full.js" type="text/javascript"></script>
<script src="/js/app.js" type="text/javascript"></script>
<script src="/plugin/jquery.slimscroll.js" type="text/javascript"></script>
<script src="/js/js-admin-work.js" type="text/javascript"></script>
</body>
</html>