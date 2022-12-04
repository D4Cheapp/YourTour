const form = document.forms[0];

form.onsubmit = function formSubmitCheck(){
    if (document.getElementsByName("age")[0].checked){
        form.submit();
    }
    else {
        alert("Для заполнения формы вам должно быть больше 18 лет");
        return false
    }
}