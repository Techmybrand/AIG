import { Component } from "../classes/component";
import { Parallax } from "../classes/parallax";
import { each } from "lodash";
import gsap from "gsap";

export class Community extends Component {
  constructor() {
    super({
      element: "[data-animation='community']",
      children: {
        text: "[data-animation='community-text']",
        icons: "[data-animation='community-icons']",
        icon: "[data-animation='community-icon']",
      },
    });

    this.createParallax();
    this.animateIcons();
  }

  createParallax() {
    const text = [...this.children.text];
    const icons = [...this.children.icons];

    each(text, (item: HTMLElement) => {
      new Parallax({
        element: item,
        children: null,
        defaultParallax: {
          displacement: globalThis.ismobile ? 200 : 100,
        },
      });
    });

    each(icons, (item: HTMLElement) => {
      new Parallax({
        element: item,
        children: null,
        defaultParallax: {
          displacement: 100,
        },
      });
    });
  }

  animateIcons() {
    const icons = [...this.children.icon];
    const lastThree = icons.slice(-3);
    const firstFour = icons.slice(0, 4);

    if (globalThis.ismobile) {
      each(lastThree, (item) => {
        gsap.to(item, {
          y: "-=45",
        });
      });

      each(firstFour, (item) => {
        gsap.to(item, {
          y: "+=50",
        });
      });
    }

    each(icons, (item, index) => {
      const isOdd = Number(index) % 2 !== 0;

      if (globalThis.ismobile) {
        gsap.to(item, {
          rotation: isOdd ? "+=360" : "0",
        });
      } else {
        gsap.to(item, {
          rotation: isOdd ? "+=360" : "0",
          y: isOdd ? 50 : -30,
        });
      }

      gsap.to(this.children.icons, {
        gap: globalThis.ismobile ? "4.4rem 1.6rem" : "8.7rem",
      });

      const animate = (tl: GSAPTimeline) => {
        tl.to(item, {
          y: 0,
          rotation: 0,
        });

        tl.to(
          this.children.icons,
          {
            gap: globalThis.ismobile ? "2.4rem 1.25rem" : "4.7rem",
          },
          "<"
        );
      };

      new Parallax({
        element: this.children.icons[0],
        children: null,
        customParallax: {
          start: globalThis.ismobile ? "top bottom-=100" : "center bottom",
          end: globalThis.ismobile ? "top center" : "center, center",
          function: animate,
        },
      });
    });
  }
}
