var time = 0

document.querySelector('.scroll-wrapper-2').scrollTop = 1000
document.querySelector('.scroll-wrapper-3').scrollTop = 1000
document.querySelector('.scroll-wrapper-4').scrollTop = 1000
document.querySelector('.scroll-wrapper-5').scrollTop = 1000

document.querySelector('.btn-add-data-1').addEventListener('click', function () {
    time = time + 1
    document.querySelector('.scroll-wrapper-1').innerHTML = getHtml()
})

document.querySelector('.btn-add-data-2').addEventListener('click', function () {
    time = time + 1
    // 先隐藏，再清空数据，再填充数据，再显示
    var el = document.querySelector('.scroll-wrapper-2')
    el.style.display = 'none'
    el.innerHTML = ''
    el.innerHTML = getHtml()
    el.style.display = 'block'
    // 可以看到最后的结果是，滚动条保留之前的状态
})

document.querySelector('.btn-add-data-3').addEventListener('click', function () {
    time = time + 1
    // 先隐藏，再清空数据，再显示，再填充数据，
    var el = document.querySelector('.scroll-wrapper-3')
    el.style.display = 'none'
    el.innerHTML = ''
    el.style.display = 'block'
    el.innerHTML = getHtml()
    // 可以看到最后的结果是，滚动条保留之前的状态
})

document.querySelector('.btn-add-data-4').addEventListener('click', function () {
    time = time + 1
    // 先隐藏，再清空数据，再显示，一个微任务后，再填充数据，
    var el = document.querySelector('.scroll-wrapper-4')
    el.style.display = 'none'
    el.innerHTML = ''
    el.style.display = 'block'
    new Promise((r) => {
        r()
    }).then(() => {
        // 微任务在dom渲染前触发，虽然第41行的代码已经设置了el.style.display = 'block'，但是执行到这里（第46行）时，el还是隐藏状态
        el.innerHTML = getHtml()
    })
    // 可以看到最后的结果是，滚动条保留之前的状态
})

document.querySelector('.btn-add-data-5').addEventListener('click', function () {
    time = time + 1
    // 先隐藏，再清空数据，再显示，一个settimeout(宏任务)后，再填充数据，
    var el = document.querySelector('.scroll-wrapper-5')
    el.style.display = 'none'
    el.innerHTML = ''
    el.style.display = 'block'
    setTimeout(() => {
        el.innerHTML = getHtml()
    }, 0)
    // 滚动条重置了（但是内容会闪烁一下）
})

// 对比按钮3、4、5，从隐藏状态切换到显示状态后，要在一个宏任务后，重新渲染子元素，才可以让scrollTop不保留上次的值
// 因为微任务是在DOM渲染前触发，宏任务是在DOM渲染后触发


function getHtml() {
    var html = Array(10).fill(0).map(item => {
        return `<p>数据项${time}</p>`
    }).join('')
    return html
}