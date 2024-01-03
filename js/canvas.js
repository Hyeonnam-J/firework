const viewWidth = window.innerWidth;
const viewHeight = window.innerHeight;

const body = document.body;
body.style.width = `${viewWidth}px`;
body.style.height = `${viewHeight}px`;
body.style.overflow = 'hidden';
body.style.background = '#000';

const canvas = document.getElementById('canvas');
canvas.width = viewWidth;
canvas.height = viewHeight;

const ctx = canvas.getContext('2d');

export { viewWidth, viewHeight, canvas, ctx };