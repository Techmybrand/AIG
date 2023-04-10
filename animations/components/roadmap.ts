import { Component } from "../classes/component";
import { Parallax } from "../classes/parallax";
import { each } from "lodash";
import gsap from "gsap";

export class Roadmap extends Component {
  constructor() {
    super({
      element: "[data-animation='roadmap']",
      children: {
        text: "[data-animation='roadmap-text']",
        sticky: "[data-animation='roadmap-sticky']",
        cards: "[data-animation='roadmap-cards']",
        card: "[data-animation='roadmap-card']",
        tag: "[data-animation='roadmap-tag']",
      },
    });

    this.createRoller();
    this.createParallax();
    // this.pinToTop();
  }

  createParallax() {
    const all = [...this.children.text, ...this.children.cards];

    each(all, (item: HTMLElement) => {
      new Parallax({
        element: item,
        children: null,
        defaultParallax: {
          displacement: 100,
        },
      });
    });
  }

  createRoller() {
    if (globalThis.ismobile) {
      return;
    }

    const tags = this.children.tag;
    const cards = this.children.cards[0];
    cards.style.overflow = "visible";

    // const end = cards.clientWidth + 64 + 64 + 64;
    const vpW = window.innerWidth;
    const end = cards.scrollWidth - vpW + 64 + 64

    const tl: GSAPTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.children.cards,
        scrub: 1,
        start: () => "bottom bottom-=50px",
        end: () => "top top+=100px",
      },
    });

    tl.to(cards, {
      x: -end,
    });

    tl.to(tags, {
      rotation: 360 + 180
    }, "<")
  }

  pinToTop() {
    if (!globalThis.ismobile) {
      return;
    }

    const sticky = this.children.sticky[0];

    const rect: DOMRect | undefined = sticky?.getBoundingClientRect();
    const stickyheight = rect?.height;

    if (!stickyheight) {
      return;
    }

    // set sticky offset
    const half = stickyheight / 2;
    const margin = "15px";
    sticky.style.setProperty("top", `calc(50% - ${half}px + ${margin})`);

    this.mobileRoller();
  }

  mobileRoller() {
    const container = this.element;
    const cards = this.children.cards[0];
    cards.style.overflow = "visible";

    const vpW = window.innerWidth;
    const vpH = window.innerHeight;

    // set container height
    const scrollableWidth = cards.scrollWidth;
    const scrollLength = scrollableWidth - vpW + vpH + 31.04;

    container.style.height = `${scrollLength}px`;

    const tl: GSAPTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.element,
        scrub: 0.5,
        start: () => "top top",
        end: () => "bottom bottom",
      },
    });

    const end = cards.scrollWidth - vpW + 31.04 + 31.04;

    tl.to(cards, {
      x: -end,
    });
  }
}
