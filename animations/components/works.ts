import { Component } from "../classes/component";
import { Parallax } from "../classes/parallax";

import { each } from "lodash";
import gsap from "gsap";

export class Works extends Component {
  constructor() {
    super({
      element: "[data-animation='works']",
      children: {
        title: "[data-animation='works-title']",
        cards: "[data-animation='works-cards']",
        card: "[data-animation='works-card']",
        tag: "[data-animation='works-tag']",
      },
    });

    this.animateTags();
    this.createParallax();
  }

  animateTags() {
    const tags = this.children.tag;

    each(tags, (item, index) => {
      gsap.to(item, {
        rotation: "+=360",
        repeat: -1,
        ease: "none",
        duration: 2.5,
        delay: Number(index) * 0.2,
      });
    });
  }

  createParallax() {
    const all = [...this.children.title, ...this.children.cards];

    each(all, (item: HTMLElement) => {
      new Parallax({
        element: item,
        children: null,
        defaultParallax: {
          displacement: 150,
        },
      });
    });

    new Parallax({
      element: this.children.cards[0],
      children: null,
      customParallax: {
        end: globalThis.ismobile ? "center center" : "center center",
        start: "top bottom-=100px",
        function: this.moveCards.bind(this),
      },
    });

    gsap.to(this.children.card[0], {
      y: 0,
      x: globalThis.ismobile ? 0 : "50%",
      autoAlpha: 0,
    });

    // displace cards
    gsap.to(this.children.card[1], {
      y: 100,
      x: globalThis.ismobile ? 0 : "50%",
      autoAlpha: 0,
    });

    gsap.to(this.children.card[2], {
      y: 200,
      x: globalThis.ismobile ? 0 : "50%",
      autoAlpha: 0,
    });
  }

  moveCards(tl: GSAPTimeline) {
    tl.to(this.children.card[0], {
      y: 0,
      x: 0,
      autoAlpha: 1,
    });

    tl.to(
      this.children.card[1],
      {
        y: 0,
        x: 0,
        autoAlpha: 1,
      },
      "-=50%"
    );

    tl.to(
      this.children.card[2],
      {
        x: 0,
        y: 0,
        autoAlpha: 1,
      },
      "-=50%"
    );
  }
}
