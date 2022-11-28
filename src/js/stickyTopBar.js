//Переменная с шапкой
const topBar = document.getElementsByClassName("Top-Bar")[0];

//Функция выполняющаяся при скролле страницы
window.onscroll= ()=> {
    //При скролле больше чем на 450px шапке добавляется класс fixed
    if (window.scrollY >= 450) {
        topBar.classList.add("fixed")
    }else {//Иначе он убирается
        topBar.classList.remove("fixed")
    }
}