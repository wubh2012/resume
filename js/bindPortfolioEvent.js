!function () {
  let portfolio1 = document.querySelector('#portfolio1')
  portfolio1.onclick = function () {
    portfoliobar.className = "bar bar-state1";
  }
  let portfolio2 = document.querySelector('#portfolio2')
  portfolio2.onclick = function () {
    portfoliobar.className = "bar bar-state2";
  }
  let portfolio3 = document.querySelector('#portfolio3')
  portfolio3.onclick = function () {
    portfoliobar.className = "bar bar-state3";
  }
}.call()