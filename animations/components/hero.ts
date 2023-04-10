import { Component } from '../classes/component'
import { Parallax } from '../classes/parallax'
import gsap from 'gsap'
import { eventEmitter } from '@/utils'
export class Hero extends Component {
  floatTL!: GSAPTimeline
  bounceTL!: GSAPTimeline

  constructor() {
    super({
      element: "[data-animation='hero']",
      children: {
        text: "[data-animation='hero-text']",
        title: "[data-animation='hero-title']",
        subtitle: "[data-animation='hero-subtitle']",
        form: "[data-animation='hero-form']",
        cta: "[data-animation='hero-cta']",
      },
    })

    this.revealElements()
  }

  async revealElements() {
    console.log('hello')
    const tl: GSAPTimeline = gsap.timeline()

    const items = [this.children.title, this.children.subtitle, this.children.form, this.children.cta]

    tl.fromTo(
      items,
      {
        y: 150,
      },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        // ease: "expo.inOut",
        // duration: 2.5,
        ease: 'elastic.out(1, 0.5)',
        duration: 1.5,
      },
      '<',
    )
  }
}
