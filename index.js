const path = document.querySelector('.path')
const menuToggle = document.querySelector('.menu-tog')
const ul = document.querySelector('ul')

function lerp(start, end, t){
    return start * (1 - t) + end * t 
}

let toggle = false 
let y = 100
let c = 100

function animate(){
    if(toggle){
        y = lerp(y, 0, 0.065).toFixed(2)
        c = lerp(c, 0, 0.085).toFixed(2)
        path.setAttribute('d', `M 0 ${y} L 0 100 100 100 100 ${y} C 50 ${c}, 50 ${c}, 0 ${y}`)
    }else{
        y = lerp(y, 100, 0.065).toFixed(2)
        c = lerp(c, 100, 0.085).toFixed(2)
        path.setAttribute('d', `M 0 ${y} L 0 100 100 100 100 ${y} C 50 ${c}, 50 ${c}, 0 ${y}`)
    }
    requestAnimationFrame(animate)
}

menuToggle.addEventListener('click', () => {
    setTimeout(() => {
        toggle = !toggle
    }, 300) // svg 애니메이션 효과가 진행되는 시간

    // 조건문은 setTimeout 보다 먼저 실행됨 (그러므로 초기 toggle 은 false)
    // setTimeout 중에서 toggle 이 먼저 뒤바뀌어서 svg 애니메이션이 먼저 실행되고, 그 다음으로 ul 태그가 1초 후에 나타남
    // 즉, svg 애니메이션은 메뉴 클릭후 0.3초 후에 시작되고, 1초후에 ul 태그가 나타난다
    
    // 다시 클릭하면 toggle 이 true 이므로 ul 태그가 먼저 사라지고, 0.3초 후에 svg 애니메이션이 시작된다.
    if(toggle){
        ul.classList.remove('active') // svg 애니메이션 적용전 메뉴 숨기기
    }else{
        setTimeout(() => {
            ul.classList.add('active') // 메뉴 보여주기
        }, 1000) // svg 애니메이션 효과가 진행되는 시간
    }
    menuToggle.classList.toggle('active')
})

animate()