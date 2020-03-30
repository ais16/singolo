/*Navigation bar*/
const MENU = document.querySelector(".nav__list");

MENU.addEventListener("click", event => {
  if (event.target.closest("a")) {
    MENU.querySelectorAll("li a").forEach(element =>
      element.classList.remove("active")
    );
    event.target.classList.add("active");
  } else event.target.stopPropagation();
});
/*Scrolling*/
document.addEventListener("scroll", onScroll);

function onScroll(e) {
  const currentPosition = window.scrollY;
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("body > *");
  const navbar = document.querySelectorAll(".nav__list li a");

  sections.forEach(element => {
    if (element.hasAttribute("id")) {
      if (
        element.offsetTop - header.clientHeight <= currentPosition &&
        element.offsetTop + element.clientHeight > currentPosition
      ) {
        navbar.forEach(link => {
          link.classList.remove("active");
          if (
            element.getAttribute("id") ===
            link.getAttribute("href").substring(1)
          ) {
            link.classList.add("active");
          }
        });
      }
    }
  });
}
/*Slider*/
let phones = document.querySelectorAll(".phones");
let currentSlide = 0;
let isEnabled = true;

function changeCurrentSlide(n) {
  currentSlide = (n + phones.length) % phones.length;
}

function hideSlide(direction) {
  isEnabled = false;
  phones[currentSlide].classList.add(direction);
  phones[currentSlide].addEventListener("animationend", function() {
    this.classList.remove("activated", direction);
  });
}

function showSlide(direction) {
  phones[currentSlide].classList.add("next", direction);
  phones[currentSlide].addEventListener("animationend", function() {
    this.classList.remove("next", direction);
    this.classList.add("activated");
    isEnabled = true;
  });

  if (currentSlide === 1) {
    document.querySelector("#slider").style.backgroundColor = "#648BF0";
    document.querySelector("#slider").style.borderColor = "#6f92ef";
  } else {
    document.querySelector("#slider").style.backgroundColor = "#f06c64";
    document.querySelector("#slider").style.borderColor = "#ea676b";
  }
}

function previousSlide(n) {
  hideSlide("to-right");
  changeCurrentSlide(n - 1);
  showSlide("from-left");
}

function nextSlide(n) {
  hideSlide("to-left");
  changeCurrentSlide(n + 1);
  showSlide("from-right");
}

document
  .querySelector(".left-arrow__button")
  .addEventListener("click", function() {
    if (isEnabled) {
      previousSlide(currentSlide);
    }
  });

document
  .querySelector(".right-arrow__button")
  .addEventListener("click", function() {
    if (isEnabled) {
      nextSlide(currentSlide);
    }
  });

/*Screen activating*/
const homeButtons = document.querySelectorAll(".home-btn");

homeButtons.forEach(btn =>
  btn.addEventListener("click", function(e) {
    let verticalPhoneDiv = document.querySelector(".slider__vertical-phone");
    let horizintalPhoneDiv = document.querySelector(
      ".slider__horizontal-phone"
    );
    let verticalBlackScreen = document.querySelector(
      ".slider__vertical-phone .black-screen"
    );
    let horizontalBlackScreen = document.querySelector(
      ".slider__horizontal-phone .black-screen"
    );

    if (verticalPhoneDiv.contains(btn))
      verticalBlackScreen.hidden = !verticalBlackScreen.hidden;
    if (horizintalPhoneDiv.contains(btn))
      horizontalBlackScreen.hidden = !horizontalBlackScreen.hidden;
  })
);

/*Portfolio links*/
const SORT = document.querySelector(".links__buttons");

SORT.addEventListener("click", e => {
  if (event.target.closest("button")) {
    SORT.querySelectorAll("li button").forEach(element =>
      element.classList.remove("active")
    );
    event.target.classList.add("active");
  } else event.target.stopPropagation();

  document
    .querySelector(".pictures__lists")
    .querySelectorAll(".pictures-item")
    .forEach(element => {
      element.style.order = Math.floor(1 + Math.random() * 12);
    });
});

/*Pictures zooming*/
const ZOOMING = document.querySelector(".pictures__lists");

ZOOMING.addEventListener("click", e => {
  ZOOMING.querySelectorAll(".pictures-item").forEach(element =>
    element.classList.remove("active")
  );
  e.target.classList.add("active");
});

/*Form submission*/
const FORM = document.getElementById("form");
const SUBJECT = document.getElementById("subject");
const DESCRIPTION = document.getElementById("description");
const popupBox = document.querySelector(".popup-box");

FORM.addEventListener("submit", e => {
  event.preventDefault();
  popupBox.hidden = false;

  if (!SUBJECT.value)
    popupBox
      .querySelector(".popup-box p:nth-child(2)")
      .insertAdjacentHTML(
        "beforeend",
        '<span id = "subject-popup">No Subject</span>'
      );
  else {
    popupBox
      .querySelector(".popup-box p:nth-child(2)")
      .insertAdjacentHTML(
        "beforeend",
        `<span id = "subject-popup"><strong>Subject: </strong>${SUBJECT.value}</span>`
      );
  }

  if (!DESCRIPTION.value)
    popupBox
      .querySelector(".popup-box p:nth-child(3)")
      .insertAdjacentHTML(
        "beforeend",
        '<span id = "description-popup">No Description</span>'
      );
  else {
    popupBox
      .querySelector(".popup-box p:nth-child(3)")
      .insertAdjacentHTML(
        "beforeend",
        `<span id = "description-popup"><strong>Description: </strong>${DESCRIPTION.value}</span>`
      );
  }
});

const ok = document.getElementById("ok-btn");

ok.addEventListener("click", function(e) {
  popupBox.hidden = true;
  popupBox.querySelector("#subject-popup").remove();
  popupBox.querySelector("#description-popup").remove();
  FORM.reset();
});

/*burger menu*/

const BURGER = document.querySelector(".triple-line-menu");
const NAVBAR = document.querySelector(".header__navigation");
const OVERLAY = document.querySelector(".overlay-mobile");
let countOfClicks = 0;

BURGER.addEventListener("click", e => {
  countOfClicks = (countOfClicks + 1) % 2;
  if (countOfClicks === 1) {
    BURGER.classList.add("active");
    OVERLAY.classList.add("active");
    NAVBAR.classList.add("mobile-active-menu");
    document.removeEventListener("scroll", onScroll);
  } else {
    BURGER.classList.remove("active");
    NAVBAR.classList.remove("mobile-active-menu");
    OVERLAY.classList.remove("active");
    document.addEventListener("scroll", onScroll);
  }
});

const mobileMenu = document.querySelector(".nav__list");

mobileMenu.addEventListener("click", e => {
  if (event.target.closest("ul li a")) {
    countOfClicks = (countOfClicks + 1) % 2;
    NAVBAR.classList.remove("mobile-active-menu");
    BURGER.classList.remove("active");
    OVERLAY.classList.remove("active");
    document.addEventListener("scroll", onScroll);
  } else {
    event.target.stopPropagation();
  }
});

