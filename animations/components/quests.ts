import { Component } from "../classes/component";
import { Parallax } from "../classes/parallax";
import gsap from "gsap";
import { Draggable } from "gsap/all";
export class Quests extends Component {
  questCards: Node[];
  parallaxText: Parallax;
  parallaxCta: Parallax;

  parallaxCards: Parallax;

  draggable: Draggable[];
  dummy: HTMLElement;

  constructor() {
    super({
      element: "[data-animation='quests']",
      children: {
        text: "[data-animation='quests-text']",
        cta: "[data-animation='quests-cta']",
        caret: "[data-animation='quests-caret']",
        cards: "[data-animation='quests-card']",
      },
    });

    this.animateCaret();
    this.createParallax();
  }

  animateCaret() {
    const carets = this.children.caret;

    const tl: GSAPTimeline = gsap.timeline({ repeat: -1 });

    tl.to(carets[1], {
      fill: "#6DFFD6",
      yoyo: true,
      duration: 0.8,
    });

    tl.to(
      carets[0],
      {
        fill: "#049169",
        yoyo: true,
        duration: 0.8,
      },
      "<"
    );
  }

  createParallax() {
    // save quest cards if they do not exist
    if (!this.questCards) {
      this.questCards = [...this.children.cards];
      // initialize swiper her becuse it needs quest cards to work
      this.createSwiper();
    }

    const text = this.children.text[0];
    const cta = this.children.cta[0];
    const cards = this.questCards[0].parentElement;

    if (!this.parallaxText) {
      this.parallaxText = new Parallax({
        element: text,
        children: null,
        defaultParallax: {
          displacement: 150,
        },
      });
    }

    if (!this.parallaxCta) {
      this.parallaxCta = new Parallax({
        element: cta,
        children: null,
        defaultParallax: {
          displacement: 150,
        },
      });
    }

    /// parallax for cards
    if (!this.parallaxCards) {
      gsap.set(this.questCards[0], {
        rotateZ: -20,
        transformOrigin: "bottom right",
      });

      gsap.set(this.questCards[2], {
        transformOrigin: "bottom left",
        rotateZ: 20,
      });
    }

    this.parallaxCards = new Parallax({
      element: cards as HTMLElement,
      children: null,
      defaultParallax: {
        displacement: 150,
      },

      customParallax: {
        end: globalThis.ismobile ? "center center" : "bottom center",
        function: this.curveCards.bind(this),
      },
    });
  }

  curveCards(tl: GSAPTimeline) {
    const cardOne = this.questCards[0];
    const cardThree = this.questCards[2];

    tl.to(cardOne, {
      rotateZ: globalThis.ismobile ? -5 : 0,
    });

    tl.to(
      cardThree,
      {
        rotateZ: globalThis.ismobile ? 6 : 0,
      },
      "<"
    );
  }

  createSwiper() {
    // return if it isn't a mobile device
    if (!globalThis.ismobile) {
      return;
    }

    // return if swiper already exists
    if (this.draggable) {
      return;
    }

    const cardsContainer = this.questCards[0].parentElement;
    const cards = this.questCards;
    const cardHeight = (cards[0] as HTMLElement).clientHeight;

    // remove x overflow
    gsap.set(cardsContainer, {
      overflowX: "unset",
      overflowY: "unset",
      position: "relative",
      justifyContent: "center",
      height: cardHeight,
    });

    const roll = this.roll.bind(this);
    const that = this;

    // initialize start and end points
    let startX: number;

    // create draggable
    this.dummy = document.createElement("div");
    this.draggable = Draggable.create(this.dummy, {
      type: "x",
      lockAxis: true,
      trigger: cardsContainer,
      onDragStart: () => {
        startX = that.draggable[0].x;
      },
      onDragEnd: function () {
        const endX = that.draggable[0].x;
        const diffX = Math.abs(startX - endX);
        const isSlide = diffX > 50;

        const direction = this.getDirection("start");

        if (isSlide) {
          // disable scroll
          document.body.style.overflowY = "hidden";
          // roll card out
          roll(direction);
        }
      },
    });
  }

  async roll(direction: "left" | "right") {
    if (!this.questCards) {
      return;
    }

    // remove pointer events from parent
    const cardsContainer = this.questCards[0].parentElement;
    await gsap.set(cardsContainer, {
      pointerEvents: "none",
    });

    const allCards = this.questCards;

    // grab first card
    const topCard = allCards[allCards.length - 1];
    const topOldTransform = (topCard as HTMLElement).style.transform;

    // roll out with timeline
    const tl = gsap.timeline();

    tl.set(topCard, {
      transformOrigin: "center center",
    });

    tl.to(topCard, {
      rotation: direction === "left" ? "-90" : "+90",
    });

    tl.to(
      topCard,
      {
        x: direction === "left" ? "-100vw" : "100vw",
        y: -100,
      },
      "<"
    );

    tl.call(() => {
      this.reattach(topCard, topOldTransform);
    });
  }

  async reattach(newLast: Node, newLastOldTransform: string) {
    if (!top) {
      return;
    }

    const last = this.questCards[0];
    const mid = this.questCards[1];

    // move to back
    newLast.parentNode?.insertBefore(newLast, last);

    // reset cards
    const lastItemTransform = (last as HTMLElement).style.transform;
    const midItemTransform = (mid as HTMLElement).style.transform;

    await Promise.all([
      // transform the newly attached last item to match previous item at its position
      gsap
        .set(newLast, {
          transformOrigin: "bottom right",
          transform: lastItemTransform,
        })
        .then(() => {
          // rotate to final form incase scrooltrigger hasn't been completed
          gsap.to(newLast, {
            rotateZ: -5,
          });
        }),

      // transform the previous last item to match the previous position
      // of middle card because it is now in the middle
      gsap.to(last, {
        // transformOrigin: "center center",
        transform: midItemTransform,
      }),

      // transform the previous middle item to match the previous position
      // of top card that was swiped out because it is now at the top
      gsap
        .to(mid, {
          transformOrigin: "bottom left",
          transform: newLastOldTransform,
        })
        .then(() => {
          // rotate to final form incase scrooltrigger hasn't been completed
          gsap.to(mid, {
            rotateZ: 6,
          });
        }),
    ]);

    const tl = gsap.timeline();

    tl.call(() => {
      this.questCards = [newLast, last, mid];

      // kill custom TL and create a new one
      this.parallaxCards.killCustom();

      // add back pointer events for draggable
      const cardsContainer = this.questCards[0].parentElement;
      gsap
        .set(cardsContainer, {
          pointerEvents: "all",
        })
        .then(() => {
          document.body.style.overflowY = "auto";
        });
    });
  }
}

// send the swiped card to behind
// gsap.set(top, {
//   x: 0,
//   y: 0,
//   transform: midItemTransform,
//   transformOrigin: "bottom right",
// });

// reposition swiped card to match old last card
// gsap.to(top, {
//   rotation: -5,
//   transformOrigin: "bottom right",
// }),
