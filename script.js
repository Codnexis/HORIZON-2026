/* =================================================
   DOM
================================================= */

const body = document.body;

const preloader =
    document.getElementById("preloader");

const music =
    document.getElementById("memorySong");

const musicToggle =
    document.getElementById("musicToggle");

const heroMusicBtn =
    document.getElementById("heroMusicBtn");

const musicPlayer =
    document.getElementById("musicPlayer");

const musicIcon =
    musicToggle.querySelector("i");

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");

const memoryModal =
    document.getElementById("memoryModal");

const addMemoryBtn =
    document.getElementById("addMemoryBtn");

const modalClose =
    document.getElementById("modalClose");

const memoryForm =
    document.getElementById("memoryForm");

const backTop =
    document.getElementById("backTop");

const cursorDot =
    document.getElementById("cursorDot");

const cursorRing =
    document.getElementById("cursorRing");


/* =================================================
   PAGE LOADER
================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        preloader.classList.add("hide");

    }, 700);

});


/* =================================================
   CUSTOM CURSOR
================================================= */

if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    window.addEventListener(
        "mousemove",
        (event) => {

            cursorDot.style.left =
                `${event.clientX}px`;

            cursorDot.style.top =
                `${event.clientY}px`;

            cursorRing.style.left =
                `${event.clientX}px`;

            cursorRing.style.top =
                `${event.clientY}px`;

        }
    );


    const hoverElements =
        document.querySelectorAll(
            "a, button, .gallery-item, .memory-photo"
        );


    hoverElements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                body.classList.add(
                    "cursor-hover"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                body.classList.remove(
                    "cursor-hover"
                );

            }
        );

    });

}


/* =================================================
   MOBILE MENU
================================================= */

mobileMenuBtn.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle(
            "active"
        );

    }
);


document
    .querySelectorAll(
        ".mobile-menu a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "active"
                );

            }
        );

    });


/* =================================================
   MUSIC
================================================= */

function toggleMusic() {

    if (music.paused) {

        music.play()
            .then(() => {

                musicPlayer.classList.add(
                    "playing"
                );

                musicIcon.classList.remove(
                    "fa-play"
                );

                musicIcon.classList.add(
                    "fa-pause"
                );

            })
            .catch(() => {

                console.log(
                    "Music could not be played."
                );

            });

    } else {

        music.pause();

        musicPlayer.classList.remove(
            "playing"
        );

        musicIcon.classList.remove(
            "fa-pause"
        );

        musicIcon.classList.add(
            "fa-play"
        );

    }

}


musicToggle.addEventListener(
    "click",
    toggleMusic
);


heroMusicBtn.addEventListener(
    "click",
    toggleMusic
);


music.addEventListener(
    "ended",
    () => {

        musicPlayer.classList.remove(
            "playing"
        );

        musicIcon.classList.remove(
            "fa-pause"
        );

        musicIcon.classList.add(
            "fa-play"
        );

    }
);


/* =================================================
   SMOOTH NAVIGATION
================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =================================================
   IMAGE LIGHTBOX
================================================= */

const photoButtons =
    document.querySelectorAll(
        ".photo-open"
    );


photoButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const image =
                button.dataset.image;

            lightboxImage.src = image;

            lightbox.classList.add(
                "active"
            );

            body.classList.add(
                "modal-open"
            );

        }
    );

});


function closeLightbox() {

    lightbox.classList.remove(
        "active"
    );

    body.classList.remove(
        "modal-open"
    );

    setTimeout(() => {

        lightboxImage.src = "";

    }, 300);

}


lightboxClose.addEventListener(
    "click",
    closeLightbox
);


lightbox.addEventListener(
    "click",
    (event) => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeLightbox();

            closeMemoryModal();

        }

    }
);


/* =================================================
   SCROLL REVEAL
================================================= */

const revealElements =
    document.querySelectorAll(
        ".intro-grid, .memory, .gallery-item, .note, .paper-card, .quote-section, .future-inner"
    );


revealElements.forEach(
    element => {

        element.classList.add(
            "reveal"
        );

    }
);


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* =================================================
   COUNTER
================================================= */

let counterStarted = false;


function startCounters() {

    if (counterStarted) return;

    counterStarted = true;


    const counters =
        document.querySelectorAll(
            ".counter"
        );


    counters.forEach(counter => {

        const target =
            Number(
                counter.dataset.count
            );

        let current = 0;

        const increment =
            Math.max(
                1,
                Math.ceil(
                    target / 40
                )
            );


        const timer =
            setInterval(
                () => {

                    current += increment;

                    if (
                        current >= target
                    ) {

                        current = target;

                        clearInterval(
                            timer
                        );

                    }

                    counter.textContent =
                        String(current)
                        .padStart(2, "0");

                },
                40
            );

    });

}


const statsObserver =
    new IntersectionObserver(
        entries => {

            if (
                entries[0].isIntersecting
            ) {

                startCounters();

                statsObserver.disconnect();

            }

        },
        {
            threshold: .5
        }
    );


const statsSection =
    document.querySelector(
        ".stats-section"
    );


if (statsSection) {

    statsObserver.observe(
        statsSection
    );

}


/* =================================================
   ADD MEMORY MODAL
================================================= */

function openMemoryModal() {

    memoryModal.classList.add(
        "active"
    );

    body.classList.add(
        "modal-open"
    );

}


function closeMemoryModal() {

    memoryModal.classList.remove(
        "active"
    );

    body.classList.remove(
        "modal-open"
    );

}


addMemoryBtn.addEventListener(
    "click",
    openMemoryModal
);


modalClose.addEventListener(
    "click",
    closeMemoryModal
);


memoryModal.addEventListener(
    "click",
    event => {

        if (
            event.target === memoryModal
        ) {

            closeMemoryModal();

        }

    }
);


/* =================================================
   SAVE MEMORY
================================================= */

memoryForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const title =
            document.getElementById(
                "memoryTitle"
            ).value.trim();


        const date =
            document.getElementById(
                "memoryDate"
            ).value;


        const text =
            document.getElementById(
                "memoryText"
            ).value.trim();


        const memory = {

            id: Date.now(),

            title,

            date,

            text

        };


        const oldMemories =
            JSON.parse(
                localStorage.getItem(
                    "myMemories"
                )
            ) || [];


        oldMemories.push(
            memory
        );


        localStorage.setItem(
            "myMemories",
            JSON.stringify(
                oldMemories
            )
        );


        memoryForm.reset();


        closeMemoryModal();


        showMemorySavedMessage();

    }
);


/* =================================================
   SAVE MESSAGE
================================================= */

function showMemorySavedMessage() {

    const message =
        document.createElement(
            "div"
        );


    message.textContent =
        "♥ Memory saved in this browser";


    message.style.position =
        "fixed";

    message.style.left =
        "50%";

    message.style.bottom =
        "30px";

    message.style.transform =
        "translateX(-50%)";

    message.style.padding =
        "14px 22px";

    message.style.background =
        "#9d2d32";

    message.style.color =
        "#fff";

    message.style.borderRadius =
        "30px";

    message.style.fontSize =
        "12px";

    message.style.zIndex =
        "10000";

    message.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.15)";


    document.body.appendChild(
        message
    );


    setTimeout(() => {

        message.remove();

    }, 2500);

}


/* =================================================
   BACK TO TOP
================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 600
        ) {

            backTop.classList.add(
                "visible"
            );

        } else {

            backTop.classList.remove(
                "visible"
            );

        }

    }
);


backTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =================================================
   PARALLAX HERO
================================================= */

const heroImage =
    document.querySelector(
        ".hero-image"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY < window.innerHeight
        ) {

            const movement =
                window.scrollY * 0.12;

            heroImage.style.transform =
                `scale(1.03)
                 translateY(${movement}px)`;

        }

    }
);


/* =================================================
   PAGE TITLE CHANGE
================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            document.title =
                "Come back to your memories ♥";

        } else {

            document.title =
                "My Memory Book — A Journey to Remember";

        }

    }
);


/* =================================================
   PREVENT EMPTY IMAGE ERRORS
================================================= */

document
    .querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.background =
                    "#f1e4ca";

                image.alt =
                    "Memory image";

            }
        );

    });
