import { viewWidth, viewHeight } from './canvas.js';
import Fragment from './fragments/Fragment.js';
import { fire } from './acts/fire.js';
import Utils from './Utils.js';
import Particle from './fragments/Particle.js';

const burst_duration = 300;
const burst_distance = 300;

const erupt_duration = 3000;
const erupt_distance = 500;

const bomb_olympic_duration = 2000;
const bomb_olympic_distance = 200;

const color = Utils.colors.white;
const fragmentsActType = Fragment.fragmentsActType.bomb_olympic;
const soaring = {
    start_x: viewWidth * 0.5,
    end_x: viewWidth * 0.5,
    start_y: viewHeight,
    end_y: viewHeight * 0.7,
    duration: 2000,
};
const explosion = {
    distance: bomb_olympic_distance,
    duration: bomb_olympic_duration,
};

fire(color, fragmentsActType, soaring, explosion);