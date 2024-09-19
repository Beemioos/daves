let vvv = document.querySelector('.vhod')
let qqq = document.querySelector('.vhooood')
vvv.addEventListener('click', () => {
	if (qqq.classList.contains('vhooood')) {
		qqq.classList.toggle('open')
		qqq.classList.remove('vhooood')
		scrollController.dis()
	}
})

let www = document.querySelector('.hh')
let ooo = document.querySelector('.rrr')
ooo.addEventListener('click', () => {
	if (www.classList.contains('hh')) {
		www.classList.remove('open')
		www.classList.add('vhooood')
		scrollController.en()
	}
})
let btn = document.querySelector('.btn1')
btn.addEventListener('click', () => {
	if (www.classList.contains('hh')) {
		www.classList.remove('open')
		www.classList.add('vhooood')
		scrollController.en()
	}
})

const scrollController = {
	dis() {
		document.body.style.cssText = 'overflow:hidden;'
	},
	en() {
		document.body.style.cssText = ''
	},
}

let rega = document.querySelector('.registr')
let mRega = document.querySelector('.rega')
rega.addEventListener('click', () => {
	if (mRega.classList.contains('rega')) {
		mRega.classList.toggle('open')
		mRega.classList.remove('rega')
		scrollController.dis()
	}
})

let ppp = document.querySelector('.rr')
let iii = document.querySelector('.rrrRega')
iii.addEventListener('click', () => {
	if (ppp.classList.contains('rr')) {
		ppp.classList.remove('open')
		ppp.classList.add('rega')
		scrollController.en()
	}
})
let btnRega = document.querySelector('.btn1Rega')
btnRega.addEventListener('click', () => {
	if (ppp.classList.contains('rr')) {
		ppp.classList.remove('open')
		ppp.classList.add('rega')
		scrollController.en()
	}
})

let kkk = document.querySelector('.burger')
let jjj = document.querySelector('.heeeeddd')
kkk.addEventListener('click', () => {
	if (jjj.classList.contains('heeeeddd')) {
		jjj.classList.toggle('openHeader')
		jjj.classList.remove('heeeeddd')
		scrollController.dis()
	} else {
		jjj.classList.toggle('heeeeddd')
		jjj.classList.remove('openHeader')
		scrollController.en()
	}
})

let toggle = document.querySelector('.menu__btn')
toggle.addEventListener('click', () => {
	toggle.classList.toggle('opened')
})

let vhod = document.querySelector('.vhod')
vhod.addEventListener('click', () => {
	toggle.classList.toggle('opened')
	jjj.classList.toggle('heeeeddd')
	jjj.classList.remove('openHeader')
	scrollController.dis()
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth',
	})
})
let registr = document.querySelector('.registr')
registr.addEventListener('click', () => {
	toggle.classList.toggle('opened')
	jjj.classList.toggle('heeeeddd')
	jjj.classList.remove('openHeader')
	scrollController.dis()
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth',
	})
})

const tree = document.getElementById('tree')
tree.addEventListener('click', () => {
	toggle.classList.toggle('opened')
	jjj.classList.toggle('heeeeddd')
	jjj.classList.remove('openHeader')
	scrollController.en()

	document.querySelector('.container1').scrollIntoView({
		behavior: 'smooth',
		block: 'start',
	})
})

const tho = document.getElementById('tho')
tho.addEventListener('click', () => {
	toggle.classList.toggle('opened')
	jjj.classList.toggle('heeeeddd')
	jjj.classList.remove('openHeader')
	scrollController.en()

	document.querySelector('.container__4').scrollIntoView({
		behavior: 'smooth',
		block: 'start',
	})
})

const one = document.getElementById('one')
one.addEventListener('click', () => {
	toggle.classList.toggle('opened')
	jjj.classList.toggle('heeeeddd')
	jjj.classList.remove('openHeader')
	scrollController.en()
	document.querySelector('.container11').scrollIntoView({
		behavior: 'smooth',
		block: 'start',
	})
})
