function calculateCoordinates(startX, startY, distance, angleInDegrees) {
    // 각도를 라디안으로 변환
    // javascript에서 제공하는 Math.cos() 메서드는 인자로 라디안 값을 기대한다.
    var angleInRadians = angleInDegrees * (Math.PI / 180);

    // 새로운 좌표 계산
    var x = startX + distance * Math.cos(angleInRadians);
    var y = startY + distance * Math.sin(angleInRadians);

    // 결과 반환
    return { x: x, y: y };
}

const values = {
    originWidth: 2,
    originHeight: 80,
    originDuration: () => Math.random() + 3,
    originColor: () => colors[ Math.floor( Math.random() * colors.length ) ],
    originPoint_X: (viewWidth) => (Math.random() * 8 + 1) / 10 * viewWidth,
    endPoint: (viewHeight) => ( (Math.random() * 0.4) + 0.2 ) * viewHeight,

    fragmentsWidth: 2,
    fragmentsHeight: 20,
    fragmentsDuration: () => Math.random() + 1.5,
    fragmentsDistance: () => ( Math.random() * 20 ) + 130,
}

const colors = [
    "#FFEB3B",   // 노란 계통
    "#2196F3",   // 블루 계통
    "#00FF00",   // 연두 계통
    "#FF5722",   // 빨간 계통
    "#FF4081",   // 핑크 계통
    "#8A2BE2",   // 보라 계통
    "#FFFFFF",   // 흰색 계통
    "#00FFFF",   // 청록 계통
    "#FFA500"    // 주황 계통
];

export { calculateCoordinates, values, colors };