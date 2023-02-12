window.onload = function() {
    var regtel = /^1[3|4|5|7|8]\d{9}$/;
    var regtext = /^\d{6}$/;
    var regpassport = /^[a-zA-Z0-9_-]{6,16}$/;
    var tel = document.querySelector('#tel');
    var text = document.querySelector('#text');
    var passport = document.querySelector('#passport');
    var confirm = document.querySelector('#confirm');
    regexp(tel, regtel);
    regexp(text, regtext);
    regexp(passport, regpassport);
    //表单验证的函数
    function regexp(ele, reg) {
        ele.onblur = function() {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜您，输入正确 ';
            } else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i>格式不正确，请重新输入 ';
            }
        }
    }
    confirm.onblur = function() {
        if (this.value == passport.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜您，输入正确 ';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i>两次密码输入不一致 ';
        }
    }

}