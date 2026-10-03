/* ============================================================
   DATA UTAMA
============================================================ */

const weddingInfo = {

  namaPria:
    "Rafi",

  namaWanita:
    "Alma",

  tanggal:
    "12 Desember 2026",

  tanggalSingkat:
    "12.12.2026",

  tanggalISO:
    "2026-12-12",

  jamMulai:
    "09:00",

  jamSelesai:
    "12:00",

  lokasi:
    "Kediaman Mempelai Wanita",

  kota:
    "Tangerang, Indonesia",

  mapsUrl:
    "https://maps.app.goo.gl/BV1hLicpQRKvGTee8",

  nomorWhatsApp:
    ""

};


/* ============================================================
   NAMA TAMU
============================================================ */

const guestNameElement =
  document.getElementById(
    "guestName"
  );


function getGuestName() {

  const params =
    new URLSearchParams(
      window.location.search
    );


  const guest =
    params.get(
      "to"
    );


  if (!guest) {

    return "Tamu Undangan";

  }


  const cleanGuest =
    guest
      .replace(
        /\+/g,
        " "
      )
      .trim();


  if (
    !cleanGuest ||
    cleanGuest.length > 80
  ) {

    return "Tamu Undangan";

  }


  return cleanGuest;

}


const currentGuest =
  getGuestName();


if (guestNameElement) {

  guestNameElement.textContent =
    currentGuest;

}


/* ============================================================
   RSVP PERSONAL
============================================================ */

const nameInput =
  document.getElementById(
    "name"
  );


const rsvpPersonal =
  document.getElementById(
    "rsvpPersonal"
  );


function getSavedGuestName() {

  try {

    return (
      localStorage.getItem(
        "rafiAlmaGuestName"
      ) || ""
    );

  } catch {

    return "";

  }

}


function saveGuestName(
  name
) {

  try {

    localStorage.setItem(
      "rafiAlmaGuestName",
      name
    );

  } catch {

    // Tidak masalah jika localStorage tidak tersedia.

  }

}


if (nameInput) {

  if (
    currentGuest !==
    "Tamu Undangan"
  ) {

    nameInput.value =
      currentGuest;

  } else {

    const savedName =
      getSavedGuestName();


    if (savedName) {

      nameInput.value =
        savedName;

    }

  }

}


if (rsvpPersonal) {

  if (
    currentGuest !==
    "Tamu Undangan"
  ) {

    rsvpPersonal.textContent =
      `Khusus untuk ${currentGuest}, ` +
      `kami akan sangat bahagia menyambut kehadiran Anda.`;

  } else {

    rsvpPersonal.textContent =
      "Silakan isi konfirmasi kehadiran Anda.";

  }

}


if (nameInput) {

  nameInput.addEventListener(
    "input",
    () => {

      const name =
        nameInput.value.trim();


      if (name) {

        saveGuestName(
          name
        );

      }

    }
  );

}


/* ============================================================
   PEMBUKA
============================================================ */

const opening =
  document.getElementById(
    "opening"
  );


const openInvitation =
  document.getElementById(
    "openInvitation"
  );


/* ============================================================
   MUSIK
============================================================ */

const backgroundMusic =
  document.getElementById(
    "backgroundMusic"
  );


const musicToggle =
  document.getElementById(
    "musicToggle"
  );


const musicText =
  document.getElementById(
    "musicText"
  );


function updateMusicButton(
  playing
) {

  if (!musicToggle) {

    return;

  }


  musicToggle.classList.toggle(
    "playing",
    playing
  );


  musicToggle.setAttribute(
    "aria-pressed",
    String(playing)
  );


  musicToggle.setAttribute(
    "aria-label",
    playing
      ? "Jeda musik"
      : "Putar musik"
  );


  if (musicText) {

    musicText.textContent =
      playing
        ? "JEDA"
        : "MUSIK";

  }

}


async function playMusic() {

  if (!backgroundMusic) {

    return false;

  }


  try {

    backgroundMusic.volume =
      0.32;


    await backgroundMusic.play();


    updateMusicButton(
      true
    );


    return true;

  } catch {

    updateMusicButton(
      false
    );


    return false;

  }

}


function pauseMusic() {

  if (!backgroundMusic) {

    return;

  }


  backgroundMusic.pause();


  updateMusicButton(
    false
  );

}


/*
  Musik mulai ketika tombol buka
  undangan ditekan.
*/

if (
  opening &&
  openInvitation
) {

  openInvitation.addEventListener(
    "click",
    async () => {

      await playMusic();


      opening.classList.add(
        "hidden"
      );


      document.body.classList.remove(
        "locked"
      );


      setTimeout(
        () => {

          if (opening) {

            opening.remove();

          }

        },
        1100
      );

    }
  );

}


/*
  Tombol musik manual.
*/

if (musicToggle) {

  musicToggle.addEventListener(
    "click",
    async () => {

      if (
        backgroundMusic &&
        !backgroundMusic.paused
      ) {

        pauseMusic();

        return;

      }


      await playMusic();

    }
  );

}


/*
  Jika file musik gagal dimuat,
  website tetap berjalan normal.
*/

if (backgroundMusic) {

  backgroundMusic.addEventListener(
    "error",
    () => {

      updateMusicButton(
        false
      );

    }
  );


  backgroundMusic.addEventListener(
    "pause",
    () => {

      updateMusicButton(
        false
      );

    }
  );


  backgroundMusic.addEventListener(
    "play",
    () => {

      updateMusicButton(
        true
      );

    }
  );

}


/* ============================================================
   KURSOR DESKTOP
============================================================ */

const cursorDot =
  document.querySelector(
    ".cursor-dot"
  );


const cursorRing =
  document.querySelector(
    ".cursor-ring"
  );


const finePointer =
  window.matchMedia(
    "(pointer: fine)"
  ).matches;


if (
  cursorDot &&
  cursorRing &&
  finePointer
) {

  let mouseX = 0;

  let mouseY = 0;

  let ringX = 0;

  let ringY = 0;


  document.addEventListener(
    "mousemove",
    (event) => {

      mouseX =
        event.clientX;

      mouseY =
        event.clientY;


      cursorDot.style.left =
        `${mouseX}px`;

      cursorDot.style.top =
        `${mouseY}px`;

    }
  );


  function updateCursor() {

    ringX +=
      (mouseX - ringX) * .14;


    ringY +=
      (mouseY - ringY) * .14;


    cursorRing.style.left =
      `${ringX}px`;

    cursorRing.style.top =
      `${ringY}px`;


    requestAnimationFrame(
      updateCursor
    );

  }


  updateCursor();


  document
    .querySelectorAll(
      "button, input, textarea, select"
    )
    .forEach(
      (element) => {

        element.addEventListener(
          "mouseenter",
          () => {

            document.body.classList.add(
              "cursor-hover"
            );

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            document.body.classList.remove(
              "cursor-hover"
            );

          }
        );

      }
    );

}


/* ============================================================
   COUNTDOWN
============================================================ */

const weddingDate =
  new Date(
    "2026-12-12T09:00:00+07:00"
  ).getTime();


function updateCountdown() {

  const distance =
    weddingDate -
    Date.now();


  const days =
    document.getElementById(
      "days"
    );


  const hours =
    document.getElementById(
      "hours"
    );


  const minutes =
    document.getElementById(
      "minutes"
    );


  const seconds =
    document.getElementById(
      "seconds"
    );


  if (
    !days ||
    !hours ||
    !minutes ||
    !seconds
  ) {

    return;

  }


  if (
    distance <= 0
  ) {

    days.textContent =
      "000";

    hours.textContent =
      "00";

    minutes.textContent =
      "00";

    seconds.textContent =
      "00";

    return;

  }


  const totalSeconds =
    Math.floor(
      distance / 1000
    );


  const dayValue =
    Math.floor(
      totalSeconds / 86400
    );


  const hourValue =
    Math.floor(
      (totalSeconds % 86400) /
      3600
    );


  const minuteValue =
    Math.floor(
      (totalSeconds % 3600) /
      60
    );


  const secondValue =
    totalSeconds % 60;


  days.textContent =
    String(
      dayValue
    ).padStart(
      3,
      "0"
    );


  hours.textContent =
    String(
      hourValue
    ).padStart(
      2,
      "0"
    );


  minutes.textContent =
    String(
      minuteValue
    ).padStart(
      2,
      "0"
    );


  seconds.textContent =
    String(
      secondValue
    ).padStart(
      2,
      "0"
    );

}


updateCountdown();


setInterval(
  updateCountdown,
  1000
);


/* ============================================================
   REVEAL
============================================================ */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


if (
  "IntersectionObserver"
  in window
) {

  const revealObserver =
    new IntersectionObserver(
      (
        entries,
        observer
      ) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            entry.target.classList.add(
              "visible"
            );


            observer.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold:
          .12,

        rootMargin:
          "0px 0px -35px 0px"
      }
    );


  revealElements.forEach(
    (element) => {

      revealObserver.observe(
        element
      );

    }
  );

} else {

  revealElements.forEach(
    (element) => {

      element.classList.add(
        "visible"
      );

    }
  );

}


/* ============================================================
   GALERI SINEMATIK
============================================================ */

const cinematicMedia =
  document.querySelectorAll(
    ".cinematic-media[data-speed]"
  );


const cinematicImages =
  document.querySelectorAll(
    "[data-cinematic-image]"
  );


const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


const isTouchDevice =
  window.matchMedia(
    "(hover: none), (pointer: coarse)"
  ).matches;


const enableCinematicScroll =
  !prefersReducedMotion &&
  !isTouchDevice;


if (
  cinematicMedia.length &&
  enableCinematicScroll
) {

  let cinematicTicking =
    false;


  function updateCinematicPhotos() {

    const viewportHeight =
      window.innerHeight;


    const viewportCenter =
      viewportHeight * .5;


    cinematicMedia.forEach(
      (media) => {

        const image =
          media.querySelector(
            "[data-cinematic-image]"
          );


        if (!image) {

          return;

        }


        const rect =
          media.getBoundingClientRect();


        const mediaCenter =
          rect.top +
          rect.height * .5;


        const distanceFromCenter =
          mediaCenter -
          viewportCenter;


        const normalized =
          distanceFromCenter /
          viewportHeight;


        const speed =
          Number(
            media.dataset.speed
          ) || 0;


        const zoomAmount =
          Number(
            media.dataset.zoom
          ) || 0;


        let translateY =
          normalized *
          speed *
          280;


        translateY =
          Math.max(
            -48,
            Math.min(
              48,
              translateY
            )
          );


        const proximity =
          1 -
          Math.min(
            Math.abs(normalized),
            1
          );


        const scale =
          1.025 +
          zoomAmount +
          proximity * .014;


        image.style.setProperty(
          "--parallax-y",
          `${translateY}px`
        );


        image.style.setProperty(
          "--parallax-scale",
          scale.toFixed(4)
        );

      }
    );


    cinematicTicking =
      false;

  }


  function requestCinematicUpdate() {

    if (
      cinematicTicking
    ) {

      return;

    }


    cinematicTicking =
      true;


    requestAnimationFrame(
      updateCinematicPhotos
    );

  }


  window.addEventListener(
    "scroll",
    requestCinematicUpdate,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    requestCinematicUpdate
  );


  requestCinematicUpdate();

} else {

  cinematicImages.forEach(
    (image) => {

      image.style.setProperty(
        "--parallax-y",
        "0px"
      );


      image.style.setProperty(
        "--parallax-scale",
        "1.035"
      );

    }
  );

}


/* ============================================================
   RSVP WHATSAPP
============================================================ */

const rsvpForm =
  document.getElementById(
    "rsvpForm"
  );


function kirimRSVPKeWhatsApp(
  name,
  attendance,
  message
) {

  const phone =
    String(
      weddingInfo.nomorWhatsApp
    )
      .replace(
        /\D/g,
        ""
      );


  if (
    !phone ||
    phone.length < 10
  ) {

    alert(
      "Nomor WhatsApp belum diatur.\n\n" +
      "Silakan isi weddingInfo.nomorWhatsApp " +
      "di script.js."
    );


    return;

  }


  const statusKehadiran =
    attendance === "yes"
      ? "Saya akan hadir"
      : "Saya belum dapat hadir";


  const pesan =
`Halo Rafi & Alma,

Saya ingin mengonfirmasi kehadiran untuk pernikahan kalian.

Nama:
${name}

Kehadiran:
${statusKehadiran}

Tanggal:
${weddingInfo.tanggal}

Waktu:
${weddingInfo.jamMulai} WIB

Lokasi:
${weddingInfo.lokasi}, ${weddingInfo.kota}

Pesan:
${message || "-"}

Terima kasih. 🤍`;


  const encodedMessage =
    encodeURIComponent(
      pesan
    );


  const whatsappUrl =
    `https://wa.me/${phone}?text=${encodedMessage}`;


  window.open(
    whatsappUrl,
    "_blank",
    "noopener,noreferrer"
  );

}


if (rsvpForm) {

  rsvpForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const name =
        document
          .getElementById(
            "name"
          )
          ?.value
          .trim();


      const attendance =
        document
          .getElementById(
            "attendance"
          )
          ?.value;


      const message =
        document
          .getElementById(
            "message"
          )
          ?.value
          .trim();


      if (
        !name ||
        !attendance
      ) {

        alert(
          "Mohon lengkapi nama dan kehadiran."
        );


        return;

      }


      saveGuestName(
        name
      );


      kirimRSVPKeWhatsApp(
        name,
        attendance,
        message
      );

    }
  );

}


/* ============================================================
   GOOGLE MAPS
============================================================ */

const mapsButton =
  document.getElementById(
    "mapsButton"
  );


if (mapsButton) {

  mapsButton.addEventListener(
    "click",
    () => {

      window.open(
        weddingInfo.mapsUrl,
        "_blank",
        "noopener,noreferrer"
      );

    }
  );

}


/* ============================================================
   KALENDER
============================================================ */

const calendarButton =
  document.getElementById(
    "calendarButton"
  );


function createCalendarFile() {

  const icsContent =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Rafi dan Alma//Undangan Pernikahan//ID
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:rafi-alma-12122026@undangan
DTSTAMP:20261003T000000Z
DTSTART;TZID=Asia/Jakarta:20261212T090000
DTEND;TZID=Asia/Jakarta:20261212T120000
SUMMARY:Pernikahan Rafi dan Alma
DESCRIPTION:Undangan Pernikahan Rafi dan Alma
LOCATION:${weddingInfo.lokasi}, ${weddingInfo.kota}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;


  const blob =
    new Blob(
      [icsContent],
      {
        type:
          "text/calendar;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    url;


  link.download =
    "pernikahan-rafi-alma.ics";


  document.body.appendChild(
    link
  );


  link.click();


  link.remove();


  setTimeout(
    () => {

      URL.revokeObjectURL(
        url
      );

    },
    1000
  );

}


if (calendarButton) {

  calendarButton.addEventListener(
    "click",
    createCalendarFile
  );

}


/* ============================================================
   BAGIKAN
============================================================ */

const shareButton =
  document.getElementById(
    "shareButton"
  );


async function shareInvitation() {

  const currentUrl =
    window.location.href;


  const shareData = {

    title:
      "Undangan Pernikahan Rafi & Alma",

    text:
      `Undangan Pernikahan Rafi & Alma\n` +
      `Kepada: ${currentGuest}\n` +
      `12 Desember 2026`,

    url:
      currentUrl

  };


  try {

    if (
      navigator.share
    ) {

      await navigator.share(
        shareData
      );


      return;

    }


    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(
        currentUrl
      );


      showShareFeedback(
        "Tautan undangan berhasil disalin."
      );


      return;

    }


    fallbackCopy(
      currentUrl
    );

  } catch (error) {

    if (
      error &&
      error.name ===
        "AbortError"
    ) {

      return;

    }


    fallbackCopy(
      currentUrl
    );

  }

}


function fallbackCopy(
  text
) {

  const textarea =
    document.createElement(
      "textarea"
    );


  textarea.value =
    text;


  textarea.style.position =
    "fixed";


  textarea.style.left =
    "-9999px";


  document.body.appendChild(
    textarea
  );


  textarea.focus();


  textarea.select();


  try {

    document.execCommand(
      "copy"
    );


    showShareFeedback(
      "Tautan undangan berhasil disalin."
    );

  } catch {

    showShareFeedback(
      "Silakan salin tautan dari bilah alamat browser."
    );

  }


  textarea.remove();

}


let shareFeedbackTimer;


function showShareFeedback(
  message
) {

  let feedback =
    document.getElementById(
      "shareFeedback"
    );


  if (!feedback) {

    feedback =
      document.createElement(
        "div"
      );


    feedback.id =
      "shareFeedback";


    feedback.className =
      "share-feedback";


    document.body.appendChild(
      feedback
    );

  }


  feedback.textContent =
    message;


  feedback.classList.add(
    "show"
  );


  clearTimeout(
    shareFeedbackTimer
  );


  shareFeedbackTimer =
    setTimeout(
      () => {

        feedback.classList.remove(
          "show"
        );

      },
      2500
    );

}


if (shareButton) {

  shareButton.addEventListener(
    "click",
    shareInvitation
  );

}


/* ============================================================
   PROGRESS + RSVP MELAYANG
============================================================ */

const scrollProgress =
  document.getElementById(
    "scrollProgress"
  );


const floatingRsvp =
  document.getElementById(
    "floatingRsvp"
  );


const rsvpSection =
  document.querySelector(
    ".rsvp-section"
  );


function updateScrollUI() {

  const scrollTop =
    window.scrollY;


  const scrollHeight =
    document.documentElement
      .scrollHeight -
    window.innerHeight;


  const progress =
    scrollHeight > 0
      ? (
          scrollTop /
          scrollHeight
        ) * 100
      : 0;


  if (
    scrollProgress
  ) {

    scrollProgress.style.width =
      `${progress}%`;

  }


  if (
    floatingRsvp
  ) {

    if (
      scrollTop >
      window.innerHeight * .65
    ) {

      floatingRsvp.classList.add(
        "show"
      );

    } else {

      floatingRsvp.classList.remove(
        "show"
      );

    }

  }

}


window.addEventListener(
  "scroll",
  updateScrollUI,
  {
    passive: true
  }
);


window.addEventListener(
  "resize",
  updateScrollUI
);


updateScrollUI();


/* ============================================================
   RSVP MELAYANG
============================================================ */

if (
  floatingRsvp &&
  rsvpSection
) {

  floatingRsvp.addEventListener(
    "click",
    () => {

      rsvpSection.scrollIntoView({
        behavior:
          "smooth",

        block:
          "start"
      });

    }
  );

}


/* ============================================================
   FOTO TIDAK BISA DI-DRAG
============================================================ */

document
  .querySelectorAll(
    "img"
  )
  .forEach(
    (image) => {

      image.addEventListener(
        "dragstart",
        (event) => {

          event.preventDefault();

        }
      );

    }
  );