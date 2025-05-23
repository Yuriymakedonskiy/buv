"use client";
import { MuseoModerno, Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from '@studio-freight/lenis'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from '@/app/components/animateFigure';
import { Pincode } from "./components/pincode";

gsap.registerPlugin(ScrollTrigger);
const MuseoModernoT = MuseoModerno({
  variable: "--font-museomoderno",
  subsets: ["latin"],
});
const SignikaT = Inter({
  variable: "--font-signika",
  subsets: ["latin"],
});
import Image from "next/image";
import styles from "./page.module.scss";
import about from "./about.module.scss";
import projects from "./projects.module.scss";
import contacts from "./contacts.module.scss";
import stack from "./stack.module.scss";
import skills from "./youandme.module.scss";



const models = [
  '/3D/iam.glb',
  '/3D/sherlock.glb',
  '/3D/realism.glb',
];


export default function Home() {
  const cursorRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const about__text_anim = useRef(null);
  const headerRef = useRef(null);
  const lastScroll = useRef(0)
  const bannerRef = useRef(null);
  const banner__end = useRef(null);
  const daliSound = useRef(null);
  const isAudioPlayingDali = useRef(false);
  const [isOpenJournal, setIsOpenJournal] = useState(false);
  const popupJournalRef = useRef(null);
  const buttonJournalRef = useRef(null);


  // window.scrollTo(0, 0)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Плавность прокрутки
      easing: (t) => t, // Линейное движение
      smoothWheel: true,
      smoothTouch: false,
    });

    // Рендерим анимацию
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Удалить при размонтировании компонента
    };
  }, []);


useEffect(() => {
    gsap.from(headerRef.current, {
      y: -200,        // сдвиг сверху
      opacity: 0,     // из полной прозрачности
      duration: 2,    // длительность анимации
      ease: 'power4.out',
    });
  }, []);

  useEffect(() => {
    gsap.from(banner__end.current, {
      opacity: 0,     // из полной прозрачности
      duration: 2,    // длительность анимации
      ease: 'power4.in',
    });
  }, []);

const introSound = useRef(null);
  const aboutRef = useRef(null);

  const playIntro = () => {
    const audio = introSound.current;
    if (!audio) return;

    if (!audio.paused) {
      // Уже играет
      return;
    }

    audio.play()
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

const [isClient, setIsClient] = useState(false);

  // useEffect для "разрешения" клиентской логики
  useEffect(() => {
    setIsClient(true);
  }, []);

  const ScrollStack = (e) => {
    e.preventDefault();
    if (!isClient) return;
    const el = document.getElementById("stack");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ScrollProjects = (e) => {
    e.preventDefault();
    if (!isClient) return;
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const playAudioDali = () => {
    if (!isClient) return;
    if (daliSound.current) {
      daliSound.current.play();
    }
  };

  useEffect(() => {
    if (isOpenJournal) {
      gsap.to(buttonJournalRef, {
        position: 'absolute', left: 50, top: 10, zIndex: 99999, duration: 1, ease: 'power2.out'
      });


      gsap.to(popupJournalRef.current, {
        opacity: 1,
        scale: 1,
        // visibility: 'visible',
        duration: 1,
        ease: 'power5.inOut',

        zIndex: 999,
      });
    } else {
      gsap.to(popupJournalRef.current, {
        opacity: 0,
        scale: 0,
        ease: 'power5.inOut',
        // visibility: 'hidden',
        zIndex: 0,
        duration: 1,
      });
    }
  }, [isOpenJournal]);


  useEffect(() => {
    const banner__header_logo = document.querySelector('.banner__header_logo');
    const banner = document.querySelector('.banner');
    // Логика смены текста
    const changeText = (newText) => {
      gsap.to(banner__header_logo, {
        duration: 1,
        opacity: 0,
        onComplete: () => {
          banner__header_logo.textContent = newText;
          gsap.to(banner__header_logo, { opacity: 1 });
        },
      });
    };
    return () => {
      ScrollTrigger.killAll();
    };
  }, []);
  useEffect(() => {
    const header = headerRef.current;
    ScrollTrigger.create({
      start: 'top top',
      onUpdate: (self) => {
        const currentScroll = self.scroll();
        console.log(lastScroll.current)
        if (currentScroll > lastScroll.current && currentScroll > 50) {
          // Прокрутка вниз — скрываем шапку
          gsap.to(header, { y: '-100%', duration: 0.3, ease: 'power2.out' });
        } else {
          // Прокрутка вверх — показываем шапку
          gsap.to(header, { y: '0%', duration: 0.3, ease: 'power2.out' });
        }
        lastScroll.current = currentScroll;
      },
    });
    return () => {
      ScrollTrigger.killAll();
    };
  }, []);
  useEffect(() => {
    const banner = document.querySelector('.banner');
    const header = document.querySelector('.banner__header');
    const daliPhoto = document.querySelector('.banner__dali_img');
    const logo = document.querySelector('.banner__logo');
    // Таймер для запуска эффектов через 2 секунды
    const timer = setTimeout(() => {
      if (header) {
        gsap.to(header, {
          background: '#11181e', // Новый цвет фона
          duration: 1,
          ease: 'power2.out',
        });
      }
      if (banner) {
        gsap.to(banner, {
          background: '#11181e', // Новый цвет фона
          duration: 1,
          ease: 'power2.out',
        });
      }
      if (logo) {
        gsap.to(logo, {
          color: '#fff',
          webkitTextStroke: '0.2rem #fff',
          webkitTextFillColor: 'transparent',
          duration: 1,
          ease: 'power2.out',
        });
      }
      // Анимация мерцания фото
      if (daliPhoto) {
        gsap.to(daliPhoto, {
          opacity: 1,
          duration: 0.6,
          display: 'block',
          repeat: 4, // Количество мерцаний
          yoyo: true, // Обратное мерцание
          ease: 'bounce.out',
        });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const cursor = cursorRef.current;
    // Движение курсора
    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: .2,
        ease: "power2.out",
      });
    };
    // Изменение цвета на белом тексте
    const onMouseEnter = () => {
      gsap.to(cursor, {
        backgroundColor: "#fff",
        scale: 2.5,
        duration: .2,
      });
    };
    const onMouseEnterBig = () => {
      gsap.to(cursor, {
        backgroundColor: "#fff",
        scale: 23,
        duration: .2,
      });
    };
    const onMouseEnterAbout = () => {
      gsap.to(cursor, {
        scale: 0,
        duration: .2,
      });
    };
    const onMouseLeave = () => {
      gsap.to(cursor, {
        backgroundColor: "white",
        scale: 1,
        duration: .2,
      });
    };
    // Навешиваем события на элементы с белым текстом
    const cursorHoverElements = document.querySelectorAll(".cursorHover");
    cursorHoverElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });
    const cursorHoverElementsBig = document.querySelectorAll(".cursorHoverBig");
    cursorHoverElementsBig.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterBig);
      el.addEventListener("mouseleave", onMouseLeave);
    });
    const cursorHoverElementsAbout = document.querySelectorAll(".about__text_anim");
    cursorHoverElementsAbout.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterAbout);
      el.addEventListener("mouseleave", onMouseLeave);
    });
    // Следим за движением мыши
    window.addEventListener("mousemove", onMouseMove);
    // Убираем обработчики при размонтировании
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cursorHoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
      cursorHoverElementsBig.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterBig);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);
  // Обработчик наведения
  const handleMouseEnter = (imageSrc) => {
    if (imageRef.current) {
      imageRef.current.src = imageSrc;
    }
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };
  // Обработчик ухода мыши
  const handleMouseLeave = () => {
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };
  // Обработчик перемещения мыши
  const handleMouseMove = (e) => {
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        x: e.clientX + 20,
        y: e.clientY + 20,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };
  useEffect(() => {
    const aboutBlock = document.querySelector(".about");
    const about__saying = document.querySelector(".about__saying");
    const chapay = document.querySelector(".about__photo");
    gsap.to(chapay, {
      scrollTrigger: {
        trigger: chapay,
        start: "-40px 15%",
        end: "bottom bottom",
        scrub: true,
      },
      "--scale": 1.1,      // Изменяем масштаб псевдоэлемента
      "--opacity": 1,    // Меняем прозрачность псевдоэлемента
      duration: 1,
    });
    gsap.to(about__saying,
      {
        scrollTrigger: {
          trigger: chapay,
          start: "-40px 15%",
          end: "bottom bottom",
          scrub: true,
        },
        scale: 1,
        opacity: 1,
        duration: 1,
      });
  }, []);
  useEffect(() => {
    const stack = document.querySelector(".stack");
    const stack__scroll = document.querySelectorAll(".stack__scroll_anim");
    const stack__saying = document.querySelector(".stack__saying");
    const stack__body = document.querySelector(".stack__body");
    const stack__float = document.querySelector(".stack__float");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stack,      // Элемент, который запускает анимацию
        start: "top center", // Начало триггера
        end: "center 40%", // Конец триггера
      },
    });
    // Первая анимация: движение и появление
    tl.fromTo(
      stack__scroll,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    );


    tl.to(stack__body,
      {
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(stack__float,
            { opacity: 1, duration: 1, ease: 'power2.out' }
          )
        },
      });
    tl.to(stack__saying,
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.inOut',
      })
    tl.from(stack__saying,
      {
        opacity: 0,
        delay: 1,
        duration: 1,
        ease: 'power4.out',
        onComplete: () => {
          stack__saying.innerHTML = "'Инструменты меняются, цель остается прежней'<br>— Итальянская поговорка";
          gsap.to(stack__saying,
            {
              opacity: 1,
              duration: 1,
              ease: 'power1.inOut',
            }
          )
        }
      }
    )
  }, []);
  const agnelliSound = useRef(null);
  const isAudioPlaying = useRef(false); // Флаг для отслеживания состояния аудио
  useEffect(() => {
    const handleMouseMove = (e) => {
      const aboutblock = about__text_anim.current;
      const audio = agnelliSound.current;
      if (!aboutblock) return;
      const rect = aboutblock.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Воспроизведение аудио только один раз при входе мыши
      if (audio && !isAudioPlaying.current) {
        audio.play().catch((error) => {
          console.warn("Автопроигрывание заблокировано браузером:", error);
        });
        isAudioPlaying.current = true; // Устанавливаем флаг
      }
      // Обновление clip-path для псевдоэлемента ::before
      gsap.to(aboutblock, {
        '--clip-path': `circle(4em at ${x}px ${y}px)`,
        '--brightness': 1,
        '--opacity': 1,
        duration: 0.15,
        ease: 'power1.inOut',
      });
    };
    const handleMouseLeave = () => {
      const aboutblock = about__text_anim.current;
      if (!aboutblock) return;
      const audio = agnelliSound.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0; // Сброс аудио
        isAudioPlaying.current = false; // Сбрасываем флаг
      }
      // Скрытие изображения
      gsap.to(aboutblock, {
        '--brightness': 0,
        '--opacity': 0,
      });
    };
    const aboutblock = about__text_anim.current;
    if (!aboutblock) return;
    aboutblock.addEventListener('mousemove', handleMouseMove);
    aboutblock.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      aboutblock.removeEventListener('mousemove', handleMouseMove);
      aboutblock.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  useEffect(() => {
    gsap.fromTo(
      '.projects__item', // Элементы для анимации
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1.8, // Длительность анимации для каждого элемента
        stagger: 1, // Задержка между элементами
        ease: 'power2.out', // Плавное замедление
        scrollTrigger: {
          trigger: '.projects__list', // Контейнер, при прокрутке которого запускается анимация
          start: 'top 80%', // Когда верх контейнера достигает 80% высоты окна
          end: 'bottom bottom', // Конец анимации
          toggleActions: 'play none none none', // Запускает анимацию только один раз
        },
      }
    );
    gsap.fromTo(
      '.projects__head', // Элементы для анимации
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1, // Длительность анимации для каждого элемента
        ease: 'power2.out', // Плавное замедление
        scrollTrigger: {
          scrub: true,
          trigger: '.projects', // Контейнер, при прокрутке которого запускается анимация
          start: '-5em 60%', // Когда верх контейнера достигает 80% высоты окна
          end: '5em 9em', // Конец анимации
          toggleActions: 'play none none none', // Запускает анимацию только один раз
        },
      }
    );
  }, []);
  useEffect(() => {
    const ticker = document.querySelector('.contacts__carousel');
    if (ticker) {
      const list = ticker.querySelector('.contacts__wrapper');
      if (list) {
        const clone = list.cloneNode(true);
        ticker.appendChild(clone);
      }
    }
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.contacts__wrapper', // Элементы для анимации
      {
        opacity: 0,
      },
      {
        scrollTrigger: {
          scrub: true,
          trigger: '.contacts__wrapper', // Контейнер, при прокрутке которого запускается анимация
          start: '-5em 60%', // Когда верх контейнера достигает 80% высоты окна
          end: '5em 30%', // Конец анимации
        },
        opacity: 1,
        duration: 1, // Длительность анимации для каждого элемента
        ease: 'power4.inOut', // Плавное замедление
      }
    );
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const imgs = document.querySelectorAll(`.${styles.journal__img}`);
      const { clientX, clientY } = e;

      imgs.forEach((img, i) => {
        const offset = 15 + (i + 10) * 10;
        const moveX = ((clientX / window.innerWidth) - 0.5) * offset;
        const moveY = ((clientY / window.innerHeight) - 0.5) * offset;
        img.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  const [currentModelIndex, setCurrentModelIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentModelIndex((prevIndex) => (prevIndex + 1) % models.length);
    }, 3000); // меняется каждые 3 секунды

    return () => clearInterval(interval); // чистим таймер при выходе
  }, []);

  return (
    <main>

      <audio ref={daliSound} className={`daliSound ${styles.daliSound}`} src="/audio/dali.mp3" preload="auto" />
      <audio ref={agnelliSound} className={`${styles.agnelliSound}`} src="/audio/agnelli.mp3"></audio>
     {isClient && (
      
      <audio ref={introSound} className={`${styles.introSound}`} src="/audio/intro.mp3"></audio>
      )}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: ".9em",
          height: ".9em",
          borderRadius: "50%",
          backgroundColor: "white",
          pointerEvents: "none", // чтобы курсор не перекрывал клики
          zIndex: 999999999,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "exclusion",

        }}
      />
      {/* <div className={`${styles.journal}`}> */}

      <div ref={popupJournalRef} className={`${styles.journal__popup}`}>
        <div className={styles.journal__bg}>

          <Image
            className={`${styles.journal__img}`}
            src="/salvadorch1.jpg"
            width={300}
            height={200}
            alt="Публикация про Сальвадора Дали Ч2"
          />
          <Image
            className={`${styles.journal__img}`}
            src="/Siberia.jpg"
            width={300}
            height={200}
            alt="Сальвадор Дали"
          />
          <Image
            className={`${styles.journal__img}`}
            src="/firstWork.jpg"
            width={300}
            height={200}
            alt="Публикация первая работа инноваторов"
          />
          <Image
            className={`${styles.journal__img}`}
            src="/agnelliInst.jpg"
            width={300}
            height={200}
            alt="Публикация про Джанни Аньелли"
          />
          <Image
            className={`${styles.journal__img}`}
            src="/salvadorch2.jpg"
            width={300}
            height={200}
            alt="Публикация про Сальвадора Дали Ч2"
          />
          <Image
            className={`${styles.journal__img}`}
            src="/chapayTeaser.jpg"
            width={300}
            height={200}
            alt="Тизер публикации про Чапаева"
          />
          <Image
            className={`${styles.journal__img}`}
            src="/firstTeaser.jpg"
            width={300}
            height={200}
            alt="Тизер публикации про Сальвадора Дали"
          />
          <Image
            className={`${styles.journal__img}`}
            src="/Чапаев.jpg"
            width={300}
            height={200}
            alt="Публикация про Чапаева"
          />
        </div>
        <span
          className={`${SignikaT.className}`}
          style={{
            position: 'absolute',
            left: '50%',
            top: '2em',
            transform: 'translate(-50%, -50%)',
            fontSize: '1.5em',
            fontWeight: '500',
            color: '#D12727',
          }}
          target="_blank" rel="noopener noreferrer">
          ЖУРНАЛ
        </span>
        <div
          className={`${SignikaT.className}`}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fefefe',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >

          <span
            style={{
              fontSize: '1.4em',
              fontWeight: '500',
            }}
            target="_blank" rel="noopener noreferrer">
            Формат свободный.

            Мысли — тоже.

          </span>

          <div
            className={`${SignikaT.className}`}
            style={{
              display: 'flex',
              marginTop: '1em',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >

            <a
              className={`cursorHoverBig ${styles.journal__link}`}
              href="https://www.youtube.com/@buvbuvbuv" target="_blank" rel="noopener noreferrer">
              youtube
              <div className={`${styles.banner__link_svg}`}>
                <svg width="1.7em" height='1.2em' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L8.5 15.5M18 6H9M18 6V15M18 6L11.5 12.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
            <a
              className={`cursorHoverBig ${styles.journal__link}`}
              href="https://www.tiktok.com/@yuriybestuzhevbuv" target="_blank" rel="noopener noreferrer">
              tiktok
              <div className={`${styles.banner__link_svg}`}>
                <svg width="1.7em" height='1.2em' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L8.5 15.5M18 6H9M18 6V15M18 6L11.5 12.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
            <a
              className={`cursorHoverBig ${styles.journal__link}`}
              href="https://www.instagram.com/el__buv/" target="_blank" rel="noopener noreferrer">
              instagram
              <div className={`${styles.banner__link_svg}`}>
                <svg width="1.7em" height='1.2em' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L8.5 15.5M18 6H9M18 6V15M18 6L11.5 12.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        <div
          onClick={() => setIsOpenJournal(false)}
        >
          <span ref={buttonJournalRef}
            className={`cursorHoverBig ${SignikaT.className}`}
            style={{
              position: 'absolute',
              left: '50%',
              top: '90%',
              transform: 'translate(-50%, -50%)',
              fontSize: '1.2em',
              color: '#D12727',
            }}
            target="_blank" rel="noopener noreferrer">
            ЗАКРЫТЬ
          </span>
        </div>

      </div>

      <div className={`${styles.main}`}>
        <div ref={bannerRef} className={`banner ${SignikaT.className} ${styles.banner}`}>
          <div className={`${styles.banner__inner}`}>
            <header ref={headerRef} className={`banner__header ${styles.banner__header}`}>
              <div className={`${styles.banner__text}`}>
                <div className={`${SignikaT.className}  ${styles.banner__left}`}>
                  {/* <p className={`banner__headerlogo`}> */}
                  <Image
                    className={`cursorHoverBig ${styles.banner__logo}`}
                    src="/3.svg"
                    width={209}
                    height={30}
                    alt="Логотиа"
                  />
                  {/* </p> */}
                </div>
                <div className={`cursorHoverBig ${styles.banner__link} ${styles.banner__link_journal}`}
                  onClick={() => setIsOpenJournal(true)}
                >
                  <span target="_blank" rel="noopener noreferrer">
                    ЖУРНАЛ
                  </span>
                </div>


                <div className={`cursorHover ${styles.banner__link}`}>
                   <div className={` ${styles.banner__link_journal}`}
                  onClick={() => setIsOpenJournal(true)}
                >
                  <span target="_blank" rel="noopener noreferrer">
                    ЖУРНАЛ
                  </span>
                </div>

                  <a href="#projects" onClick={ScrollProjects}>
                    Проекты
                  </a>
                  <a href="#stack" onClick={ScrollStack}>
                    Stack
                  </a>
                  <a href="https://t.me/Yuriy_Bestuzhev" target="_blank" rel="noopener noreferrer">
                    Контакт                <div className={`${styles.banner__link_svg}`}>
                      <svg width="1.7em" height='1.2em' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18L8.5 15.5M18 6H9M18 6V15M18 6L11.5 12.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </header>
            <div className={`${styles.banner__body}`}>
              <div className={`${styles.banner__quote}`}>
                <div className={`${styles.banner__dali}`}>
                  <p>Интеллект без амбиций — <br /> птица без крыльев.</p>
                  <p> — Сальвадор Дали</p>
                  <Image
                    className={`banner__dali_img cursorHoverBig ${styles.banner__dali_img}`}
                    src="/salvador.png"
                    width={300}
                    height={200}
                    onClick={playAudioDali}

                    alt="Сальвадор Дали"
                  />
                </div>
              </div>

              <div ref={banner__end} className={`${styles.banner__end}`}>
                <div className={`${styles.banner__info}`}>
                <p className={`cursorHover  ${styles.banner__intro}`} onClick={playIntro}>послушай интро</p>
                разработка под ключ  <p>
                             
                             <span>
                                  САЙТ / ПРИЛОЖЕНИЕ / БОТ
                             </span>

                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

          
          <div className={`${contacts.footer}`}>
            <div id="projects" className={`projects ${SignikaT.className}  ${projects.projects}`}>
              <div className={`contacts__carousel ${MuseoModernoT.className} ${projects.contacts__carousel}`}>
                <div className={`contacts__wrapper ${projects.contacts__wrapper}`}>
                  <span className={`contacts__text ${projects.contacts__text}`}>Код Дизайн План Идея Сайт Бренд Ресурс Проект Тест Контент Запуск Продукт Модуль Задача</span>
                </div>
              </div>
              <div className={`${projects.projects__inner}`}>
                <h3 className={`projects__head ${projects.projects__head}`}>ПРОЕКТЫ</h3>
                <div className="projects__list">
                  <div className={`cursorHover projects__item ${projects.projects__item}`}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => handleMouseEnter("/bruk.jpg")}
                    onMouseLeave={handleMouseLeave}>
                    <div className={`${projects.projects__row}`}>

                      <h2 className={`${projects.projects__title}`}>
                        Bruk
                      </h2>
                      <p className={` ${projects.projects__text}`}>Мобильное приложение, bot, сервера и БД для бистро</p>
                      <div className={`${projects.projects__link}`}>
                        <a
                          href="/pdf/CoffeeMobile.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          презентация
                        </a>
                      </div>
                    </div>
                    <div className={`${projects.projects__description}`}>
                      <Pincode />
                    </div>
                    <div className={`${projects.projects__link}`} style={{ justifyContent: 'center', margin: '-40px auto 20px auto' }}>
                      Проект на паузе, но посмотреть материал можно введя пинкод

                    </div>
                    <div className={`${projects.projects__container_img}`} ref={imageContainerRef}>
                      <Image loading="lazy" src="" alt="Проект" ref={imageRef} />
                    </div>
                  </div>
                  <div className={`cursorHover projects__item ${projects.projects__item}`}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => handleMouseEnter("/ets1.jpg")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className={`${projects.projects__row}`}>
                      <a
                        href="https://etalontrans.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={` ${projects.projects__title} ${projects.projects__ets}`}>ЭТС
                        <div className={`${projects.projects__svg}`}>
                          <svg width="1em" height='1em' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 18L8.5 15.5M18 6H9M18 6V15M18 6L11.5 12.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </a>
                      <p className={`${projects.projects__text}`}>Выполнил процесс — от идеи до выгрузки на хостинг </p>
                      <div className={`${projects.projects__link}`}>
                        <a
                          href="https://github.com/Yuriymakedonskiy/ETS"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          github
                        </a>
                        <a
                          href="/pdf/ets.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          презентация
                        </a>
                      </div>
                    </div>
                    <div className={`${projects.projects__description}`}>
                      <p>ЭталонТрансСервис. Западная Сибирь. Разработка заняла 3 месяца с переходом с Django на React + MongoDB. Ключевые особенности: интерактивная страница вакансий с уникальной формой подачи резюме, админ-панель для правки контента через MongoDB Compass, автоматическое обновление данных на сайте, система авторизации с автоматическим закрытием сессии. Использованные технологии: Frontend - React (хуки, кастомные компоненты), Backend - Node.js + Express, база данных - MongoDB, деплой - PM2 для управления процессами. Особенность разработки: проведен полный рефакторинг с Django/SQLite3 на MERN-стек после 3 месяцев работы. Результат: создан гибкий CMS-инструмент для заказчика с возможностью самостоятельного управления контентом. Проект был представлен на отраслевом форуме. В подвале сайта размещен мой логотип как разработчика.</p>
                    </div>

                    <div className={`${projects.projects__container_img}`} ref={imageContainerRef}>
                      <Image loading="lazy" alt="Проект" ref={imageRef} />
                    </div>
                  </div>
                  <div className={`cursorHover projects__item ${projects.projects__item}`}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => handleMouseEnter("/suero.png")}
                    onMouseLeave={handleMouseLeave}>
                    <div className={`${projects.projects__row}`}>
                      <h2 className={`${projects.projects__title}`}>Итан Суэро</h2>
                      <p className={` ${projects.projects__text}`}>Реализация дизайна Итана Суэро</p>
                      <div className={`${projects.projects__link}`}>
                        <a
                          href="https://www.figma.com/design/Fl0mKet5c01lDvJz7LfWO6/Top-16-Websites-of-2024---Awwwards-(Community)?node-id=0-1&p=f&t=VVMZzv1zCYlNKGT0-0"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          макет
                        </a>
                        <a
                          href="https://github.com/Yuriymakedonskiy/ethan-suero-layout"
                          target="_blank"
                          rel="noopener noreferrer">
                          github
                        </a>
                      </div>
                    </div>
                    <div className={`${projects.projects__description}`}>
                      Верстка сайта по макету Итана Суэро (дизайнера с 2 номинациями на Awwwards и 12 наградами CSS Design Awards в категориях UI, UX, Special Kudos и Innovation). Технологии и подходы: SCSS для структурированных стилей, адаптивность на Flexbox и CSS Grid с использованием px, em, rem, vw и кастомных миксинов. Особенности проекта: уникальная типографика с базовым размером шрифта 1vw и относительными единицами em для пропорционального масштабирования, применение функций clamp() и calc() для гибкой типографики, строгое следование методологии BEM. Файловая структура организована с разделением на _normalize.scss, _globals.scss, _mixins.scss, _variables.scss и отдельные файлы для каждого компонента. Результат: pixel-perfect соответствие макету, адаптивный дизайн, демонстрация профессионального владения современными инструментами фронтенд-разработки и работы с премиальным дизайном.
                    </div>
                    <div className={`${projects.projects__container_img}`} ref={imageContainerRef}>
                      <Image loading="lazy" src="" alt="Проект" ref={imageRef} />
                    </div>
                  </div>

                  <div className={`cursorHover projects__item ${projects.projects__item}`}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => handleMouseEnter("/ermitage.jpg")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className={`${projects.projects__row}`}>
                      <h2 className={` ${projects.projects__title}`}>Эрмитаж</h2>
                      <p className={` ${projects.projects__text}`}>Адаптивная вёрстка и авторские анимации</p>
                      <div className={`${projects.projects__link}`}>
                        <a href="/video/ermitage.mp4" target="_blank">
                          обзор
                        </a>
                        <a
                          href="https://github.com/Yuriymakedonskiy/hermitage_krasnodar"
                          target="_blank"
                          rel="noopener noreferrer">
                          github
                        </a>
                      </div>
                    </div>
                    <div className={`${projects.projects__description}`}>
                      <p>ЖК Эрмитаж в Краснодаре — тестовый проект для веб-студии PIXEL2, который я выполнил в качестве вызова самому себе, несмотря на свою основную специализацию в React/fullstack-разработке. Суть задачи заключалась в чистой реализации без использования сторонних библиотек: адаптивная верстка на SCSS, React-компоненты с хуками и авторские анимации создавались полностью с нуля. Этот опыт наглядно продемонстрировал мою способность выходить за рамки основной специализации и решать нестандартные задачи, создавая оптимизированные и качественные интерфейсы с использованием современных веб-технологий. Проект подтвердил мою универсальность как разработчика и готовность браться за сложные вызовы.
                      </p>
                    </div>
                    <div className={`${projects.projects__container_img}`} ref={imageContainerRef}>
                      <Image loading="lazy" src="" alt="Проект" ref={imageRef} />
                    </div>
                  </div>
                  <div className={`cursorHover projects__item ${projects.projects__item}`}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => handleMouseEnter("/aleydavia.jpg")}
                    onMouseLeave={handleMouseLeave}>
                    <div className={`${projects.projects__row}`}>
                      <h2 className={`${projects.projects__title}`}>Алейдавиа</h2>
                      <p className={`${projects.projects__text}`}>Полная имитация цикла покупки билетов</p>
                      <div className={`${projects.projects__link}`}>
                        <a href="/video/aleydavia.mp4" target="_blank">
                          обзор
                        </a>
                        <a
                          href="/pdf/aleydavia.pdf"
                          target="_blank"
                          rel="noopener noreferrer">
                          презентация
                        </a>
                        <a
                          href="https://github.com/Yuriymakedonskiy/SPA-BILETS-3.0"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          github
                        </a>
                      </div>
                    </div>
                    <div className={`${projects.projects__description}`}>
                      <p>Алейдавиа — цифровая платформа для авиаперевозок ХМАО-Югры, реализующая полный цикл бронирования билетов от выбора рейса до электронной регистрации через QR-код. Проект разработан с упором на удобство региональных пассажиров и включает: симуляцию бронирования с генерацией билетов, эмуляцию платежного шлюза, адаптивный интерфейс и современную систему онлайн-регистрации. Решение демонстрирует комплексный подход к цифровизации локальных авиаперевозок с использованием актуальных веб-технологий и ориентированным на пользователя дизайном.</p>
                    </div>
                  </div>
                  <div className={`cursorHover projects__item ${projects.projects__item}`}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}>

                    <div className={`${projects.projects__row} ${projects.projects__row_slejka}`}>
                      <h2 className={`${projects.projects__title} ${projects.projects__title_slejka}`}>Прозрачность работы
                        {/* <div className={`${projects.projects__svg}`}> */}
                        <svg width="1em" height='1em' viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 18L8.5 15.5M18 6H9M18 6V15M18 6L11.5 12.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {/* </div> */}
                      </h2>
                      <p className={`${projects.projects__subtitle_slejka}`}>введите код и следите за процессом в реальном времени</p>
                    </div>
                    <div className={`${projects.projects__description}`}>
                      <Pincode />

                      {/* <p>Алейдавиа — цифровая платформа для авиаперевозок ХМАО-Югры, реализующая полный цикл бронирования билетов от выбора рейса до электронной регистрации через QR-код. Проект разработан с упором на удобство региональных пассажиров и включает: симуляцию бронирования с генерацией билетов, эмуляцию платежного шлюза, адаптивный интерфейс и современную систему онлайн-регистрации. Решение демонстрирует комплексный подход к цифровизации локальных авиаперевозок с использованием актуальных веб-технологий и ориентированным на пользователя дизайном.</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



          <div id="stack" className={`stack ${stack.stack}`}>
            <div className={` ${SignikaT.className} ${stack.stack__inner}`}>
              <div className={`${stack.stack__header}`}>
                <h4 className={`${stack.stack__scroll_anim}  ${stack.stack__title}`}>Stack</h4>
                <p className={`stack__float ${stack.stack__float}`}>
                  <span className={` ${stack.stack__buv}`}>
                 сайт создан на next
                  </span>
                  </p>
              </div>
              <div className={`stack__body ${stack.stack__scroll_anim} ${stack.stack__body}`}>
                <h5 className={`${stack.stack__subtitle}`}>Frontend</h5>
                <ul className={`${stack.stack__front}`}>
                  <li>react.js</li>
                  <li>react native</li>
                  <li>next</li>
                  <li>typescript</li>
                  <li>gsap</li>
                  <li>three</li>
                  <li>bem</li>
                  <li>sass</li>
                  <li>css modules</li>
                  <li>jquery</li>
                </ul>
                <h5 className={`${stack.stack__subtitle}`}>Backend</h5>
                <ul className={`${stack.stack__back}`}>
                  <li>json api</li>
                  <li>vite</li>
                  <li>express</li>
                  <li>rest</li>
                  <li>turbopack</li>
                  <li>vercel</li>
                  <li>mongodb</li>
                  <li>jwt</li>
                  <li>ssr</li>
                  <li>axios</li>
                  <li>mongoose</li>
                  <li>ajax</li>
                  <li>git</li>
                </ul>
                <h5 className={`${stack.stack__subtitle}`}>CMS</h5>
                <ul className={`${stack.stack__back}`}>
                  <li>WEBFLOW</li>
                  <li>WORDPRESS</li>
                  <li>TILDA</li>
                </ul>
              </div>
              <div className={` stack__saying ${stack.stack__scroll_anim} ${stack.stack__saying}`}>
                <p>
                  'Cambiano gli strumenti, l’obiettivo resta lo stesso' <br /> — Итальянская поговорка
                </p>
              </div>
            </div>
          </div>



        <div ref={aboutRef} className={`${SignikaT.className}`}>
          <div id="about" className={`about ${about.about}`}>
                <h4 className={` ${about.about__title}`}>ОБО МНЕ</h4>

            <div className={`${about.about__inner}`}>
              <a href="https://t.me/Yuriy_Bestuzhev" target="_blank" rel="noopener noreferrer">
                <div className={`cursorHoverBig about__photo ${about.about__photo}`}>
                  <Image
                    className={`${about.about__im}`}
                    src="/im.png"
                    width={250}
                    height={200}
                    alt="Юрий Бестужев"
                  />
                </div>
              </a>

              <div
                ref={about__text_anim}
                className={`white_text about__text about__text_anim ${about.about__text}`}>
                <p>
                  Digital developer, работаю удалённо, подхожу к делу с тем же вкусом и вниманием к деталям, как Джанни Аньелли выбирал свои рубашки.
                </p>
                <p className={`about__saying ${about.about__saying}`}>
                  'Стиль это всё' — закон Аньелли. Наведи и убедись.
                </p>
                <p>
                  Мои мобильные приложения, сайты и боты не только хорошо выглядят — они приносят результат. Люди возвращаются ко мне, потому что всё просто работает.
                </p>
              </div>
            </div>
          </div>
          <div className={`skills ${SignikaT.className} ${skills.skills} ${contacts.prevBlock}`}>
            <div className={`${skills.skills__inner}`}>
              <h2 className={`skills__title ${skills.skills__title}`}>
                YOU AND ME
              </h2>
              <ul className={`skills__list ${skills.skills__list}`}>
                <li data-text="Придумаем концепцию, которая выделит ваш продукт" className={`cursorHoverBig skills__item ${skills.skills__item}`}>
                  Придумаем
                </li>
                <li data-text="Создадим уникальное решение для вашего проекта" className={`cursorHoverBig skills__item ${skills.skills__item}`}>
                  создадим
                </li>
                <li data-text="Реализуем ваши идеи в реальность и доведем до результата" className={`cursorHoverBig skills__item ${skills.skills__item}`}>
                  РЕАЛИЗУЕМ
                </li>
                <li data-text="Внедрим передовые технологии в ваш бизнес" className={`cursorHoverBig skills__item ${skills.skills__item}`}>
                  внедрим
                </li>
              </ul>
            </div>
          </div>
        <div className={`${contacts.contacts}`}>
          <div className={`${contacts.contacts__inner}`}>
            {/* <p className={`${SignikaT.className} ${contacts.contacts__title}`}>Идеи вне времени</p> */}
            <Canvas camera={{ position: [0, 0, 5], fov: 20 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} />
              <Model url={models[currentModelIndex]} />
              <OrbitControls enableZoom={false} />
            </Canvas>
            <a href="mailto:urkabestyzhev@gmail.com?subject=Идея!&body=Здравствуйте! Давай кое-что обсудим..." target="_blank" rel="noopener noreferrer" className={`cursorHoverBig ${MuseoModernoT.className} ${contacts.contacts__email}`}>Связаться
              <svg width=".4em" height='1em' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L8.5 15.5M18 6H9M18 6V15M18 6L11.5 12.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <a href="mailto:urkabestyzhev@gmail.com?subject=Идея!&body=Здравствуйте! Давай кое-что обсудим..." target="_blank" rel="noopener noreferrer" className={`cursorHoverBig ${MuseoModernoT.className} ${contacts.contacts__link}`}>urkabestyzhev@gmail.com</a>

          </div>

        </div>
      </div>


    </main>

  );
}
