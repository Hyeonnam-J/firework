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
    originShortDuration: () => Math.random() * 1 + 1,
    originDefaultDuration: () => Math.random() * 2 + 3,
    originColor: () => colors[ Math.floor( Math.random() * colors.length ) ],
    originPoint_X: (viewWidth) => (Math.random() * 8 + 1) / 10 * viewWidth, // 화면의 10~90% 사이
    originShortEndPoint: (viewHeight) => ( (Math.random() * 0.2) + 0.5 ) * viewHeight,
    originDefaultEndPoint: (viewHeight) => ( (Math.random() * 0.4) + 0.2 ) * viewHeight,

    fragmentWidth: 2,
    fragmentHeight: 20,
    fragmentDuration: () => Math.random() * 2 + 3,
    fragmentDefaultDistance: () => ( Math.random() * 100 ) + 200,
    fragmentLongDistance: () => ( Math.random() * 200 ) + 300,

    afterImageSize: 4,
    afterImageDuration: () => Math.random() * 2 + 1,
}

const colors = [
    "#FFEB3B",   // 노란 계통
    "#00FF00",   // 연두 계통
    "#FF5722",   // 빨간 계통
    "#FF4081",   // 핑크 계통
    "#8A2BE2",   // 보라 계통
    "#FFFFFF",   // 흰색 계통
    "#00FFFF",   // 청록 계통
    "#FFA500"    // 주황 계통
];

export { calculateCoordinates, values, colors };