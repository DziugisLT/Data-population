'use strict';

const dataGetter = function () {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let myObj = JSON.parse(this.responseText);
      dataChanger(myObj);
    }
  };

  xmlhttp.open('GET', 'data.json', true);
  xmlhttp.send();
};

const dataChanger = function (object) {
  const titles = document.querySelectorAll('.heading-secondary');
  const times = document.querySelectorAll('.time-text');
  const subtimes = document.querySelectorAll('.subtext');

  const btnWeekly = document.querySelector('.weekly');
  const listItems = document.querySelectorAll('.list-item');

  const btns = document.querySelector('.list');

  const dataPopulate = function (object, period) {
    titles.forEach((title, i) => {
      title.textContent = `${object[i].title}`;
    });

    times.forEach((time, i) => {
      time.textContent = `${object[i].timeframes[period].current}hrs`;
    });

    subtimes.forEach((subtime, i) => {
      subtime.textContent = `Last Week - ${object[i].timeframes[period].previous}hrs`;
    });

    listItems.forEach((item) => {
      item.classList.remove('active');
    });
    document.querySelector(`.${period}`).classList.add('active');
  };

  const init = function () {
    dataPopulate(object, 'weekly');
    btnWeekly.classList.add('active');
  };

  init();

  btns.addEventListener('click', function (e) {
    let btn = e.target.closest('.list-item').classList[1];
    dataPopulate(object, btn);
  });
};

dataGetter();
