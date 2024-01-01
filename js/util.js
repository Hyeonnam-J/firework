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
    originDuration: () => Math.random() + 1.5,
    originColor: () => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
    originPoint_X: (viewWidth, originWidth) => Math.floor(Math.random() * viewWidth) - originWidth / 2,
    endPoint: (viewHeight) => ( (Math.random() * 0.4) + 0.2 ) * viewHeight,

    fragmentsWidth: 2,
    fragmentsHeight: 20,
    fragmentsDuration: () => Math.random() + 1.5,
    fragmentsMaxDistance: () => ( Math.random() * 20 ) + 130,

    explodeAscendingAngle: () => Math.floor( (Math.random() * 10) + 5 ),
    fragmentsMultipleDistance: () => (Math.floor( Math.random() * 5 ) + 5) / 10,
}

export { calculateCoordinates, values };