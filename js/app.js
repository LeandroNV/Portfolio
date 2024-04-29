const links = document.querySelectorAll(".link-magnetic");
const cursor = document.querySelector(".cursor");
let move;
let xMove;
let yMove;

/* Custom Cursor &  Magnetic Links */

const animateMe = function (e) {
	const span = this.querySelector(".link-text");
	const { offsetX: x, offsetY: y } = e,
		{ offsetWidth: width, offsetHeight: height } = this;

	move = 15;
	xMove = (x / width) * (move * 2) - move;
	yMove = (y / height) * (move * 3) - move;

	span.style.transform = `translate(${xMove}px, ${yMove}px)`;

	if (e.type === "mouseleave") span.style.transform = "";
};

const editCursor = (e) => {
	const { clientX: x, clientY: y } = e;
	cursor.style.left = x + "px";
	cursor.style.top = y + "px";
};

const handleMouseMove = (e) => {
	if (window.innerWidth > 768) {
		editCursor(e);
	}
};

const addEventListeners = () => {
	links.forEach((link) => link.addEventListener("mousemove", animateMe));
	links.forEach((link) => link.addEventListener("mouseleave", animateMe));
	window.addEventListener("mousemove", handleMouseMove);
};

const removeEventListeners = () => {
	links.forEach((link) => link.removeEventListener("mousemove", animateMe));
	links.forEach((link) => link.removeEventListener("mouseleave", animateMe));
	window.removeEventListener("mousemove", handleMouseMove);
};

if (window.innerWidth > 768) {
	addEventListeners();
} else {
	removeEventListeners();
}

window.addEventListener("resize", () => {
	if (window.innerWidth > 768) {
		addEventListeners();
	} else {
		removeEventListeners();
	}
});

window.addEventListener("resize", () => {
	const logoLink = document.querySelector(".header_logo-link");
	if (window.innerWidth <= 768) {
		logoLink.classList.remove("link-magnetic");
	} else {
		logoLink.classList.add("link-magnetic");
	}
});

// Verificar el tamaño de la ventana al cargar la página
window.addEventListener("load", () => {
	const logoLink = document.querySelector(".header_logo-link");
	if (window.innerWidth <= 768) {
		logoLink.classList.remove("link-magnetic");
	} else {
		logoLink.classList.add("link-magnetic");
	}
});

/*=======================LENIS==================== */
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
	lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

/*================================================ */

/*=======================MENU==================== */
window.addEventListener("scroll", function () {
	const button = document.getElementById("navButton");
	const scrollPositionToShowButton = 500;
	if (window.scrollY > scrollPositionToShowButton) {
		button.classList.add("expanded");
	} else {
		button.classList.remove("expanded");
	}
});
/*================================================ */

/*===============ANIMACIONES GSAP================= */
document.addEventListener("DOMContentLoaded", (event) => {
	gsap.registerPlugin(ScrollTrigger);

	const hero = document.getElementById("hero");
	const navBar = document.getElementById("headerNav");
	const button = document.getElementById("navButton");
	const overlay = document.getElementById("navOverlay");
	const mobileLinks = document.querySelectorAll(".mobile_link");

	// Disminución Scroll de la opacidad del hero
	gsap.to(hero, {
		opacity: 0,
		scrollTrigger: {
			trigger: hero,
			start: "top top",
			end: "65%",
			scrub: true,
		},
	});

	// Animación del navBar
	gsap.to(navBar, {
		y: -200,
		scrollTrigger: {
			trigger: navBar,
			start: "top 0.1%",
			end: "200%",
			scrub: true, // La animación se ajusta al scroll
		},
	});

	/* ANIMACIÓN DEL MENÚ */
	gsap.set(".mobile", { xPercent: 0, autoAlpha: 1 });
	gsap.set(".mobile_overlay", { autoAlpha: 0 });

	let menu = gsap
		.timeline({ paused: true, reversed: true })
		.to(".mobile_overlay", {
			autoAlpha: 0.4,
			duration: 0.1,
		})
		.from(".mobile", {
			xPercent: 105,
			duration: 0.8,
			ease: "power1.out",
		})

		.from(".mobile_link", 0.2, {
			autoAlpha: 0,
			y: 25,
			stagger: 0.1,
		});

	/* ANIMACIÓN DEL BOTÓN HAMBURGUESA */

	button.addEventListener("click", function () {
		//Desplegar el menú y animar el botón
		toggleHamburger();
		toggleMenu();
	});

	mobileLinks.forEach((link) => {
		link.addEventListener("click", function () {
			toggleHamburger();
			toggleMenu();
		});
	});

	function toggleHamburger() {
		document.getElementById("hamburger").classList.toggle("active");
	}

	function toggleMenu() {
		menu.reversed()
			? menu.timeScale(1).play()
			: menu.timeScale(2).reverse();
	}

	/* PANEL */

	gsap.utils.toArray(".services_section").forEach((panel) => {
		ScrollTrigger.create({
			y: 500,
			trigger: panel,
			start: "top top",
			pin: true,
			pinSpacing: false,
		});
	});
});

/*================================================ */

/* =================PRELOADER===================== */

const preloader = document.getElementById("preloader");

const tl = new gsap.timeline();

gsap.set(".header_nav", { autoAlpha: 0 });
gsap.set(".bounces", { autoAlpha: 0 });

tl.to("#preloader-text-01", {
	duration: 0.5,
	opacity: 0,
	ease: "Power3.easeOut",
})
	.to("#preloader-text-02", {
		duration: 0.5,
		opacity: 1,
		ease: "Power3.easeOut",
	})
	.to("#preloader-text-02", {
		duration: 0.5,
		opacity: 0,
		ease: "Power3.easeOut",
	})
	.to("#preloader-text-03", {
		duration: 0.5,
		opacity: 1,
		ease: "Power3.easeOut",
	})
	.to("#preloader-text-03", {
		duration: 0.5,
		opacity: 0,
		ease: "Power3.easeOut",
	})
	.to(".preloader", {
		duration: 1,
		height: "0vh",
		ease: "Power3.easeOut",
	})
	.from(".hero_title-left", {
		duration: 1,
		delay: -0.8,
		y: 350,
		skewY: 10,
		stagger: {
			amount: 0.4,
		},
		ease: "Power3.easeOut",
	})
	.from(".hero_title-right", {
		duration: 1,
		delay: -1,
		y: 350,
		skewY: 10,
		stagger: {
			amount: 0.4,
		},
		ease: "Power3.easeOut",
	})
	.from(".hero_description p", {
		duration: 1,
		delay: -0.9,
		y: 200,
		skewY: 15,
		stagger: {
			amount: 0.4,
		},
		ease: "Power3.easeOut",
	})
	.to(".bounces", {
		duration: 2,
		delay: -1.2,
		autoAlpha: 1,
		ease: "Power3.easeOut",
	})
	.to(".header_nav", {
		duration: 2,
		delay: -1.4,
		autoAlpha: 1,
		ease: "Power3.easeOut",
	});

/*===========================================================*/

/*===================Alerta Proyecto========================= */
function alert() {
	Swal.fire({
		position: "bottom-start",
		icon: "warning",
		title: "Proyecto en construcción...",
		showConfirmButton: false,
		timer: 1500,
		background: "#090908",
		color: "#D1D1C7",
	});
}
