class Effect {
  constructor() {
    window.onload = () => {
      this.getContent("home")
      this.showContent()
      if (window.matchMedia("(max-width: 1200px)") && document.contains(this.element('.menu')) && this.element('.menu').childElementCount <= 0) {
        let menu = this.element('.menu');
        fetch('site-components/svg/menu.svg').then(res => res.text()).then(svg => {
          menu.insertAdjacentHTML('afterbegin', svg);
        })
      }

    }

    window.onscroll = () => {
      this.showContent()
    }

    this.elementList('.tab').forEach((element, ind, _arr) => {
      let delay = ind + 3;
      if (this.inView(this.element('.nav-container'))) {
        element.classList.add('visible-bar');
        element.classList.remove('hidden-bar');
        element.style = `transition-delay: ${(Number(delay) / 20) + 1}s`;
        if (!(element.classList.contains('open'))) {
          setTimeout(() => {
            element.firstElementChild.classList.remove('nav-text_hide');
            element.firstElementChild.classList.add('nav-text_visible')
          }, 1000);
        }
      }
      setTimeout(() => {
        element.style = '';
      }, 1500);
    })

    this.element('.nav-container').addEventListener('click', event => {
      if (event.target.matches('.tab')) {
        this.changeSection();
      } else if (event.target.matches('span')) {
        this.changeSection();
      }
    })

    this.element('.menu').addEventListener('click', () => {
      this.menuJS()
    })
    this.slideshow(4000)
  }
  element(elem) {
    return document.querySelector(elem);
  }
  elementList(elem) {
    return document.querySelectorAll(elem);
  }
  opened() {
    return this.element('.open')
  }
  inView(el) {
    try {
      let rect = el.getBoundingClientRect(),
        vWidth = window.innerWidth || doc.documentElement.clientWidth,
        vHeight = window.innerHeight || doc.documentElement.clientHeight,
        efp = function (x, y) {
          return document.elementFromPoint(x, y)
        };

      // Return false if it's not in the viewport
      if (rect.right < 0 || rect.bottom < 0 ||
        rect.left > vWidth || rect.top > vHeight) {
        console.log(false);

        return false;
      } else if (
        el.contains(efp(rect.left, rect.top)) || // If It is in the viewport
        el.contains(efp(rect.right, rect.top)) ||
        el.contains(efp(rect.right, rect.bottom)) ||
        el.contains(efp(rect.left, rect.bottom))
      ) {
        console.log(true);
        return true;
      }
    } catch (error) {
      console.log(error)
    }
  }
  open() {
    let target = event.target;
    if (!(event.target === this.opened())) {
      if (event.target.matches('span')) {
        target = event.target.parentElement;
      }
      if (window.matchMedia("(max-width: 1200px)") && getComputedStyle(this.element('.menu')).display === "none") {
        this.removeCont();
        this.opened().childNodes.forEach(element => {
          if (element.nodeType === 1) {
            element.classList.add('nav-text_visible')
            element.classList.remove('nav-text_hide')
          }
        })
        this.opened().classList.remove('open');
        target.classList.add('open');
        target.childNodes.forEach(elem => {
          if (elem.nodeType === 1) {
            elem.classList.add('nav-text_hide')
            elem.classList.remove('nav-text_visible')
          } else {
            target.childNodes.forEach(elem => {
              if (elem.nodeType === 1) {
                elem.classList.remove('nav-text_visible');
                elem.classList.add('nav-text_hide');
              }
            })
          }
        })
      } else {
        target.classList.add('open');
        this.elementList('.grid').forEach((elem) => {
          if (elem.nodeType === 1) {
            elem.classList.remove('grid')
            elem.firstElementChild.classList.remove('nav-text_visible')
            elem.firstElementChild.classList.add('nav-text_hide')
            if (!(elem.classList.contains('open'))) {
              elem.classList.add('collapse')
            }
          }
        })
        console.log(this.opened());
        let color = getComputedStyle(this.opened()).backgroundColor;
        this.element('header').firstElementChild.style = 'position: relative; transform: translateY(0px) scaleX(1)'
        this.element('header').style = `background-color: ${color}`
        this.element('body').style = `background-color: ${color}`
      }
    } else {
      return
    }
  }
  getContent(setting) {
    fetch('site-components/script/JSON/files.JSON').then(response => response.json()).then((html) => {
      fetch(html[setting]).then(res => res.text()).then((htm) => {
        this.element('main').innerHTML = htm;
        let data = this.element('main').firstElementChild;
        setTimeout(() => {
          data.style = `opacity: 1; transition: .5s 1s ease; margin-left: ${Number(data.getAttribute('data-left'))}px`;
        }, 100);
      })
    })
  }
  removeCont() {
    let open = this.element('.open');
    let content = this.element('main>div');
    if (this.element('main').childElementCount > 0) {
      if (open.getAttribute('data-page') === content.getAttribute('data-page')) {
        content.style = "opacity: 0; transition: .2s ease;"
      }
    } else {
      return;
    }
  }
  menuJS() {
    this.removeCont();
    this.element('.nav-container').classList.add('mobile');
    this.element('.menu').style = "transform: translateY(-400px) scaleX(0)"
    this.opened().classList.remove('open');
    this.elementList('.tab').forEach((elem, ind, _arr) => {
      if (elem.nodeType === 1) {
        elem.classList.remove('hidden-bar');
        setTimeout(() => {
          elem.classList.add('grid');
        }, ind * 200);
        elem.firstElementChild.style = 'transform: rotate(0)'
        if (!(elem.classList.contains('open'))) {
          setTimeout(() => {
            elem.firstElementChild.classList.remove('nav-text_hide');
            elem.firstElementChild.classList.add('nav-text_visible');
          }, 700);
          elem.classList.remove('collapse');
        }
      }
    })
  }
  slideshow(interval = 5000) {
    let random = (num) => {
      return Math.floor(Math.random() * num)
    };
    let imgArray = []
    setInterval(() => {
      let pictureHolder = this.element('picture');
      if (!(pictureHolder.parentElement.classList.contains('hidden'))) {
        pictureHolder.childNodes.forEach((img, _ind, arr) => {
          if (img.nodeType === 1) {
            imgArray = [...arr]
            let newImgArray = imgArray.filter(elem => elem.nodeType === 1);
            let numb = random(newImgArray.length);
            let newImg = newImgArray[numb]
            if (img.matches('.active')) {
              if (newImg !== img) {
                console.log('pass');
                newImg.classList.remove('dormant');
                newImg.classList.add('active');
                img.classList.remove('active');
                img.classList.add('dormant');
              } else {
                let duplicate = newImgArray.map((elem, _ind, arr) => {
                  let dd = arr.find(elem === img)
                  return dd
                })
                console.log(duplicate);
                // this.slideshow(0);
              }
            } else {
              img.classList.add('dormant')
            }
          }
        })
      } else {
        return
      }
    }, interval);
  }
  reveal() {
    event.target.parentElement.parentElement.classList.add('foreground')
    this.elementList('.member-holder').forEach(elem => {
      if (elem.nodeType === 1 && !(elem.classList.contains('foreground'))) {
        elem.classList.add('behind');
      }
    })
  }
  normal() {
    this.elementList('.member-holder').forEach(elem => {
      if (elem.nodeType === 1) {
        if (elem.classList.contains('foreground')) {
          elem.classList.remove('foreground');
        } else {
          elem.classList.remove('behind')
        }
      }
    })
  }
  changeSection() {
    let place = event.target.getAttribute('data-page');
    this.open();
    this.getContent(place);
    if (place === 'members') {
      this.normal()
    }
  }
  showContent() {
    this.elementList('.hidden').forEach(elem => {
      if (this.inView(elem)) {
        elem.classList.remove('hidden');
        elem.classList.add('visible');
      }
    })
  }
}
let parallax = new Effect();
