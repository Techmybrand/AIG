import { Component } from "../classes/component";
import { Parallax } from "../classes/parallax";
import { Animation } from "../classes/animation";

import gsap from "gsap";

export class Resume extends Component {
  progress: {
    frame: number;
    total: number;
    current: number;
  };

  constructor() {
    super({
      element: "[data-animation='resume']",
      children: {
        text: "[data-animation='resume-text']",
        cta: "[data-animation='resume-cta']",
        card: "[data-animation='resume-card']",
        trophy: "[data-animation='resume-trophy']",
        statNum: "[data-animation='resume-num']",
        progress: "[data-animation='resume-progress']",
      },
    });

    this.createParallax();
    this.animateTrophy();
    this.animateProgress();
  }

  createParallax() {
    new Parallax({
      element: this.children.text[0],
      children: null,
      defaultParallax: {
        displacement: 150,
      },
    });

    new Parallax({
      element: this.children.card[0],
      children: null,
      defaultParallax: {
        displacement: 100,
        scrub: 1,
        end: "top top"
      },
    });
  }

  animateTrophy() {
    new Animation({
      element: this.children.trophy[0],
      children: null,
      initialState: {
        scale: 0,
      },
      inOutAnimation: {
        start: "top bottom",
        tween: { scale: 1, ease: "elastic.out(1.5, 0.5)", duration: 4 },
      },
    });
  }

  animateProgress() {
    let current = 1000;
    let total = 340000;
    let frame: number;


    const animate = (): void => {
      const percentage = (current / total) * 100;
      this.children.statNum[0].innerText = current.toLocaleString();

      gsap.set(this.children.progress[0], {
        width: `${percentage}%`,
      });

      if (current < 240000) {
        current += 2000;
      } else {
        window.cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(animate);
    };

    const reset = () => {
      window.cancelAnimationFrame(frame);
      current = 1000;
    }

    new Animation({
      element: this.children.statNum[0],
      children: null,
      inOutAnimation: {
        start: "top bottom",
        onEnter: animate,
        onLeaveBack: reset
      },
    });
  }
}
