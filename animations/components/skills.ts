import { Component } from "../classes/component";
import { Parallax } from "../classes/parallax";
import { each, random } from "lodash";
import gsap from "gsap";

export class Skills extends Component {
  wiggles: any;
  progress: {
    frame: number;
    total: number;
    current: number;
  };

  constructor() {
    super({
      element: "[data-animation='skills']",
      children: {
        text: "[data-animation='skills-text']",
        boxesContainer: "[data-animation='skills-box-container']",
        boxes: "[data-animation='skill-box']",
      },
    });

    this.wiggles = {};
    this.createParallax();
    this.initSkills();
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
      element: this.children.boxesContainer[0],
      children: null,
      defaultParallax: {
        displacement: globalThis.ismobile ? 70 : 100,
      },
    });
  }

  initSkills() {
    each(this.children.boxes, async (box, index) => {
      // get image from box
      const img = box.querySelector("img");
      // save wiggles
      this.wiggles[index] = img;
      const cmStyle = window.getComputedStyle(box);
      const bdColor = cmStyle.getPropertyValue("border-color");

      // set border color
      gsap.set(box, {
        borderColor: "#161616",
        transformOrigin: "center center",
      });

      // add grayscale to active skills
      gsap.to(box.querySelector("img"), {
        filter: "grayscale(100%)",
        autoAlpha: 0.5,
      });

      box.onclick = () => {
        gsap.killTweensOf(img);
        this.wiggles[index] = false;
        this.unlockSkill(box, bdColor);
      };
    });

    // start random wiggles
    this.wiggleSkill();
  }

  unlockSkill(box: HTMLElement, initialColor: string) {
    box.onclick = null
    const tl: GSAPTimeline = gsap.timeline();
    const boxAndImage = [box.querySelector("img"), box];

    tl.to(boxAndImage, {
      scale: 0.5,
      filter: "none",
      autoAlpha: 1,
      ease: "circ.out",
      duration: 0.4,
      rotation: "0",
    });

    tl.to(boxAndImage, {
      scale: 1,
      ease: "elastic.out(1, 0.2)",
      duration: 1.5,
    });

    tl.to(
      box,
      {
        borderColor: initialColor,
        duration: 0.4,
      },
      "<"
    );
  }

  wiggleSkill() {
    type Wiggle = HTMLElement | false;
    const wiggles: Wiggle[] = Object.values(this.wiggles);
    const activeWiggles = wiggles.filter((item) => item !== false);
    const img = activeWiggles[random(activeWiggles.length - 1)] as any;

    if (!img) {
      return
    }

    const tl = gsap.timeline({
      delay: 1,
      onComplete: () => {
        this.wiggleSkill();
      },
    });

    for (let i = 0; i < 15; i++) {
      tl.to(img, {
        rotation: "+=45",
        duration: 0.08,
        ease: "sine.inOut",
        yoyo: true,
        yoyoEase: true,
      });

      tl.to(img, {
        rotation: "-=45",
        duration: 0.08,
        ease: "sine.inOut",
        yoyo: true,
        yoyoEase: true,
      });
    }
  }
}
