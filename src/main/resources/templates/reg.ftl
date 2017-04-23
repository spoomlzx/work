<!DOCTYPE html>
<html>
<head>
    <title>登陆</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <link href="/plugin/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"/>
    <link href="/plugin/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css"/>
    <link href="/plugin/ztree/ztree.css" rel="stylesheet" type="text/css"/>
    <link href="/css/spoom.css" rel="stylesheet" type="text/css"/>
</head>
<body class="login-body">
<div class="header navbar navbar-default navbar-fixed-top">
    <div class="logo">
        <a href="/"><span>基层部队标准工作程序规范</span></a>
    </div>
</div>
<div class="login-box">
    <div class="form-horizontal form-login">
        <div class="row">
            <div class="form-body col-md-7">
                <div class="form-group">
                    <label class="col-md-4 control-label">用户名</label>
                    <div class="col-md-8">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-user"></i></span>
                            <input type="text" class="form-control" onblur="testUserName();" placeholder="用户" id="username">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-4 control-label">密码</label>
                    <div class="col-md-8">
                        <div class="input-group ">
                            <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                            <input type="password" class="form-control" onblur="checkPassword();" placeholder="密码" id="password">
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-4 control-label">单位</label>
                    <div class="col-md-8">
                        <div class="input-group ">
                            <span class="input-group-addon"><i class="fa fa-save"></i></span>
                            <input type="text" onfocus="showUnit();" class="form-control" contenteditable="false" placeholder="选择单位" id="select-unit">
                            <input type="text" class="hidden" id="unit-id">
                        </div>
                    </div>
                </div>

                <div class="form-actions top">
                    <div class="row">
                        <div class="col-md-offset-4 col-md-4">
                            <button href="javascript:;" class="btn btn-block btn-success" id="reg-user">注 册</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 border-left-after-grey reg-box">
                <span style="padding-left: 20px">已经有账号?</span>
                <a href="/login" class="btn btn-link btn-lg btn-logon">
                    立即登录 →
                </a>
            </div>
        </div>
    </div>

</div>

<div id="unit-list" style="display: none;position: absolute;">
    <ul id="treeDemo" class="ztree bk-green-dan" style="margin-top:0; width:320px;max-height: 600px;overflow-y: auto"></ul>
</div>

<script src="/plugin/jquery.min.js" type="text/javascript"></script>
<script src="/plugin/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/plugin/layer/layer.js" type="text/javascript"></script>
<script src="/plugin/ztree/jquery.ztree.js" type="text/javascript"></script>
<script src="/js/js-reg.js" type="text/javascript"></script>
</body>
</html>