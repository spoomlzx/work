<!DOCTYPE html>
<html>
<head>
    <base href="<%=basePath%>">
    <title>法规制度</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <link href="/plugin/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"/>
    <link href="/plugin/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css"/>
    <link href="/css/spoom.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" charset="utf-8" src="/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="/ueditor/ueditor.all.js"></script>
</head>
<body>

<#include "../sidebar.ftl"/>

<div class="container-content">
    <div class="center-container bk-white">
        <div class="regulation-list">
            <table class="table table-bordered table-hover" id="regulation_table" style="width:100%;">
                <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th id="s-2"></th>
                    <th id="s-3"></th>
                    <th></th>
                </tr>
                <tr class="bk-grey">
                    <th> 序号</th>
                    <th> 法规制度名称</th>
                    <th> 发文机关</th>
                    <th> 类别</th>
                    <th> 操作</th>
                </tr>

                </thead>
                <tbody>
                <#list regulations as regulation>
                <tr>
                    <td></td>
                    <td class="r-title"> ${regulation.title}</td>
                    <td class="r-department"> ${regulation.department}</td>
                    <td class="r-category"> ${regulation.category}</td>
                    <td>
                        <div class="regulation-content" style="display: none">${regulation.content}</div>
                        <button class="btn btn-info regulation-show">
                            <span class="fa fa-file"></span>原文
                        </button>
                        <#if currentUser?? && currentUser.role == "ADMIN">
                            <button href="#edit-modal" data-toggle="modal" class="btn btn-success btn-edit" data-reguid="${regulation.reguId}">
                                <span class="fa fa-edit"></span>修改
                            </button>
                            <button class="btn btn-danger regulation-delete" data-reguid="${regulation.reguId}">
                                <span class="fa fa-cut"></span>删除
                            </button>
                        </#if>
                    </td>
                </tr>
                </#list>
                </tbody>
            </table>
        <#if currentUser?? && currentUser.role == "ADMIN">
            <button href="#regulation-modal" data-toggle="modal" class="btn btn-warning btn-add">添加法规</button>
        </#if>
        </div>

    </div>
</div>

<div class="modal fade" id="regulation-modal" tabindex="-1">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="modal-title">添加法规制度</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-body">
                        <div class="form-group">
                            <label class="col-md-2 control-label">法规名称</label>
                            <div class="col-md-5">
                                <input type="text" class="form-control" id="r-title" placeholder="输入法规名称">
                            </div>
                            <span class="input-message" id="r-title-error"></span>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">发文机关</label>
                            <div class="col-md-5">
                                <select class="form-control" id="r-department">
                                    <option>军委</option>
                                    <option>海军</option>
                                    <option>舰队</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">类别</label>
                            <div class="col-md-5">
                                <select class="form-control" id="r-category">
                                    <option>政工类</option>
                                    <option>军事类</option>
                                    <option>后勤类</option>
                                    <option>装备类</option>
                                    <option>综合类</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">法规内容</label>
                            <div class="col-md-10">
                                <script id="r-content" type="text/plain"></script>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success" id="r-add">添 加</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">关 闭</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="edit-modal" tabindex="-1">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">编辑法规制度</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-body">
                        <div class="form-group">
                            <label class="col-md-2 control-label">法规名称</label>
                            <div class="col-md-5">
                                <input type="text" class="form-control" id="r-e-title" placeholder="输入法规名称">
                            </div>
                            <span class="input-message" id="r-e-title-error"></span>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">发文机关</label>
                            <div class="col-md-5">
                                <select class="form-control" id="r-e-department">
                                    <option value="军委">军委</option>
                                    <option value="海军">海军</option>
                                    <option value="舰队">舰队</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">类别</label>
                            <div class="col-md-5">
                                <select class="form-control" id="r-e-category">
                                    <option value="政工类">政工类</option>
                                    <option value="军事类">军事类</option>
                                    <option value="后勤类">后勤类</option>
                                    <option value="装备类">装备类</option>
                                    <option value="综合类">综合类</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label">法规内容</label>
                            <div class="col-md-10">
                                <script id="r-e-content" type="text/plain"></script>
                                <span class="input-message" id="r-e-content-error"></span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success" id="r-save">保 存</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">关 闭</button>
            </div>
        </div>
    </div>
</div>


<script src="/plugin/jquery.min.js" type="text/javascript"></script>
<script src="/plugin/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/plugin/layer/layer.js" type="text/javascript"></script>
<script src="/plugin/datatables/datatables.min.js" type="text/javascript"></script>
<script src="/plugin/jquery.slimscroll.js" type="text/javascript"></script>
<script src="/js/js-regulation.js" type="text/javascript"></script>
</body>
</html>
