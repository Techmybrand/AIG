import { Component } from '../classes/component'

import { flattenObj } from '@/utils'
// import { media } from "@/mock";

import { each } from 'lodash'
import gsap from 'gsap'

import { getDistanceFromMidViewport } from '../helpers'

// export class Preloader extends Component {
//   progress: number;
//   coinBounceTl!: GSAPTimeline;
//   percentage!: number;
//   allMedia!: string[];
//   statuses: string[];

//   constructor() {
//     super({
//       element: "[data-animation='preloader']",
//       children: {
//         bg: "[data-animation='preloader-bg']",
//         container: "[data-animation='preloader-container']",
//         progressWrap: "[data-animation='preloader-progresswrap']",
//         progress: "[data-animation='preloader-progressbar']",
//         status: "[data-animation='preloader-status']",

//         // borrowed elements
//         hero: "[data-animation='hero']",
//         heroText: "[data-animation='hero-text']",
//         coinOne: "[data-animation='hero-coin-one']",
//         coinTwo: "[data-animation='hero-coin-two']",
//         header: "[data-animation='header']",
//       },
//     });

//     // reset scroll position to zero
//     document.body.scrollTop = 0;
//     document.body.style.overflow = "hidden";

//     // start preload
//     this.setPositions();
//     this.startLoad();

//     // initialise vars
//     this.progress = 0;
//     this.statuses = [
//       //   "Creating Guilds...",
//       //   "Updating Quests...",
//       //   "Upgrading Skills...",
//       //   "Consulting Guild Masters...",
//       //   "Verifying Protocols...",
//       //   "Fetching Rewards...",
//       "Verifying Protocols...",
//       "Consulting Guild Masters...",
//       "Updating Quests...",
//     ];
//   }

//   // bring coins from initial position to center of screen
//   async setPositions() {
//     // elements
//     const coinOne = this.children.coinOne[0];
//     const coinTwo = this.children.coinTwo[0];
//     const hero = this.children.hero[0];
//     const heroText = this.children.heroText[0].childNodes;
//     const header = this.children.header[0];

//     // lazy load coin two if on mobile
//     globalThis.ismobile
//       ? (coinTwo.querySelector("img").loading = "lazy")
//       : null;

//     // set coin widths
//     await gsap.set([coinOne, coinTwo], {
//       width: "10.5rem",
//       height: "10.5rem",
//     });

//     const [distX1, distY1] = getDistanceFromMidViewport(coinOne);
//     const [distX2, distY2] = getDistanceFromMidViewport(coinTwo);

//     await Promise.all([
//       gsap.set(coinOne, {
//         x: distX1 - (globalThis.ismobile ? 0 : 30),
//         y: distY1 - 30,
//       }),

//       gsap.set(coinTwo, {
//         x: distX2 + 30,
//         y: distY2 - 30,
//       }),

//       gsap.set(hero, {
//         backgroundImage: "none",
//       }),

//       gsap.set(heroText, {
//         autoAlpha: 0,
//       }),

//       gsap.set(header, {
//         autoAlpha: 0,
//       }),
//     ]);

//     gsap.set(this.children.bg, {
//       backgroundColor: "transparent",
//     });

//     // start coin bouncing
//     this.bounceCoins();
//   }

//   // start preloading images
//   startLoad(): void {
//     // get all media items
//     const allmedia = flattenObj(media);
//     allmedia.splice(0, 4);
//     this.allMedia = flattenObj(allmedia);

//     each(this.allMedia, (url: any, index) => {
//       setTimeout(() => {
//         const fakeImage: HTMLImageElement = new Image();

//         fakeImage.src = url;

//         fakeImage.onload = () => {
//           this.onAssetLoaded();
//         };
//       }, index * ((25 * 100) / this.allMedia.length));
//     });
//   }

//   // call thsi when each image has loaded
//   onAssetLoaded(): void {
//     // update progress & percentage
//     this.progress++;
//     this.percentage = Math.round((this.progress / this.allMedia.length) * 100);

//     // set status text
//     const index: number = this.percentage / 50;
//     const status = this.statuses[Number(index.toFixed())];

//     this.children.status[0].innerText = status;

//     this.children.progress[0].style.width = `${this.percentage}%`;
//     this.children.progress[0].innerText = `${this.percentage}%`;

//     if (this.percentage === 100) {
//       // set loading to completed so animations can start
//       this.onLoadingComplete();
//     }
//   }

//   // this is called when all images have been loaded
//   onLoadingComplete(): void {
//     const coinOne = this.children.coinOne[0];
//     const coinTwo = this.children.coinTwo[0];

//     const tl: GSAPTimeline = gsap.timeline({ delay: 1 });

//     tl.call(() => {
//       this.children.progress[0].innerText = "";
//     });

//     tl.to(
//       this.children.progressWrap,
//       {
//         overflowY: "hidden",
//         width: "100vw",
//         height: "1px",
//         ease: "expo.inOut",
//         duration: 1,
//       },
//       "<"
//     );

//     tl.to(
//       [coinOne, coinTwo],
//       {
//         duration: 1,
//         autoAlpha: 0,
//         y: "-=20",
//         ease: "expo.inOut",
//       },
//       "<"
//     );

//     tl.to(
//       this.children.status,
//       {
//         duration: 1,
//         autoAlpha: 0,
//         y: 20,
//         ease: "expo.inOut",
//       },
//       "<"
//     );

//     tl.call(() => {
//       tl.kill();
//       this.linesOutro();
//     });
//   }

//   bounceCoins() {
//     const coinOne = this.children.coinOne;
//     const coinTwo = this.children.coinTwo;

//     this.coinBounceTl = gsap.timeline();
//     const tl = this.coinBounceTl;

//     tl.to([coinOne], {
//       y: "-=50",
//       repeat: -1,
//       yoyo: true,
//       yoyoEase: true,
//       ease: "sine.inOut",
//       duration: 0.5,
//     });

//     tl.to(
//       [coinTwo],
//       {
//         y: "-=50",
//         repeat: -1,
//         yoyo: true,
//         yoyoEase: true,
//         ease: "sine.inOut",
//       },
//       0.25
//     );
//   }

//   linesOutro() {
//     const coinOne = this.children.coinOne[0];
//     const coinTwo = this.children.coinTwo[0];
//     const container = this.children.container[0];
//     const containerClone = container.cloneNode(true);
//     const progressClone = containerClone.querySelector(
//       "[data-animation='preloader-progresswrap']"
//     );

//     gsap.set(containerClone, {
//       position: "absolute",
//       x: "-40%",
//     });

//     gsap.set(container, {
//       position: "absolute",
//       x: "40%",
//     });

//     // append cloned container to preloader
//     this.element.appendChild(containerClone);

//     // create new timeline to animate both old line and new one
//     const newtl: GSAPTimeline = gsap.timeline();

//     newtl.to(progressClone, {
//       x: "-=60%",
//       ease: "expo.inOut",
//       duration: 1.5,
//     });

//     newtl.to(
//       this.children.progressWrap,
//       {
//         x: "+=60%",
//         ease: "expo.inOut",
//         duration: 1.5,
//       },
//       "<"
//     );

//     newtl.set([coinOne, coinTwo], {
//       width: "20.5rem",
//       height: "20.5rem",
//       x: 0,
//       y: 0,
//     });

//     // preloading is now complete, kill preloader
//     newtl.call(() => {
//       // kill this timeline
//       newtl.kill();

//       // kill coinbounce timeline
//       this.coinBounceTl.kill();

//       // kill preloader
//       this.kill();
//     });
//   }

//   kill(): void {
//     this.emit("preload-completed");
//     document.body.style.overflowY = "auto";

//     gsap.to(this.children.bg, {
//       autoAlpha: 0,
//     });

//     gsap.to(this.element, {
//       autoAlpha: 0,
//     });
//   }
// }
