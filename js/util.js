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

export { calculateCoordinates };