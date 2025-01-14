"use client";
import { MuseoModerno, Inter } from "next/font/google";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

export default function Home() {
  const cursorRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const about__text_anim = useRef(null);
  const headerRef = useRef(null);
  const lastScroll = useRef(0)
  const bannerRef = useRef(null);
  const daliSound = useRef(null); 
  const isAudioPlayingDali = useRef(false); 
  useEffect(() => {
    const banner = bannerRef.current;
    const audio = daliSound.current;
    if (!banner) return;
    const handleMouseMove = (e) => {
    if (audio && !isAudioPlayingDali.current) {
      audio.play()
        .then(() => {
          // Успешное воспроизведение
          isAudioPlayingDali.current = true;
          console.log("Аудио успешно воспроизведено");
        })
        .catch((error) => {
          console.warn("Автопроигрывание заблокировано браузером:", error);
        });
    }
  }
    banner.addEventListener("mousemove", handleMouseMove);
    return () => {
      banner.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
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
    ScrollTrigger.create({
      trigger: banner,
      start: "bottom top", // Верх баннера касается верха окна
      end: "center bottom", // Низ баннера касается верха окна
      onEnter: () => changeText("buv"),
      onLeaveBack: () => changeText("portfolio"),
    });

    return () => {
      // Уничтожение ScrollTrigger при размонтировании компонента
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
  return (
    <main>
      <audio ref={daliSound} className={`daliSound ${styles.daliSound}`} src="/audio/dali.mp3" preload="auto" />
      <audio ref={agnelliSound} className={`${styles.agnelliSound}`} src="/audio/agnelli.mp3"></audio>
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
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "exclusion",

        }}
      />
      <div className={`${styles.main}`}>
        <div ref={bannerRef} className={`banner ${SignikaT.className} ${styles.banner}`}>
          <div className={`${styles.banner__inner}`}>
            <header ref={headerRef} className={`banner__header ${styles.banner__header}`}>
              <div className={`${styles.banner__text}`}>
                <div className={`${MuseoModernoT.className}  ${styles.banner__left}`}>
                  <p className={`banner__header_logo ${MuseoModernoT.className} ${styles.banner__header_logo}`}>
                    portfolio
                  </p>
                </div>
                <div className={`cursorHover ${styles.banner__link}`}>
                  <a href="https://t.me/Yuriy_Bestuzhev" target="_blank" rel="noopener noreferrer">
                    telegram
                    <div className={`${styles.banner__link_svg}`}>
                      <svg width="1.7em" height='1.2em' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18L8.5 15.5M18 6H9M18 6V15M18 6L11.5 12.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
                    src="/salvador.jpg"
                    width={300}
                    height={200}
                    alt="Сальвадор Дали"
                  />
                </div>
              </div>
              <div className={`${styles.banner__end}`}>
                <h1 className={`cursorHover banner__logo ${MuseoModernoT.className} ${styles.banner__logo}`}>buv</h1>
                <div className={`${styles.banner__info}`}>end-to-end digital developer
                  <p>цифровые продукты полного цикла.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${SignikaT.className}`}>
          <div className={`about ${about.about}`}>
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
                  end-to-end digital developer, работаю удалённо, подхожу к делу с тем же вкусом и вниманием к деталям, как Джанни Аньелли выбирал свои галстуки.
                </p>
                <p className={`about__saying ${about.about__saying}`}>
                  'Стиль это всё' — закон Аньелли. Наведи и убедись.
                </p>
                <p>
                  Если бы код был одеждой, мои проекты носили бы костюм от Brioni, но при этом чувствовали себя, как в любимом свитшоте.
                </p>
              </div>
            </div>
          </div>
          <div className={`skills ${SignikaT.className} ${skills.skills}`}>
            <div className={`${skills.skills__inner}`}>
              <h2 className={`skills__title ${skills.skills__title}`}>
                YOU AND ME
              </h2>
              <ul className={`skills__list ${skills.skills__list}`}>
                <li data-text="Разработаем концепцию, которая выделит ваш продукт" className={`cursorHover skills__item ${skills.skills__item}`}>
                  Придумаем
                </li>
                <li data-text="Построим уникальное решение для вашего проекта" className={`cursorHoverBig skills__item ${skills.skills__item}`}>
                  создадим
                </li>
                <li data-text="Воплотим ваши идеи в реальность и доведем до результата" className={`cursorHoverBig skills__item ${skills.skills__item}`}>
                  РЕАЛИЗУЕМ
                </li>
                <li data-text="Интегрируем передовые технологии в ваш бизнес" className={`cursorHoverBig skills__item ${skills.skills__item}`}>
                  внедрим
                </li>
              </ul>
            </div>
          </div>
          <div className={`stack ${stack.stack}`}>
            <div className={` ${SignikaT.className} ${stack.stack__inner}`}>
              <div className={`${stack.stack__header}`}>
                <h4 className={`${stack.stack__scroll_anim}  ${stack.stack__title}`}>Stack</h4>
                <p className={`stack__float ${stack.stack__float}`}>
                  <span className={` ${stack.stack__buv}`}>
                    buv.
                  </span>
                  создан на next.js</p>
              </div>
              <div className={`stack__body ${stack.stack__scroll_anim} ${stack.stack__body}`}>
                <h5 className={`${stack.stack__subtitle}`}>Frontend</h5>
                <ul className={`${stack.stack__front}`}>
                  <li>react.js</li>
                  <li>react native</li>
                  <li>next</li>
                  <li>typescript</li>
                  <li>bem</li>
                  <li>sass</li>
                  <li>css modules</li>
                  <li>jquery</li>
                  <li>gsap</li>
                </ul>
                <h5 className={`${stack.stack__subtitle}`}>Backend (API & Admin UI)</h5>
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
              </div>
              <div className={` stack__saying ${stack.stack__scroll_anim} ${stack.stack__saying}`}>
                <p>
                  'Cambiano gli strumenti, l’obiettivo resta lo stesso' <br /> — Итальянская поговорка
                </p>
              </div>
            </div>
          </div>
          <div className={`${contacts.footer}`}>
            <div className={`projects ${contacts.prevBlock} ${SignikaT.className}  ${projects.projects}`}>
              <div className={`contacts__carousel ${MuseoModernoT.className} ${projects.contacts__carousel}`}>
                <div className={`contacts__wrapper ${projects.contacts__wrapper}`}>
                  <span className={`contacts__text ${projects.contacts__text}`}>Код Дизайн План Идея Сайт Бренд Ресурс Проект Тест Контент Запуск Продукт Интерфейс Модуль Задача</span>
                </div>
              </div>
              <div className={`${projects.projects__inner}`}>
                <h3 className={`projects__head ${projects.projects__head}`}>ПРОЕКТЫ</h3>
                <div className="projects__list">
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
                            <path d="M6 18L8.5 15.5M18 6H9M18 6V15M18 6L11.5 12.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
                      <p>
                        ЭталонТрансСервис. Западная Сибирь.
                      </p>
                      <p>
                        <strong>Весь процесс:</strong>
                        <br />
                        От идеи до выгрузки на хостинг — занял 3 месяца. Заказчик изначально хотел сайт, но не знал, каким он должен быть, поэтому я тесно работал с ними, приезжал в офис и был постоянно на связи по телефону.
                      </p>
                      <p>
                        <strong>Особенности сайта:</strong>
                        <br />
                        На сайте есть разные информационные блоки, например, описание компании. Но особенно интересные вещи можно увидеть на странице вакансий.
                        Выберите вакансию и нажмите «Подробнее» — увидите кнопку «Отправить резюме». То, что происходит дальше, вы вряд ли видели на других сайтах.
                      </p>
                      <p>
                        <strong>Основная идея:</strong>
                        <br />
                        Предоставить компании возможность управлять контентом сайта без знания программирования.
                        Через админ-панель можно заходить в базу данных и просто менять текст в таблицах. Эти изменения сразу отображаются на сайте.
                        Например, на главной странице блок с услугами также выводится из базы данных, так что я не прописываю их в коде вручную.
                        Внизу сайта есть ссылка на меня и мой логотип.
                      </p>
                      <p>
                        <strong>Разработка:</strong>
                        <br />
                        Проект начался с реализации на Django и SQLite3, но через 3 месяца было принято решение перейти на React и MongoDB.
                        Я полностью переписал серверную часть, разбил логику на React-компоненты, добавил хуки, коллбэки и использовал нужные React-пакеты.
                        Также внедрил авторизацию и эндпоинты для работы с данными из MongoDB и настроил процесс поддержания работы сервера через менеджер <code>pm2</code>, чтобы сайт мог постоянно делать HTTP-запросы на хостинге.
                      </p>
                      <p>
                        <strong>Логика админ-панели:</strong>
                        <br />
                        Теперь при переходе на <code>/admin</code> пользователь попадает на страницу авторизации.
                        После успешного входа с логином и паролем админ получает доступ к MongoDB Compass, где может редактировать данные напрямую.
                        Спустя 5 секунд после входа окно админки автоматически закрывается, так как в дальнейшем оно уже не нужно.
                      </p>
                      <p>
                        <strong>Презентация:</strong>
                        <br />
                        Презентация проекта была подготовлена по просьбе технического директора и показана на форуме.
                        Я рассказал о функционале и возможностях сайта. Уверен, что многим будет интересно ознакомиться.
                      </p>
                      <p>
                        <strong>Результат:</strong>
                        <br />
                        Этот проект демонстрирует не только мои технические навыки, но и умение находить индивидуальные решения, работать с заказчиками и реализовывать сложные задачи с использованием современных технологий.
                      </p>
                    </div>

                    <div className={`${projects.projects__container_img}`} ref={imageContainerRef}>
                      <Image loading="lazy" alt="Проект" ref={imageRef}/>
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
                      <p>
                        Верстка сайта по макету Итана Суэро
                        (дизайнера с 2 номинациями на Awwwards и 12 наградами CSS Design Awards в категориях UI, UX, Special Kudos и Innovation)
                      </p>
                      <p><strong>Технологии и подходы:</strong></p>
                      <strong>SCSS: </strong>
                      <br />
                      Все стили написаны с использованием SCSS для лучшей структурированности и поддержки кода.
                      <br />
                      <br />
                      <strong>Адаптивность:</strong>
                      <br />
                      Для построения адаптивных и современных интерфейсов применялись технологии Flexbox и CSS Grid.
                      Реализовал адаптивную верстку, написав собственные миксины, используя такие единицы измерения, как <code>px</code>, <code>em</code>, <code>rem</code>, <code>vw</code>.
                      <br />
                      <br />
                      <br />
                      <p><strong>Особенности проекта:</strong></p>
                      <strong>Уникальный подход к типографике: </strong>
                      <br />
                      Для гибкости и масштабируемости я задал базовый размер шрифта на уровне <code>&lt;body&gt;</code>:
                      <pre><code>
                        body &#123;
                        font-size: 1vw
                        &#125;
                      </code></pre>
                      После этого стили для классов оформлялись через относительные единицы (<code>em</code>), например:
                      <pre><code>.title
                        font-size: 1.3em;
                      </code></pre>
                      Такой подход обеспечивает пропорциональное масштабирование шрифтов относительно ширины экрана, упрощая создание адаптивного дизайна.
                      <br />
                      <br />
                      <strong>Функции SCSS:</strong>
                      <br />
                      Использовал современные функции <code>clamp()</code> и <code>calc()</code> для управления размерами и создания гибкой типографики.
                      <br />
                      <br />
                      <strong>Методология BEM:</strong>
                      <br />
                      Строго придерживался методологии BEM для обеспечения читаемости и масштабируемости кода.
                      <br />
                      <br />
                      <strong>Организация файловой структуры:</strong>
                      <br />
                      Отдельная папка для вспомогательных SCSS-файлов:
                      <br />
                      <br />
                      <code>_normalize.scss</code> — нормализация стилей.
                      <br />
                      <code>_globals.scss</code> — общие стили.
                      <br />
                      <code>_mixins.scss</code> — миксины.
                      <br />
                      <code>_variables.scss</code> — переменные.
                      <br />
                      <br />
                      Папка для стилей каждого компонента:
                      <br />
                      Каждый компонент имеет отдельный файл для лучшего управления и повторного использования кода.
                      <br />
                      <br />
                      <p><strong>Результат:</strong>
                        <br />
                        Сайт полностью соответствует макету, является адаптивным и демонстрирует современный подход к разработке.
                        Проект показывает навыки работы с дизайном высокого уровня и уверенное владение инструментами фронтенд-разработки.
                      </p>
                      <p>
                      </p>
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
                      <p>
                        <strong>ЖК Эрмитаж, Краснодар</strong>
                      </p>
                      <p>
                        Этот проект был выполнен в качестве тестового задания для веб-студии PIXEL2 на позицию верстальщика.
                        Хотя я сразу отказался от предложения, поскольку моя специализация — frontend/fullstack разработка на React, а не верстка, я решил принять вызов.
                        Задача была интересной: сверстать проект, используя исключительно <strong>HTML</strong>, <strong>SCSS</strong>, и <strong>React (hooks)</strong>, без сторонних плагинов, виджетов и анимационных фреймворков, как это часто делают многие студии.
                      </p>
                      <p>
                        <strong>Что было реализовано:</strong>
                        <ul>
                          <li>Адаптивная верстка на SCSS.</li>
                          <li>React-компоненты с hooks, без лишней сложности.</li>
                          <li>Авторские анимации без сторонних библиотек.</li>
                        </ul>
                      </p>
                      <p>
                        Этот проект — пример моего профессионального подхода и универсальности.
                        Я успешно решил задачу, обычно выходящую за рамки моей роли как React-разработчика,
                        и продемонстрировал, что могу создавать качественные и оптимизированные интерфейсы с использованием современных технологий.
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
                      <p>
                        <strong>Алейдавиа: сайт авиалиний ХМАО-Югра — полная имитация цикла покупки авиабилетов</strong>
                      </p>
                      <p>
                        Проект "Алейдавиа" — пример полного цикла разработки: от идеи до готового продукта.
                        Это не только демонстрация технических навыков, но и реализация идеи, которая улучшает взаимодействие пользователя с авиасервисами.
                      </p>
                      <p>
                        Ориентация на локальный рынок ХМАО подчёркивает внимание к региональным потребностям.
                        Симуляция полного процесса — от покупки билета до регистрации через QR-код — демонстрирует,
                        как современные технологии могут преобразить пользовательский опыт.
                      </p>
                      <p>
                        <strong>Особенности проекта:</strong>
                        <ul>
                          <li>Полная имитация покупки билета, включая генерацию данных и подтверждение транзакции.</li>
                          <li>QR-код для регистрации, обеспечивающий удобный и современный процесс оформления.</li>
                          <li>Простота использования интерфейса, адаптированного для локального рынка.</li>
                        </ul>
                      </p>
                      <p>
                        Проект позволил мне проявить навыки взаимодействия с клиентами, разработки удобного интерфейса и интеграции сложных технологий.
                        Уверен, такой подход ценен в проектах, где важны функциональность и удобство.
                      </p>
                      <p>
                        <strong>Презентация:</strong>
                        Презентация проекта доступна для изучения, раскрывая потенциал платформы в развитии регионального авиасообщения.
                      </p>
                    </div>
                    <div className={`${projects.projects__container_img}`} ref={imageContainerRef}>
                      <Image loading="lazy" src="" alt="Проект" ref={imageRef} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${contacts.contacts}`}>
          <div className={`${contacts.contacts__inner}`}>
            <p className={`${SignikaT.className} ${contacts.contacts__title}`}>Идеи вне времени</p>
            <a href="mailto:progbuv@mail.ru?subject=Идея!&body=Привет! Давай кое-что обсудим..." target="_blank" rel="noopener noreferrer" className={`cursorHoverBig ${MuseoModernoT.className} ${contacts.contacts__email}`}>progbuv@mail.ru</a>
          </div>
        </div>
      </div>
    </main>
  );
}