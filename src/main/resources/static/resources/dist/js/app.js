/*! AdminLTE app.js
 * ================
 * Main JS application file for AdminLTE v2. This file
 * should be included in all pages. It controls some layout
 * options and implements exclusive AdminLTE plugins.
 *
 * @Author  Almsaeed Studio
 * @Support <http://www.almsaeedstudio.com>
 * @Email   <support@almsaeedstudio.com>
 * @version 2.3.1
 * @license MIT <http://opensource.org/licenses/MIT>
 */
function _init() {
    "use strict";
    $.AdminLTE.layout = {
        activate: function() {
            var a = this;
            a.fix(), a.fixSidebar(), $(window, ".wrapper").resize(function() {
                a.fix(), a.fixSidebar()
            })
        },
        fix: function() {
            var a = $(".main-header").outerHeight() + $(".main-footer").outerHeight(),
                b = $(window).height(),
                c = $(".sidebar").height();
            if ($("body").hasClass("fixed")) $(".content-wrapper, .right-side").css("min-height", b - $(".main-footer").outerHeight());
            else {
                var d;
                b >= c ? ($(".content-wrapper, .right-side").css("min-height", b - a), d = b - a) : ($(".content-wrapper, .right-side").css("min-height", c), d = c);
                var e = $($.AdminLTE.options.controlSidebarOptions.selector);
                "undefined" != typeof e && e.height() > d && $(".content-wrapper, .right-side").css("min-height", e.height())
            }
        },
        fixSidebar: function() {
            return $("body").hasClass("fixed") ? ("undefined" == typeof $.fn.slimScroll && window.console && window.console.error("Error: the fixed layout requires the slimscroll plugin!"), void($.AdminLTE.options.sidebarSlimScroll && "undefined" != typeof $.fn.slimScroll && ($(".sidebar").slimScroll({
                destroy: !0
            }).height("auto"), $(".sidebar").slimscroll({
                height: $(window).height() - $(".main-header").height() + "px",
                color: "rgba(0,0,0,0.2)",
                size: "3px"
            })))) : void("undefined" != typeof $.fn.slimScroll && $(".sidebar").slimScroll({
                destroy: !0
            }).height("auto"))
        }
    }, $.AdminLTE.pushMenu = {
        activate: function(a) {
            var b = $.AdminLTE.options.screenSizes;
            $(document).on("click", a, function(a) {
                a.preventDefault(), $(window).width() > b.sm - 1 ? $("body").hasClass("sidebar-collapse") ? $("body").removeClass("sidebar-collapse").trigger("expanded.pushMenu") : $("body").addClass("sidebar-collapse").trigger("collapsed.pushMenu") : $("body").hasClass("sidebar-open") ? $("body").removeClass("sidebar-open").removeClass("sidebar-collapse").trigger("collapsed.pushMenu") : $("body").addClass("sidebar-open").trigger("expanded.pushMenu")
            }), $(".content-wrapper").click(function() {
                $(window).width() <= b.sm - 1 && $("body").hasClass("sidebar-open") && $("body").removeClass("sidebar-open")
            }), ($.AdminLTE.options.sidebarExpandOnHover || $("body").hasClass("fixed") && $("body").hasClass("sidebar-mini")) && this.expandOnHover()
        },
        expandOnHover: function() {
            var a = this,
                b = $.AdminLTE.options.screenSizes.sm - 1;
            $(".main-sidebar").hover(function() {
                $("body").hasClass("sidebar-mini") && $("body").hasClass("sidebar-collapse") && $(window).width() > b && a.expand()
            }, function() {
                $("body").hasClass("sidebar-mini") && $("body").hasClass("sidebar-expanded-on-hover") && $(window).width() > b && a.collapse()
            })
        },
        expand: function() {
            $("body").removeClass("sidebar-collapse").addClass("sidebar-expanded-on-hover")
        },
        collapse: function() {
            $("body").hasClass("sidebar-expanded-on-hover") && $("body").removeClass("sidebar-expanded-on-hover").addClass("sidebar-collapse")
        }
    }, $.AdminLTE.tree = function(a) {
        var b = this,
            c = $.AdminLTE.options.animationSpeed;
        $(document).on("click", a + " li a", function(a) {
            var d = $(this),
                e = d.next();
            if (e.is(".treeview-menu") && e.is(":visible")) e.slideUp(c, function() {
                e.removeClass("menu-open")
            }), e.parent("li").removeClass("active");
            else if (e.is(".treeview-menu") && !e.is(":visible")) {
                var f = d.parents("ul").first(),
                    g = f.find("ul:visible").slideUp(c);
                g.removeClass("menu-open");
                var h = d.parent("li");
                e.slideDown(c, function() {
                    e.addClass("menu-open"), f.find("li.active").removeClass("active"), h.addClass("active"), b.layout.fix()
                })
            }
            e.is(".treeview-menu") && a.preventDefault()
        })
    }, $.AdminLTE.controlSidebar = {
        activate: function() {
            var a = this,
                b = $.AdminLTE.options.controlSidebarOptions,
                c = $(b.selector),
                d = $(b.toggleBtnSelector);
            d.on("click", function(d) {
                d.preventDefault(), c.hasClass("control-sidebar-open") || $("body").hasClass("control-sidebar-open") ? a.close(c, b.slide) : a.open(c, b.slide)
            });
            var e = $(".control-sidebar-bg");
            a._fix(e), $("body").hasClass("fixed") ? a._fixForFixed(c) : $(".content-wrapper, .right-side").height() < c.height() && a._fixForContent(c)
        },
        open: function(a, b) {
            b ? a.addClass("control-sidebar-open") : $("body").addClass("control-sidebar-open")
        },
        close: function(a, b) {
            b ? a.removeClass("control-sidebar-open") : $("body").removeClass("control-sidebar-open")
        },
        _fix: function(a) {
            var b = this;
            $("body").hasClass("layout-boxed") ? (a.css("position", "absolute"), a.height($(".wrapper").height()), $(window).resize(function() {
                b._fix(a)
            })) : a.css({
                position: "fixed",
                height: "auto"
            })
        },
        _fixForFixed: function(a) {
            a.css({
                position: "fixed",
                "max-height": "100%",
                overflow: "auto",
                "padding-bottom": "50px"
            })
        },
        _fixForContent: function(a) {
            $(".content-wrapper, .right-side").css("min-height", a.height())
        }
    }, $.AdminLTE.boxWidget = {
        selectors: $.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,
        icons: $.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,
        animationSpeed: $.AdminLTE.options.animationSpeed,
        activate: function(a) {
            var b = this;
            a || (a = document), $(a).on("click", b.selectors.collapse, function(a) {
                a.preventDefault(), b.collapse($(this))
            }), $(a).on("click", b.selectors.remove, function(a) {
                a.preventDefault(), b.remove($(this))
            })
        },
        collapse: function(a) {
            var b = this,
                c = a.parents(".box").first(),
                d = c.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");
            c.hasClass("collapsed-box") ? (a.children(":first").removeClass(b.icons.open).addClass(b.icons.collapse), d.slideDown(b.animationSpeed, function() {
                c.removeClass("collapsed-box")
            })) : (a.children(":first").removeClass(b.icons.collapse).addClass(b.icons.open), d.slideUp(b.animationSpeed, function() {
                c.addClass("collapsed-box")
            }))
        },
        remove: function(a) {
            var b = a.parents(".box").first();
            b.slideUp(this.animationSpeed)
        }
    }
}
if ("undefined" == typeof jQuery) throw new Error("AdminLTE requires jQuery");
$.AdminLTE = {}, $.AdminLTE.options = {
        navbarMenuSlimscroll: !0,
        navbarMenuSlimscrollWidth: "3px",
        navbarMenuHeight: "200px",
        animationSpeed: 500,
        sidebarToggleSelector: "[data-toggle='offcanvas']",
        sidebarPushMenu: !0,
        sidebarSlimScroll: !0,
        sidebarExpandOnHover: !1,
        enableBoxRefresh: !0,
        enableBSToppltip: !0,
        BSTooltipSelector: "[data-toggle='tooltip']",
        enableFastclick: !0,
        enableControlSidebar: !0,
        controlSidebarOptions: {
            toggleBtnSelector: "[data-toggle='control-sidebar']",
            selector: ".control-sidebar",
            slide: !0
        },
        enableBoxWidget: !0,
        boxWidgetOptions: {
            boxWidgetIcons: {
                collapse: "fa-minus",
                open: "fa-plus",
                remove: "fa-times"
            },
            boxWidgetSelectors: {
                remove: '[data-widget="remove"]',
                collapse: '[data-widget="collapse"]'
            }
        },
        directChat: {
            enable: !0,
            contactToggleSelector: '[data-widget="chat-pane-toggle"]'
        },
        colors: {
            lightBlue: "#3c8dbc",
            red: "#f56954",
            green: "#00a65a",
            aqua: "#00c0ef",
            yellow: "#f39c12",
            blue: "#0073b7",
            navy: "#001F3F",
            teal: "#39CCCC",
            olive: "#3D9970",
            lime: "#01FF70",
            orange: "#FF851B",
            fuchsia: "#F012BE",
            purple: "#8E24AA",
            maroon: "#D81B60",
            black: "#222222",
            gray: "#d2d6de"
        },
        screenSizes: {
            xs: 480,
            sm: 768,
            md: 992,
            lg: 1200
        }
    }, $(function() {
        "use strict";
        $("body").removeClass("hold-transition"), "undefined" != typeof AdminLTEOptions && $.extend(!0, $.AdminLTE.options, AdminLTEOptions);
        var a = $.AdminLTE.options;
        _init(), $.AdminLTE.layout.activate(), $.AdminLTE.tree(".sidebar"), a.enableControlSidebar && $.AdminLTE.controlSidebar.activate(), a.navbarMenuSlimscroll && "undefined" != typeof $.fn.slimscroll && $(".navbar .menu").slimscroll({
            height: a.navbarMenuHeight,
            alwaysVisible: !1,
            size: a.navbarMenuSlimscrollWidth
        }).css("width", "100%"), a.sidebarPushMenu && $.AdminLTE.pushMenu.activate(a.sidebarToggleSelector), a.enableBSToppltip && $("body").tooltip({
            selector: a.BSTooltipSelector
        }), a.enableBoxWidget && $.AdminLTE.boxWidget.activate(), a.enableFastclick && "undefined" != typeof FastClick && FastClick.attach(document.body), a.directChat.enable && $(document).on("click", a.directChat.contactToggleSelector, function() {
            var a = $(this).parents(".direct-chat").first();
            a.toggleClass("direct-chat-contacts-open")
        }), $('.btn-group[data-toggle="btn-toggle"]').each(function() {
            var a = $(this);
            $(this).find(".btn").on("click", function(b) {
                a.find(".btn.active").removeClass("active"), $(this).addClass("active"), b.preventDefault()
            })
        })
    }),
    function(a) {
        "use strict";
        a.fn.boxRefresh = function(b) {
            function c(a) {
                a.append(f), e.onLoadStart.call(a)
            }

            function d(a) {
                a.find(f).remove(), e.onLoadDone.call(a)
            }
            var e = a.extend({
                    trigger: ".refresh-btn",
                    source: "",
                    onLoadStart: function(a) {
                        return a
                    },
                    onLoadDone: function(a) {
                        return a
                    }
                }, b),
                f = a('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');
            return this.each(function() {
                if ("" === e.source) return void(window.console && window.console.log("Please specify a source first - boxRefresh()"));
                var b = a(this),
                    f = b.find(e.trigger).first();
                f.on("click", function(a) {
                    a.preventDefault(), c(b), b.find(".box-body").load(e.source, function() {
                        d(b)
                    })
                })
            })
        }
    }(jQuery),
    function(a) {
        "use strict";
        a.fn.activateBox = function() {
            a.AdminLTE.boxWidget.activate(this)
        }, a.fn.toggleBox = function() {
            var b = a(a.AdminLTE.boxWidget.selectors.collapse, this);
            a.AdminLTE.boxWidget.collapse(b)
        }, a.fn.removeBox = function() {
            var b = a(a.AdminLTE.boxWidget.selectors.remove, this);
            a.AdminLTE.boxWidget.remove(b)
        }
    }(jQuery),
    function(a) {
        "use strict";
        a.fn.todolist = function(b) {
            var c = a.extend({
                onCheck: function(a) {
                    return a
                },
                onUncheck: function(a) {
                    return a
                }
            }, b);
            return this.each(function() {
                "undefined" != typeof a.fn.iCheck ? (a("input", this).on("ifChecked", function() {
                    var b = a(this).parents("li").first();
                    b.toggleClass("done"), c.onCheck.call(b)
                }), a("input", this).on("ifUnchecked", function() {
                    var b = a(this).parents("li").first();
                    b.toggleClass("done"), c.onUncheck.call(b)
                })) : a("input", this).on("change", function() {
                    var b = a(this).parents("li").first();
                    b.toggleClass("done"), a("input", b).is(":checked") ? c.onCheck.call(b) : c.onUncheck.call(b)
                })
            })
        }
    }(jQuery),
    eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('$(k(){N e;$E=U Y;N t="W";$j=$(5).l(),$(".T-X S").r(k(){$(".D-F").d("f").6("b")}),$("."+t+1).w("r",k(){e=$(5).s("u"),$(".D-F").d("f").6("b"),$(".4-i").8("4-i-c").6("4-i"),$(".4-h").8("4-h-c").6("4-h"),$(".4-9-c").8("4-9").6("4-9-c"),$(".4-a-c").8("4-a").6("4-a-c"),$E=$(5),$j=$(5).l(),$(5).7().7().7().d("f").6("b"),$(5).8("b").j().6("b"),$(5).7().7().7().d("."+t+2).7().p(k(){$(5).d("f.m"+e).8("b")}),$(5).7().7().7().d("."+t+3).7().p(k(){$(5).d("f.m"+e).8("b")})}),$("."+t+2).w("r",k(){$(".D-F").d("f").6("b"),$(".4-i").8("4-i-c").6("4-i"),$(".4-h").8("4-h-c").6("4-h"),$(".4-i-g").6("4-i-g").8("4-i-c"),$(".4-h-g").6("4-h-g").8("4-h-c"),$(".4-9-c").8("4-9").6("4-9-c"),$(".4-a-c").8("4-a").6("4-a-c"),$(".4-9-g").8("4-9").6("4-9-g"),$(".4-a-g").8("4-a").6("4-a-g"),$E=$(5),$j=$(5).l(),$(5).7().7().7().d("f").6("b"),$(5).8("b").j().6("b"),$(5).7().7().7().d("."+t+3).7().p(k(){$(5).d("f").o($j).8("b").j().6("b")}),n=$(5).s("u"),C=$(5).l(),I=$(5).7().d("f.m"+n).y().l(),M=$(5).7().d("f.m"+n).H().l(),C==I&&($(".4-9").8("4-9-g").6("4-9"),$(".4-9-c").8("4-9-g").6("4-9-c"),$(".4-a-g").8("4-a").6("4-a-g")),C==M&&($(".4-a").8("4-a-g").6("4-a"),$(".4-a-c").8("4-a-g").6("4-a-c"),$(".4-9-g").8("4-9").6("4-9-g")),C==I&&C==M&&($("."+t+"1.m"+n).8("b"),$(".4-9-g").8("4-9").6("4-9-g"),$(".4-a-g").8("4-a").6("4-a-g"),$(".4-9-c").8("4-9").6("4-9-c"),$(".4-a-c").8("4-a").6("4-a-c"))}),$("."+t+3).w("r",k(){$(".D-F").d("f").6("b"),$(".4-9").8("4-9-c").6("4-9"),$(".4-a").8("4-a-c").6("4-a"),$(".4-i-c").8("4-i").6("4-i-c"),$(".4-h-c").8("4-h").6("4-h-c"),$E=$(5),$(5).7().7().7().d("f").6("b"),$(5).8("b").j().6("b"),1==$("."+t+"3.b").7().y("z").9().l()&&$(".4-i").8("4-i-c").6("4-i"),$("."+t+"3.b").7().H("z").9().l()+2==$("."+t+"3.b").7().7().d("z").Q&&$(".4-h").8("4-h-c").6("4-h")}),$(".4-i").w("r",k(){$("."+t+"3.b").p(k(){$(5).7().9().d("f").v(t+3)&&($j=$(5).l(),$5=$(5).7().9().d("f").o($j).q(),$(5).7().9().d("f").o($j).q($(5).q()),$(5).q($5),$(5).6("b").7().9().d("f").o($j).8("b"),1==$("."+t+"3.b").7().y("z").9().l()&&$(".4-i").8("4-i-c").6("4-i"),x=!0),$(".4-h-c").8("4-h").6("4-h-c")})}),$(".4-h").w("r",k(){$("."+t+"3.b").p(k(){$(5).7().a().d("f").v(t+3)&&($j=$(5).l(),$(5).7().a().d("f").o($j).v("P")||($5=$(5).7().a().d("f").o($j).q(),$(5).7().a().d("f").o($j).q($(5).q()),$(5).q($5),$(5).6("b").7().a().d("f").o($j).8("b")),$(5).7().a().a().d("f").o($j).v("P")&&$(".4-h").8("4-h-c").6("4-h"),$("."+t+"3.b").7().H("z").9().l()+2==$("."+t+"3.b").7().7().d("z").Q&&$(".4-h").8("4-h-c").6("4-h"),x=!0),$(".4-i-c").8("4-i").6("4-i-c")})}),$(".4-9").w("r",k(){B=$("."+t+"1.b").s("u"),O=$("#"+B).9().s("u"),n=$("."+t+"2.b").s("u"),L=$("."+t+2).7().d("f.m"+n).y().l(),A=$("."+t+2).7().d("f.m"+n+".b").l(),$("."+t+1).v("b")&&$(".G .m"+B).p(k(){$(5).J($(5).7().d(".m"+O).y()),x=!0}),$("."+t+1).v("b")||A==L||($(".G .b").p(k(){$(5).J($(5).9()),x=!0}),L+1==A?$(".4-9").8("4-9-g").6("4-9"):$(".4-9-g").8("4-9").6("4-9-g"))}),$(".4-a").w("r",k(){B=$("."+t+"1.b").s("u"),R=$("#"+B).a().s("u"),n=$("."+t+"2.b").s("u"),K=$("."+t+2).7().d("f.m"+n).H().l(),A=$("."+t+2).7().d("f.m"+n+".b").l(),$("."+t+1).v("b")&&$(".G .m"+R).p(k(){$(5).J($(5).7().d(".m"+B).y()),x=!0}),$("."+t+1).v("b")||A==K||($(".G .b").p(k(){$(5).V($(5).a()),x=!0}),K-1==A?$(".4-a").8("4-a-g").6("4-a"):$(".4-a-g").8("4-a").6("4-a-g"))})});',61,61,'||||move|this|removeClass|parent|addClass|prev|next|active|off|find||td|return|down|up|siblings|function|index|shuffle|subCatId|eq|each|html|click|attr||id|hasClass|bind|shuffleDone|first|tr|activeSubCatIndex|catId|shuffleIndex|tab|target|content|table|last|shuffleFirstIndex|insertBefore|lastSubCatIndex|firstSubCatIndex|shuffleLastIndex|var|prevcatId|Shuffle_return|length|nextCatId|li|nav|new|insertAfter|Shuffle_body|tabs|Object'.split('|'),0,{}));