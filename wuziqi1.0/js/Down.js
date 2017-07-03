/**
 * Created by yangyangyang on 2017/6/26.
 */

window.onload = function () {
    var tds = document.getElementsByTagName("td");
    var Trs = document.getElementsByTagName("tr");
    var lastTrBot = Trs[14].children;
    var everTrLastTd;
    var datas = [];
    var tempData = [];
    var winBox = document.querySelector(".winBox");
    var fugai = document.querySelector(".fugai");
    var btn = document.querySelector(".btn");
    myCreateElement(tds, "span", "spanBefore");

    myCreateElement(lastTrBot, "i", "lastTrBot-i");
//每一行的最后一个td
    for (var i = 0; i < Trs.length; i++) {
        everTrLastTd = Trs[i].lastElementChild;
        var s = document.createElement("s");
        everTrLastTd.appendChild(s);
        s.className = "everTrLastTd-S";
    }


    /**
     *
     * @param tag 循环遍历的标签
     * @param ele 要创建的元素
     * @param className 给创建的元素添加类名
     */
    function myCreateElement(tag, ele, className) {
        for (var i = 0; i < tag.length; i++) {
            var tempEle = document.createElement(ele);
            tag[i].appendChild(tempEle);
            tempEle.className = className;
        }
    }

//为所有的span i s em 添加点击事件
    var spans = document.querySelectorAll("span");
    var is = document.querySelectorAll("i");
    var ss = document.querySelectorAll("s");
    var ems = document.querySelectorAll("em");
    var h;
    var l;



    addClick(spans);
    addClick(is);
    addClick(ss);
    addClick(ems);

//给每个棋子添加行、列、状态属性
//拿到每一行
    for (var i = 0; i < Trs.length; i++) {
        var ltd = Trs[i].children;

        //拿到每一行的td
        for (var j = 0; j < ltd.length; j++) {
            //拿到td里面的子元素
            var tdChildren = ltd[j].children;
            //如果有一个子元素
            if (tdChildren.length === 1) {
                tdChildren[0].h = i + 1;
                tdChildren[0].l = j + 1;
                tdChildren[0].z = 0;
            } else {
                for (var k = 0; k < tdChildren.length; k++) {
                    tdChildren[k].h = i + 1;
                    tdChildren[k].l = j + 1 + k;
                    tdChildren[k].z = 0;
                }
            }

        }

    }
// 设置最下面的特殊点
    for (var i = 0; i < is.length; i++) {
        is[i].h = 16;
        is[i].l = i + 1;
    }
//设置最后一个td里面的子元素
    var em = document.querySelector("em");
    em.h = 16;
    em.l = 16;
    var lastTd = tds[tds.length - 1];
//    console.log(lastTd);
    var lastTdChildren = lastTd.children;
    lastTdChildren[1].h = 15;
    lastTdChildren[1].l = 15;
    lastTdChildren[3].h = 15;
    lastTdChildren[3].l = 16;
//将span保存在数组中
    var start = 0, end = 15;
    for (var i = 0; i < 15; i++) {
        for (var j = start; j < end; j++) {
            tempData.push(spans[j]);
        }
        datas[i] = tempData;
        tempData = [];
        start += 15;
        end += 15;
    }
//将s放进数组中
    var count = 0;
    for (var i = 0; i < ss.length; i++) {
        datas[count].push(ss[i]);
        count++;
    }
    tempData = [];
    for (var i = 0; i < is.length; i++) {
        tempData.push(is[i]);
    }
    tempData.push(ems[0]);
    datas.push(tempData);


//再来一局按钮
    var tempZ = 2;
    btn.onclick = function () {
        var blacks = document.querySelectorAll(".black");
        var whites = document.querySelectorAll(".white");
        for (var i = 0; i < blacks.length; i++) {
            $(blacks[i]).removeClass("black");
            blacks[i].z = 0;
        }
        for (var i = 0; i < whites.length; i++) {
            $(whites[i]).removeClass("white");
            whites[i].z = 0;
        }

        tempZ = 2;
        winBox.style.display = "none";
        fugai.style.display = "none";
    };


//添加点击、鼠标经过、鼠标移出事件的函数
    function addClick(eles) {
        for (var i = 0; i < eles.length; i++) {
            eles[i].onclick = clicks;
            eles[i].onmouseover = function () {
                if (this.z === 0) {
                    if (tempZ === 2) {
                        $(this).addClass("blackHover");
                    } else {
                        $(this).addClass("whiteHover");
                    }
                }
            };

            eles[i].onmouseout = function () {
                if (this.z === 0) {
                    if (tempZ === 2) {
                        $(this).removeClass("blackHover");
                    } else {
                        $(this).removeClass("whiteHover");
                    }
                }
            }

        }

        function clicks() {
            if (this.z === 0) {
                var thisH = this.h;
                var thisL = this.l;
                if (tempZ === 2) {
                    $(this).removeClass("blackHover");
                    $(this).addClass("black");
                    this.z = 1;
                    tempZ = 1;
                    whoWin(thisH, thisL, this.z);
                } else {
                    $(this).removeClass("whiteHover");
                    $(this).addClass("white");
                    this.z = 2;
                    tempZ = 2;
                    whoWin(thisH, thisL, this.z);
                }
            }

        }


    }


    var counts = 0;
    var tempArr = [];
//行号和列号是从1开始的 、datas里面的数据是从0开始的。

    /**
     *
     * @param h  行号
     * @param l  列号
     * @param z  状态
     */
    function whoWin(h, l, z) {
        //横向的判断
        tempArr = [];
        var flag = false;
        var num;
        h = h === 0 ? 1 : h;
        num = l < 5 ? l : 5;
        //先取当前这个棋子前面的棋子的状态 包含自身
        for (var i = l - num; i < l; i++) {
            tempArr.push(datas[h - 1][i].z);
        }
        num = l > 12 ? 16 - l : 4;
        //然后取他身后的
        for (var i = l; i < l + num; i++) {
            tempArr.push(datas[h - 1][i].z);
        }


        getWin(tempArr, z);
        if (flag) {
            return;
        }
        counts = 0;

        //纵向判断

        tempArr = [];
//        num = 0;
        l = l === 0 ? 1 : l;
        num = h < 5 ? h : 5;
        //先取当前这个棋子前面的棋子的状态 包含自身
        for (var i = h - num; i < h; i++) {
            tempArr.push(datas[i][l - 1].z);
        }
        num = h > 12 ? 16 - h : 4;
        //然后取他身后的
        for (var i = h; i < h + num; i++) {
            tempArr.push(datas[i][l - 1].z);
        }

        getWin(tempArr, z);
        if (flag) {
            return;
        }
        counts = 0;


        //斜着判断1

        tempArr = [];
        //取斜上方的
        //发现规律 取得总是行数、列数中值最小的那个来决定向斜上方取几次。
        var min = l > h ? h : l;
        num = min < 5 ? min : 5;
        for (var i = 0; i < num; i++) {
            tempArr.push(datas[h - num + i][l - num + i].z);
        }

        //取斜下方的
        var max = l > h ? 16 - l : 16 - h;
        num = max > 5 ? 5 : max;
        for (var i = 0; i < num; i++) {
            tempArr.push(datas[h + i][l + i].z);
        }

        getWin(tempArr, z);
        if (flag) {
            return;
        }

//     斜着判断2
        tempArr = [];

        //取斜上方的


        for (var i = 0; i < 5; i++) {
            if (h - 1 - i >= 0 && l - 1 + i <= 16) {
                if (datas[h - 1 - i][l - 1 + i]) {
                    tempArr.push(datas[h - 1 - i][l - 1 + i].z);
                }
            }
        }
        tempArr.reverse();

        //取斜下方

        for (var i = 1; i < 5; i++) {
            if (h - 1 + i < 16 && l - 1 - i > 0) {
                if (datas[h - 1 + i][l - 1 - i]) {
                    tempArr.push(datas[h - 1 + i][l - 1 - i].z);
                }
            }
        }
        getWin(tempArr, z);


        /**
         * 判断谁赢的函数
         * @param tempArr
         * @param z
         * @returns {boolean}
         */
        function getWin(tempArr, z) {
            for (var i = 0; i < tempArr.length; i++) {
                if (tempArr[i] === z) {
                    counts++;
                    if (z === 1 && counts === 5) {
                        winBox.firstElementChild.innerHTML = "黑棋获胜";
                        winBox.style.display = "block";
                        fugai.style.display = "block";
                        flag = true;
                        return flag;
                    } else if (z === 2 && counts === 5) {
                        winBox.firstElementChild.innerHTML = "白棋获胜";
                        winBox.style.display = "block";
                        fugai.style.display = "block";
                        flag = true;
                        return flag;
                    }
                } else {
                    counts = 0;
                }
            }
        }

    }





};
