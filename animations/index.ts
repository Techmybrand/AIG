// import { Preloader } from "./components/preloader";
import { Layout } from './components/layout'
import { Hero } from './components/hero'
// import { Quests } from "./components/quests";
// import { Resume } from "./components/resume";
// import { Skills } from "./components/skills";
// import { Works } from "./components/works";
// import { Summary } from "./components/summary";
// import { Roadmap } from "./components/roadmap";
// import { Community } from "./components/community";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/all'
import gsap from 'gsap'

// declare type for globalthis.ismobile
declare global {
  var ismobile: boolean
}

export class App {
  preloader: any
  layout: any
  hero: any
  quests: any
  resume: any
  skills: any
  works: any
  summary: any
  roadmap: any
  community: any

  constructor({ ismobile }: { ismobile: boolean }) {
    // set mobile variable
    globalThis.ismobile = ismobile

    // register scroll trigger
    gsap.registerPlugin(ScrollTrigger, Draggable)

    // iitialise preloader
    // this.createPreloader();
  }

  // createPreloader() {
  //   this.preloader = new Preloader();
  //   this.preloader.once("preload-completed", this.onPreloaded.bind(this));
  // }

  onPreloaded() {
    // call createAnimations method
    this.createAnimations()
  }

  createAnimations() {
    this.layout = new Layout()
    this.hero = new Hero()
    // this.quests = new Quests();
    // this.resume = new Resume();
    // this.skills = new Skills();
    // this.works = new Works();
    // this.summary = new Summary();
    // this.roadmap = new Roadmap();
    // this.community = new Community();
  }
}
