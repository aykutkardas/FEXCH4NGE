/*
 *
 * QirpiJS | JQuery Alternative Library
 * Author: Aykut Kardaş
 * http://github.com/aykutkardas
 *
 */

var Qirpi = function (el) {

    var el;
    var isDOM = function (a) {
        return a.tagName ? true : false;
    }


    if (isDOM(el)) {
        el = [el];
    } else {
        el = document.querySelectorAll(el);
    }

    class Q_init {
        constructor() {

            /* HTML DOM METHODS */
            /* ELEMENTS & SELECTOR METHODS */

            this.el = el;

            this.eq = function (n) {
                this.el = [this.el[n]]
                return this;
            }


            /* WRITE & READ METHODS */

            // _('div').text();
            // _('div').text('test');
            this.text = function (t) {
                if (t) {
                    for (var i = 0; i < this.el.length; i++) {
                        this.el[i].innerText = t;
                    }
                    return this;
                } else {
                    return this.el[0].innerText;
                }
            }

            // _('div').html();
            // _('div').html('test');
            this.html = function (h) {
                if (h) {
                    for (var i = 0; i < this.el.length; i++) {
                        this.el[i].innerHTML = h;
                    }
                    return this;
                } else {
                    return this.el[0].innerHTML;
                }
            }

            /* CLASS METHODS */

            this.addClass = function (c) {
                for (var i = 0; i < this.el.length; i++) {
                    this.el[i].classList.add(c);
                }
                return this;
            }

            this.removeClass = function (c) {
                for (var i = 0; i < this.el.length; i++) {
                    this.el[i].classList.remove(c);
                }
                return this;
            }

            this.toggleClass = function (c) {
                for (var i = 0; i < this.el.length; i++) {
                    this.el[i].classList.toggle(c);
                }
                return this;
            }


            /* EVENT METHODS */

            this.click = function (fn) {
                for (var i = 0; i < this.el.length; i++) {
                    this.el[i].addEventListener('click', fn);
                }
                return this;
            }

            this.dblclick = function (fn) {
                for (var i = 0; i < this.el.length; i++) {
                    this.el[i].addEventListener('dblclick', fn);
                }
                return this;
            }

            this.keyup = function (fn) {
                for (var i = 0; i < this.el.length; i++) {
                    this.el[i].addEventListener('keyup', fn);
                }
                return this;
            }

            this.keydown = function (fn) {
                for (var i = 0; i < this.el.length; i++) {
                    this.el[i].addEventListener('keydown', fn);
                }
                return this;
            }

            this.keypress = function (fn) {
                for (var i = 0; i < this.el.length; i++) {
                    this.el[i].addEventListener('keypress', fn);
                }
                return this;
            }

            this.blur = function (fn) {
                for (var i = 0; i < this.el.length; i++) {
                    this.el[i].addEventListener('blur', fn);
                }
                return this;
            }

            this.focus = function (fn) {
                for (var i = 0; i < this.el.length; i++) {
                    this.el[i].addEventListener('focus', fn);
                }
                return this;
            }

            /* CSS METHODS */

            this.css = function (c, v) {
                if (arguments.length == 2) {
                    for (var i = 0; i < this.el.length; i++) {
                        this.el[i].style[c] = v;
                    }
                    return this;
                } else {
                    if ("object" === typeof c) {
                        for (var i = 0; i < this.el.length; i++) {
                            Object.assign(this.el[i].style, c);
                        }
                        return this;
                    } else {
                        if (this.el[0].style[c] == "") {
                            var style = document.defaultView.getComputedStyle(this.el[0]);
                            return style[c];
                        } else {
                            return this.el[0].style[c];
                        }
                    }

                }
            }


            /* ATTRIBUTE METHODS */
            this.attr = function (a, v) {
                if (arguments.length == 2) {
                    for (var i = 0; i < this.el.length; i++) {
                        this.el[i].setAttribute(a, v);
                    }
                    return this;
                } else {
                    return this.el[0].getAttribute(a);
                }
            }


        }
    }

    return new Q_init;



}

var _ = _ || Qirpi;
